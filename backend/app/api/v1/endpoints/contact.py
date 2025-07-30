from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from slowapi import Limiter
from slowapi.util import get_remote_address
from typing import List
import re

from app.core.database import get_async_session
from app.models.contact import ContactSubmission
from app.schemas.contact import (
    ContactSubmissionCreate,
    ContactSubmissionResponse,
    ContactSubmissionUpdate,
    ContactFormStep1,
    ContactFormStep2,
    ContactFormStep3,
    ContactFormStep4,
    ContactFormStep5
)
from app.utils.lead_scoring import calculate_lead_score
from app.utils.email import send_notification_email

# Input validation functions
def validate_email_format(email: str) -> bool:
    """Additional email validation beyond pydantic"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))

def validate_phone_format(phone: str) -> bool:
    """Validate phone number format"""
    if not phone:
        return True  # Optional field
    # Allow international formats: +1234567890, (123) 456-7890, 123-456-7890, etc.
    pattern = r'^[\+]?[\d\s\(\)\-]{10,20}$'
    return bool(re.match(pattern, phone))

def sanitize_input(text: str, max_length: int = 1000) -> str:
    """Sanitize text input to prevent XSS and other attacks"""
    if not text:
        return ""
    # Remove potential harmful characters but keep essential ones
    sanitized = re.sub(r'[<>"\'\\/]', '', text)
    return sanitized[:max_length].strip()

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)

@router.post("/submit", response_model=ContactSubmissionResponse)
@limiter.limit("5/minute")
async def submit_contact_form(
    request: Request,
    contact_data: ContactSubmissionCreate,
    db: AsyncSession = Depends(get_async_session)
):
    try:
        # Calculate lead score
        lead_score = calculate_lead_score(contact_data.dict())
        is_qualified = lead_score >= 70
        
        # Get client info
        client_ip = request.client.host
        user_agent = request.headers.get("user-agent", "")
        
        # Create contact submission
        db_contact = ContactSubmission(
            **contact_data.dict(),
            lead_score=lead_score,
            is_qualified=is_qualified,
            ip_address=client_ip,
            user_agent=user_agent
        )
        
        db.add(db_contact)
        await db.commit()
        await db.refresh(db_contact)
        
        # Send notification email (non-blocking)
        try:
            await send_notification_email(db_contact, is_qualified)
        except Exception as e:
            print(f"Failed to send notification email: {e}")
        
        return db_contact
        
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to submit contact form"
        )

@router.post("/step1", response_model=dict)
@limiter.limit("10/minute")
async def submit_contact_step1(
    request: Request,
    step_data: ContactFormStep1,
    db: AsyncSession = Depends(get_async_session)
):
    try:
        # Validate email format
        if not validate_email_format(step_data.email):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid email format"
            )
        
        # Sanitize inputs
        step_data.first_name = sanitize_input(step_data.first_name, 100)
        step_data.last_name = sanitize_input(step_data.last_name, 100)
        
        # Check if email already exists (using safe SQLAlchemy query)
        stmt = select(ContactSubmission.id).where(ContactSubmission.email == step_data.email)
        result = await db.execute(stmt)
        existing_submission = result.first()
        
        if existing_submission:
            return {
                "status": "exists",
                "message": "Email already registered",
                "submission_id": existing_submission[0]
            }
        
        # Create initial submission
        client_ip = request.client.host
        user_agent = request.headers.get("user-agent", "")
        
        db_contact = ContactSubmission(
            first_name=step_data.first_name,
            last_name=step_data.last_name,
            email=step_data.email,
            form_step=1,
            ip_address=client_ip,
            user_agent=user_agent
        )
        
        db.add(db_contact)
        await db.commit()
        await db.refresh(db_contact)
        
        return {
            "status": "success",
            "message": "Step 1 completed",
            "submission_id": db_contact.id
        }
        
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to process step 1"
        )

@router.put("/{submission_id}/step2", response_model=dict)
@limiter.limit("10/minute")
async def update_contact_step2(
    request: Request,
    submission_id: int,
    step_data: ContactFormStep2,
    db: AsyncSession = Depends(get_async_session)
):
    try:
        # Validate phone format if provided
        if step_data.phone and not validate_phone_format(step_data.phone):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid phone number format"
            )
        
        # Sanitize inputs
        step_data.company = sanitize_input(step_data.company, 255)
        step_data.job_title = sanitize_input(step_data.job_title, 255)
        if step_data.phone:
            step_data.phone = sanitize_input(step_data.phone, 50)
        
        stmt = select(ContactSubmission).where(ContactSubmission.id == submission_id)
        result = await db.execute(stmt)
        contact = result.first()
        
        if not contact:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Contact submission not found"
            )
        
        # Update contact with step 2 data (using safe SQLAlchemy update)
        stmt = update(ContactSubmission).where(ContactSubmission.id == submission_id).values(
            company=step_data.company,
            job_title=step_data.job_title,
            phone=step_data.phone,
            company_size=step_data.company_size,
            form_step=2
        )
        await db.execute(stmt)
        await db.commit()
        
        return {
            "status": "success",
            "message": "Step 2 completed",
            "submission_id": submission_id
        }
        
    except HTTPException:
        raise
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to process step 2"
        )

@router.get("/", response_model=List[ContactSubmissionResponse])
async def get_contact_submissions(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_async_session)
):
    # Validate pagination parameters
    if skip < 0:
        skip = 0
    if limit > 100 or limit <= 0:
        limit = 100
    
    stmt = select(ContactSubmission).order_by(ContactSubmission.created_at.desc()).offset(skip).limit(limit)
    result = await db.execute(stmt)
    contacts = result.scalars().all()
    return [ContactSubmissionResponse.from_attributes(contact) for contact in contacts]

@router.put("/{submission_id}/step3", response_model=dict)
@limiter.limit("10/minute")
async def update_contact_step3(
    request: Request,
    submission_id: int,
    step_data: ContactFormStep3,
    db: AsyncSession = Depends(get_async_session)
):
    try:
        # Sanitize inputs
        step_data.industry = sanitize_input(step_data.industry, 100)
        
        stmt = select(ContactSubmission).where(ContactSubmission.id == submission_id)
        result = await db.execute(stmt)
        contact = result.first()
        
        if not contact:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Contact submission not found"
            )
        
        # Update contact with step 3 data
        stmt = update(ContactSubmission).where(ContactSubmission.id == submission_id).values(
            industry=step_data.industry,
            budget_range=step_data.budget_range,
            project_timeline=step_data.project_timeline,
            form_step=3
        )
        await db.execute(stmt)
        await db.commit()
        
        return {
            "status": "success",
            "message": "Step 3 completed",
            "submission_id": submission_id
        }
        
    except HTTPException:
        raise
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to process step 3"
        )

@router.put("/{submission_id}/step4", response_model=dict)
@limiter.limit("10/minute")
async def update_contact_step4(
    request: Request,
    submission_id: int,
    step_data: ContactFormStep4,
    db: AsyncSession = Depends(get_async_session)
):
    try:
        # Sanitize inputs
        step_data.project_description = sanitize_input(step_data.project_description, 5000)
        step_data.specific_challenges = sanitize_input(step_data.specific_challenges, 5000)
        
        stmt = select(ContactSubmission).where(ContactSubmission.id == submission_id)
        result = await db.execute(stmt)
        contact = result.first()
        
        if not contact:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Contact submission not found"
            )
        
        # Update contact with step 4 data
        stmt = update(ContactSubmission).where(ContactSubmission.id == submission_id).values(
            project_description=step_data.project_description,
            ai_experience=step_data.ai_experience,
            specific_challenges=step_data.specific_challenges,
            form_step=4
        )
        await db.execute(stmt)
        await db.commit()
        
        return {
            "status": "success",
            "message": "Step 4 completed",
            "submission_id": submission_id
        }
        
    except HTTPException:
        raise
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to process step 4"
        )

@router.put("/{submission_id}/step5", response_model=dict)
@limiter.limit("10/minute")
async def update_contact_step5(
    request: Request,
    submission_id: int,
    step_data: ContactFormStep5,
    db: AsyncSession = Depends(get_async_session)
):
    try:
        # Sanitize inputs
        if step_data.current_ai_tools:
            step_data.current_ai_tools = sanitize_input(step_data.current_ai_tools, 5000)
        step_data.expected_outcomes = sanitize_input(step_data.expected_outcomes, 5000)
        
        stmt = select(ContactSubmission).where(ContactSubmission.id == submission_id)
        result = await db.execute(stmt)
        contact = result.first()
        
        if not contact:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Contact submission not found"
            )
        
        # Update contact with step 5 data and finalize
        client_ip = request.client.host
        
        # Get the updated contact data for lead scoring
        contact_dict = {
            "first_name": contact[0].first_name,
            "last_name": contact[0].last_name,
            "email": contact[0].email,
            "company": contact[0].company,
            "job_title": contact[0].job_title,
            "company_size": contact[0].company_size,
            "industry": contact[0].industry,
            "budget_range": contact[0].budget_range,
            "project_timeline": contact[0].project_timeline,
            "project_description": contact[0].project_description,
            "ai_experience": contact[0].ai_experience,
            "specific_challenges": contact[0].specific_challenges,
            "current_ai_tools": step_data.current_ai_tools,
            "expected_outcomes": step_data.expected_outcomes
        }
        
        # Calculate final lead score
        lead_score = calculate_lead_score(contact_dict)
        is_qualified = lead_score >= 70
        
        # Final update
        stmt = update(ContactSubmission).where(ContactSubmission.id == submission_id).values(
            current_ai_tools=step_data.current_ai_tools,
            expected_outcomes=step_data.expected_outcomes,
            form_step=5,
            lead_score=lead_score,
            is_qualified=is_qualified
        )
        await db.execute(stmt)
        await db.commit()
        
        # Send notification email (non-blocking)
        try:
            updated_contact = await db.execute(select(ContactSubmission).where(ContactSubmission.id == submission_id))
            contact_obj = updated_contact.first()[0]
            await send_notification_email(contact_obj, is_qualified)
        except Exception as e:
            print(f"Failed to send notification email: {e}")
        
        return {
            "status": "success",
            "message": "Contact form completed successfully",
            "submission_id": submission_id,
            "lead_score": lead_score,
            "is_qualified": is_qualified
        }
        
    except HTTPException:
        raise
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to process step 5"
        )

@router.get("/{submission_id}/status", response_model=dict)
async def get_submission_status(
    submission_id: int,
    db: AsyncSession = Depends(get_async_session)
):
    try:
        stmt = select(ContactSubmission).where(ContactSubmission.id == submission_id)
        result = await db.execute(stmt)
        contact = result.first()
        
        if not contact:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Contact submission not found"
            )
        
        contact_obj = contact[0]
        return {
            "submission_id": submission_id,
            "form_step": contact_obj.form_step,
            "is_completed": contact_obj.form_step == 5,
            "lead_score": contact_obj.lead_score or 0,
            "is_qualified": contact_obj.is_qualified or False,
            "created_at": contact_obj.created_at.isoformat() if contact_obj.created_at else None
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get submission status"
        )