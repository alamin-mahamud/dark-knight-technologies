from fastapi import APIRouter, Depends, HTTPException, Request, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_, or_, Integer
from slowapi import Limiter
from slowapi.util import get_remote_address
from typing import List, Optional

from app.core.database import get_async_session
from app.models.casestudy import CaseStudy, CaseStudyMetric, CaseStudyTimeline, CaseStudyInquiry, IndustryBenchmark
from app.schemas.casestudy import (
    CaseStudyCreate,
    CaseStudyUpdate,
    CaseStudyResponse,
    CaseStudyListResponse,
    CaseStudyInquiryCreate,
    CaseStudyInquiryResponse,
    IndustryBenchmarkCreate,
    IndustryBenchmarkResponse,
    CaseStudyFilter,
    CaseStudyStats
)

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)

@router.get("/", response_model=List[CaseStudyListResponse])
async def get_case_studies(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    industry: Optional[str] = Query(None),
    company_size: Optional[str] = Query(None),
    technology: Optional[str] = Query(None),
    process_type: Optional[str] = Query(None),
    is_featured: Optional[bool] = Query(None),
    published_only: bool = Query(True),
    db: AsyncSession = Depends(get_async_session)
):
    try:
        query = select(CaseStudy)
        
        # Apply filters
        if published_only:
            query = query.where(CaseStudy.is_published == True)
        
        if industry:
            query = query.where(CaseStudy.industry.ilike(f"%{industry}%"))
        
        if company_size:
            query = query.where(CaseStudy.company_size.ilike(f"%{company_size}%"))
        
        if technology:
            query = query.where(CaseStudy.technologies_used.contains([technology]))
        
        if process_type:
            query = query.where(CaseStudy.process_types.contains([process_type]))
            
        if is_featured is not None:
            query = query.where(CaseStudy.is_featured == is_featured)
        
        # Order by featured first, then by publish date
        query = query.order_by(CaseStudy.is_featured.desc(), CaseStudy.publish_date.desc())
        query = query.offset(skip).limit(limit)
        
        result = await db.execute(query)
        case_studies = result.scalars().all()
        
        return [CaseStudyListResponse.from_orm(cs) for cs in case_studies]
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve case studies"
        )

@router.get("/featured", response_model=List[CaseStudyListResponse])
async def get_featured_case_studies(
    limit: int = Query(6, ge=1, le=20),
    db: AsyncSession = Depends(get_async_session)
):
    try:
        query = select(CaseStudy).where(
            and_(CaseStudy.is_featured == True, CaseStudy.is_published == True)
        ).order_by(CaseStudy.publish_date.desc()).limit(limit)
        
        result = await db.execute(query)
        case_studies = result.scalars().all()
        
        return [CaseStudyListResponse.from_orm(cs) for cs in case_studies]
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve featured case studies"
        )

@router.get("/stats", response_model=CaseStudyStats)
async def get_case_study_stats(
    db: AsyncSession = Depends(get_async_session)
):
    try:
        # Get aggregate statistics
        stats_query = select(
            func.count(CaseStudy.id).label('total_case_studies'),
            func.sum(CaseStudy.cost_savings).label('total_cost_savings'),
            func.avg(CaseStudy.implementation_time).label('avg_implementation_time'),
            func.avg(CaseStudy.roi_percentage).label('avg_roi'),
            func.avg(CaseStudy.efficiency_gain).label('avg_efficiency_gain'),
            func.count(func.distinct(CaseStudy.industry)).label('industries_served'),
            func.sum(func.cast(CaseStudy.is_featured, Integer)).label('featured_count')
        ).where(CaseStudy.is_published == True)
        
        result = await db.execute(stats_query)
        stats = result.first()
        
        return CaseStudyStats(
            total_case_studies=stats.total_case_studies or 0,
            total_cost_savings=stats.total_cost_savings or 0.0,
            avg_implementation_time=stats.avg_implementation_time or 0.0,
            avg_roi=stats.avg_roi or 0.0,
            avg_efficiency_gain=stats.avg_efficiency_gain or 0.0,
            industries_served=stats.industries_served or 0,
            featured_count=stats.featured_count or 0
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve statistics"
        )

@router.get("/{slug}", response_model=CaseStudyResponse)
async def get_case_study_by_slug(
    slug: str,
    db: AsyncSession = Depends(get_async_session)
):
    try:
        query = select(CaseStudy).where(
            and_(CaseStudy.slug == slug, CaseStudy.is_published == True)
        )
        result = await db.execute(query)
        case_study = result.scalar_one_or_none()
        
        if not case_study:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Case study not found"
            )
        
        # Increment view count
        case_study.view_count += 1
        await db.commit()
        
        return CaseStudyResponse.from_orm(case_study)
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve case study"
        )

@router.post("/{case_study_id}/inquire", response_model=CaseStudyInquiryResponse)
@limiter.limit("5/minute")
async def create_case_study_inquiry(
    request: Request,
    case_study_id: int,
    inquiry_data: CaseStudyInquiryCreate,
    db: AsyncSession = Depends(get_async_session)
):
    try:
        # Verify case study exists
        case_study_query = select(CaseStudy).where(CaseStudy.id == case_study_id)
        case_study_result = await db.execute(case_study_query)
        case_study = case_study_result.scalar_one_or_none()
        
        if not case_study:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Case study not found"
            )
        
        # Create inquiry
        client_ip = request.client.host
        user_agent = request.headers.get("user-agent", "")
        referrer = request.headers.get("referer", "")
        
        db_inquiry = CaseStudyInquiry(
            **inquiry_data.dict(),
            referrer_url=referrer,
            ip_address=client_ip,
            user_agent=user_agent
        )
        
        db.add(db_inquiry)
        await db.commit()
        await db.refresh(db_inquiry)
        
        # Increment lead generation count for case study
        case_study.lead_generation_count += 1
        await db.commit()
        
        return CaseStudyInquiryResponse.from_orm(db_inquiry)
        
    except HTTPException:
        raise
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create inquiry"
        )

@router.get("/industries/benchmarks", response_model=List[IndustryBenchmarkResponse])
async def get_industry_benchmarks(
    industry: Optional[str] = Query(None),
    process_type: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_async_session)
):
    try:
        query = select(IndustryBenchmark)
        
        if industry:
            query = query.where(IndustryBenchmark.industry.ilike(f"%{industry}%"))
        
        if process_type:
            query = query.where(IndustryBenchmark.process_type.ilike(f"%{process_type}%"))
        
        query = query.order_by(IndustryBenchmark.industry, IndustryBenchmark.process_type)
        
        result = await db.execute(query)
        benchmarks = result.scalars().all()
        
        return [IndustryBenchmarkResponse.from_orm(b) for b in benchmarks]
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve industry benchmarks"
        )

@router.get("/similar/{case_study_id}", response_model=List[CaseStudyListResponse])
async def get_similar_case_studies(
    case_study_id: int,
    limit: int = Query(4, ge=1, le=10),
    db: AsyncSession = Depends(get_async_session)
):
    try:
        # Get the current case study
        current_query = select(CaseStudy).where(CaseStudy.id == case_study_id)
        current_result = await db.execute(current_query)
        current_case_study = current_result.scalar_one_or_none()
        
        if not current_case_study:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Case study not found"
            )
        
        # Find similar case studies based on industry and company size
        similar_query = select(CaseStudy).where(
            and_(
                CaseStudy.id != case_study_id,
                CaseStudy.is_published == True,
                or_(
                    CaseStudy.industry == current_case_study.industry,
                    CaseStudy.company_size == current_case_study.company_size
                )
            )
        ).order_by(CaseStudy.view_count.desc()).limit(limit)
        
        result = await db.execute(similar_query)
        similar_studies = result.scalars().all()
        
        return [CaseStudyListResponse.from_orm(cs) for cs in similar_studies]
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve similar case studies"
        )