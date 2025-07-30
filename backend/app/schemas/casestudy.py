from pydantic import BaseModel, Field, validator
from typing import Optional, List, Dict, Any
from datetime import datetime

class CaseStudyMetricBase(BaseModel):
    metric_name: str = Field(..., min_length=1, max_length=255)
    metric_value: str = Field(..., min_length=1, max_length=100)
    metric_description: Optional[str] = Field(None, max_length=500)
    metric_icon: Optional[str] = Field(None, max_length=100)
    display_order: int = Field(default=0)

class CaseStudyMetricCreate(CaseStudyMetricBase):
    pass

class CaseStudyMetricResponse(CaseStudyMetricBase):
    id: int
    case_study_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class CaseStudyTimelineBase(BaseModel):
    phase_name: str = Field(..., min_length=1, max_length=255)
    phase_description: str = Field(..., min_length=1)
    days_duration: int = Field(..., gt=0)
    phase_order: int = Field(..., ge=0)
    deliverables: Optional[List[str]] = None
    key_milestones: Optional[List[str]] = None

class CaseStudyTimelineCreate(CaseStudyTimelineBase):
    pass

class CaseStudyTimelineResponse(CaseStudyTimelineBase):
    id: int
    case_study_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class CaseStudyBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    client_name: str = Field(..., min_length=1, max_length=255)
    client_logo_url: Optional[str] = Field(None, max_length=500)
    industry: str = Field(..., min_length=1, max_length=100)
    company_size: str = Field(..., min_length=1, max_length=50)
    
    challenge: str = Field(..., min_length=10)
    solution: str = Field(..., min_length=10)
    results: str = Field(..., min_length=10)
    
    implementation_time: int = Field(..., gt=0, description="Implementation time in days")
    cost_savings: Optional[float] = Field(None, ge=0)
    efficiency_gain: Optional[float] = Field(None, ge=0, le=100)
    roi_percentage: Optional[float] = Field(None, ge=0)
    error_reduction: Optional[float] = Field(None, ge=0, le=100)
    time_savings: Optional[float] = Field(None, ge=0)
    
    technologies_used: Optional[List[str]] = None
    process_types: Optional[List[str]] = None
    
    hero_image_url: Optional[str] = Field(None, max_length=500)
    client_testimonial: Optional[str] = None
    client_testimonial_author: Optional[str] = Field(None, max_length=255)
    client_testimonial_title: Optional[str] = Field(None, max_length=255)
    
    meta_description: Optional[str] = Field(None, max_length=500)
    keywords: Optional[List[str]] = None
    
    is_published: bool = Field(default=False)
    is_featured: bool = Field(default=False)

class CaseStudyCreate(CaseStudyBase):
    slug: str = Field(..., min_length=1, max_length=255)
    metrics: Optional[List[CaseStudyMetricCreate]] = []
    timeline_items: Optional[List[CaseStudyTimelineCreate]] = []

class CaseStudyUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    client_name: Optional[str] = Field(None, min_length=1, max_length=255)
    client_logo_url: Optional[str] = Field(None, max_length=500)
    industry: Optional[str] = Field(None, min_length=1, max_length=100)
    company_size: Optional[str] = Field(None, min_length=1, max_length=50)
    
    challenge: Optional[str] = Field(None, min_length=10)
    solution: Optional[str] = Field(None, min_length=10)
    results: Optional[str] = Field(None, min_length=10)
    
    implementation_time: Optional[int] = Field(None, gt=0)
    cost_savings: Optional[float] = Field(None, ge=0)
    efficiency_gain: Optional[float] = Field(None, ge=0, le=100)
    roi_percentage: Optional[float] = Field(None, ge=0)
    error_reduction: Optional[float] = Field(None, ge=0, le=100)
    time_savings: Optional[float] = Field(None, ge=0)
    
    technologies_used: Optional[List[str]] = None
    process_types: Optional[List[str]] = None
    
    hero_image_url: Optional[str] = Field(None, max_length=500)
    client_testimonial: Optional[str] = None
    client_testimonial_author: Optional[str] = Field(None, max_length=255)
    client_testimonial_title: Optional[str] = Field(None, max_length=255)
    
    meta_description: Optional[str] = Field(None, max_length=500)
    keywords: Optional[List[str]] = None
    
    is_published: Optional[bool] = None
    is_featured: Optional[bool] = None

class CaseStudyResponse(CaseStudyBase):
    id: int
    slug: str
    view_count: int
    lead_generation_count: int
    publish_date: Optional[datetime]
    created_at: datetime
    updated_at: Optional[datetime]
    
    metrics: List[CaseStudyMetricResponse] = []
    timeline_items: List[CaseStudyTimelineResponse] = []

    class Config:
        from_attributes = True

class CaseStudyListResponse(BaseModel):
    id: int
    title: str
    slug: str
    client_name: str
    client_logo_url: Optional[str]
    industry: str
    company_size: str
    implementation_time: int
    cost_savings: Optional[float]
    efficiency_gain: Optional[float]
    roi_percentage: Optional[float]
    hero_image_url: Optional[str]
    meta_description: Optional[str]
    is_featured: bool
    view_count: int
    publish_date: Optional[datetime]
    created_at: datetime

    class Config:
        from_attributes = True

class CaseStudyInquiryCreate(BaseModel):
    case_study_id: int
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: str = Field(..., min_length=1, max_length=100)
    email: str = Field(..., min_length=1, max_length=255)
    company: Optional[str] = Field(None, max_length=255)
    job_title: Optional[str] = Field(None, max_length=255)
    inquiry_message: Optional[str] = None
    similar_challenge: bool = Field(default=False)
    interested_services: Optional[List[str]] = None

class CaseStudyInquiryResponse(CaseStudyInquiryCreate):
    id: int
    referrer_url: Optional[str]
    ip_address: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

class IndustryBenchmarkCreate(BaseModel):
    industry: str = Field(..., min_length=1, max_length=100)
    process_type: str = Field(..., min_length=1, max_length=100)
    avg_implementation_time: int = Field(..., gt=0)
    avg_cost_savings: float = Field(..., ge=0, le=100)
    avg_efficiency_gain: float = Field(..., ge=0, le=100)
    avg_roi: float = Field(..., ge=0)
    sample_size: int = Field(..., gt=0)
    confidence_level: float = Field(default=95.0, ge=80, le=99)
    notes: Optional[str] = None
    data_sources: Optional[List[str]] = None

class IndustryBenchmarkResponse(IndustryBenchmarkCreate):
    id: int
    last_updated: datetime
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True

class CaseStudyFilter(BaseModel):
    industry: Optional[str] = None
    company_size: Optional[str] = None
    technology: Optional[str] = None
    process_type: Optional[str] = None
    min_roi: Optional[float] = None
    max_implementation_time: Optional[int] = None
    is_featured: Optional[bool] = None

class CaseStudyStats(BaseModel):
    total_case_studies: int
    total_cost_savings: float
    avg_implementation_time: float
    avg_roi: float
    avg_efficiency_gain: float
    industries_served: int
    featured_count: int