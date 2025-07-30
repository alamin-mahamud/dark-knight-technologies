from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from slowapi import Limiter
from slowapi.util import get_remote_address
from typing import List
import re

from app.core.database import get_async_session
from app.models.contact import ROICalculation

# Input validation functions for ROI
def validate_financial_input(value: float, field_name: str, min_val: float = 0) -> float:
    """Validate financial inputs"""
    if not isinstance(value, (int, float)) or value < min_val:
        raise ValueError(f"{field_name} must be a positive number")
    if value > 1e12:  # Prevent extremely large values
        raise ValueError(f"{field_name} value too large")
    return float(value)

def sanitize_text_input(text: str, max_length: int = 100) -> str:
    """Sanitize text inputs for ROI calculation"""
    if not text:
        return ""
    # Remove harmful characters
    sanitized = re.sub(r'[<>"\'\\/]', '', text)
    return sanitized[:max_length].strip()
from app.schemas.roi import (
    ROICalculationInput,
    ROICalculationResult,
    ROICalculationCreate,
    ROICalculationResponse,
    ROIQuickCalculation,
    ROIQuickResult
)
from app.utils.roi_calculator import calculate_roi, quick_roi_calculation
from app.utils.advanced_roi import AdvancedROICalculator
from app.utils.email import send_roi_report_email

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)

@router.post("/calculate", response_model=ROICalculationResult)
@limiter.limit("10/minute")
async def calculate_roi_endpoint(
    request: Request,
    roi_input: ROICalculationInput,
    db: AsyncSession = Depends(get_async_session)
):
    try:
        # Validate and sanitize inputs
        roi_data = roi_input.dict()
        
        # Validate financial inputs
        roi_data['current_revenue'] = validate_financial_input(roi_data['current_revenue'], 'Current revenue')
        roi_data['current_costs'] = validate_financial_input(roi_data['current_costs'], 'Current costs')
        roi_data['current_processing_time'] = validate_financial_input(roi_data['current_processing_time'], 'Processing time')
        roi_data['volume_processed'] = validate_financial_input(roi_data['volume_processed'], 'Volume processed')
        
        if 'error_rate' in roi_data and roi_data['error_rate'] is not None:
            roi_data['error_rate'] = validate_financial_input(roi_data['error_rate'], 'Error rate', 0)
            if roi_data['error_rate'] > 100:
                raise ValueError("Error rate cannot exceed 100%")
        
        if 'labor_costs' in roi_data and roi_data['labor_costs'] is not None:
            roi_data['labor_costs'] = validate_financial_input(roi_data['labor_costs'], 'Labor costs')
        
        # Sanitize text inputs
        roi_data['company'] = sanitize_text_input(roi_data.get('company', ''), 255)
        roi_data['industry'] = sanitize_text_input(roi_data['industry'], 100)
        roi_data['company_size'] = sanitize_text_input(roi_data['company_size'], 50)
        roi_data['process_type'] = sanitize_text_input(roi_data['process_type'], 100)
        
        # Perform ROI calculation
        calculation_result = calculate_roi(roi_data)
        
        # Save to database with validated data
        db_roi = ROICalculation(
            email=roi_input.email,
            company=roi_data['company'],
            industry=roi_data['industry'],
            company_size=roi_data['company_size'],
            current_revenue=roi_data['current_revenue'],
            current_costs=roi_data['current_costs'],
            process_type=roi_data['process_type'],
            current_processing_time=roi_data['current_processing_time'],
            volume_processed=roi_data['volume_processed'],
            error_rate=roi_data.get('error_rate'),
            labor_costs=roi_data.get('labor_costs'),
            potential_savings=calculation_result["potential_savings"],
            efficiency_gain=calculation_result["efficiency_gain"],
            payback_period=calculation_result["payback_period"],
            three_year_roi=calculation_result["three_year_roi"],
            implementation_cost=calculation_result["implementation_cost"],
            calculation_inputs=roi_data,
            calculation_results=calculation_result
        )
        
        db.add(db_roi)
        await db.commit()
        await db.refresh(db_roi)
        
        # Send ROI report email (non-blocking)
        try:
            await send_roi_report_email(roi_input.email, calculation_result)
        except Exception as e:
            print(f"Failed to send ROI report email: {e}")
        
        return ROICalculationResult(**calculation_result)
        
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to calculate ROI: {str(e)}"
        )

@router.post("/quick-calculate", response_model=ROIQuickResult)
@limiter.limit("20/minute")
async def quick_roi_calculation_endpoint(
    request: Request,
    quick_input: ROIQuickCalculation
):
    try:
        # Validate inputs for quick calculation
        quick_data = quick_input.dict()
        quick_data['monthly_volume'] = validate_financial_input(quick_data['monthly_volume'], 'Monthly volume', 1)
        quick_data['hours_per_task'] = validate_financial_input(quick_data['hours_per_task'], 'Hours per task', 0.01)
        
        if 'hourly_rate' in quick_data and quick_data['hourly_rate'] is not None:
            quick_data['hourly_rate'] = validate_financial_input(quick_data['hourly_rate'], 'Hourly rate', 1)
        
        result = quick_roi_calculation(quick_data)
        return ROIQuickResult(**result)
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to calculate quick ROI: {str(e)}"
        )

@router.post("/advanced-calculate", response_model=dict)
@limiter.limit("10/minute")
async def advanced_roi_calculation_endpoint(
    request: Request,
    roi_input: ROICalculationInput,
    db: AsyncSession = Depends(get_async_session)
):
    try:
        # Use advanced ROI calculator
        calculator = AdvancedROICalculator()
        advanced_result = calculator.calculate_advanced_roi(roi_input.dict())
        
        # Save to database with advanced metrics
        db_roi = ROICalculation(
            email=roi_input.email,
            company=roi_input.company,
            industry=roi_input.industry,
            company_size=roi_input.company_size,
            current_revenue=roi_input.current_revenue,
            current_costs=roi_input.current_costs,
            process_type=roi_input.process_type,
            current_processing_time=roi_input.current_processing_time,
            volume_processed=roi_input.volume_processed,
            error_rate=roi_input.error_rate,
            labor_costs=roi_input.labor_costs,
            potential_savings=advanced_result["potential_savings"],
            efficiency_gain=advanced_result["efficiency_gain"],
            payback_period=advanced_result["payback_period"],
            three_year_roi=advanced_result["three_year_roi"],
            implementation_cost=advanced_result["implementation_cost"],
            calculation_inputs=roi_input.dict(),
            calculation_results=advanced_result
        )
        
        db.add(db_roi)
        await db.commit()
        await db.refresh(db_roi)
        
        return {
            "calculation_id": db_roi.id,
            "advanced_metrics": advanced_result,
            "summary": {
                "recommendation": advanced_result["recommendation"]["recommendation"],
                "confidence_score": advanced_result["confidence_score"],
                "net_savings": advanced_result["net_savings"],
                "risk_score": advanced_result["risk_score"]
            }
        }
        
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to calculate advanced ROI: {str(e)}"
        )

@router.get("/", response_model=List[ROICalculationResponse])
async def get_roi_calculations(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_async_session)
):
    try:
        # Validate pagination parameters
        if skip < 0:
            skip = 0
        if limit > 100 or limit <= 0:
            limit = 100
            
        stmt = select(ROICalculation).order_by(ROICalculation.created_at.desc()).offset(skip).limit(limit)
        result = await db.execute(stmt)
        calculations = result.scalars().all()
        return [ROICalculationResponse.from_attributes(calc) for calc in calculations]
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve ROI calculations"
        )

@router.get("/{calculation_id}", response_model=ROICalculationResponse)
async def get_roi_calculation(
    calculation_id: int,
    db: AsyncSession = Depends(get_async_session)
):
    try:
        stmt = select(ROICalculation).where(ROICalculation.id == calculation_id)
        result = await db.execute(stmt)
        calculation = result.first()
        
        if not calculation:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="ROI calculation not found"
            )
        
        calculation_obj = calculation[0]
        return ROICalculationResponse.from_attributes(calculation_obj)
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve ROI calculation"
        )

@router.post("/{calculation_id}/request-follow-up", response_model=dict)
@limiter.limit("5/minute")
async def request_follow_up(
    request: Request,
    calculation_id: int,
    db: AsyncSession = Depends(get_async_session)
):
    try:
        stmt = select(ROICalculation).where(ROICalculation.id == calculation_id)
        result = await db.execute(stmt)
        calculation = result.first()
        
        if not calculation:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="ROI calculation not found"
            )
        
        # Update follow-up request using safe SQLAlchemy update
        stmt = update(ROICalculation).where(ROICalculation.id == calculation_id).values(
            follow_up_requested=True
        )
        await db.execute(stmt)
        await db.commit()
        
        return {
            "status": "success",
            "message": "Follow-up requested successfully"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to request follow-up"
        )