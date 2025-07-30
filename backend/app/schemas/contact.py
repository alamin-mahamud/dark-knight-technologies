from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional, Dict, Any
from datetime import datetime

class ContactSubmissionBase(BaseModel):
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    company: Optional[str] = Field(None, max_length=255)
    job_title: Optional[str] = Field(None, max_length=255)
    phone: Optional[str] = Field(None, max_length=50)
    company_size: Optional[str] = None
    industry: Optional[str] = Field(None, max_length=100)
    budget_range: Optional[str] = None
    project_timeline: Optional[str] = None
    project_description: Optional[str] = None
    ai_experience: Optional[str] = None
    specific_challenges: Optional[str] = None
    current_ai_tools: Optional[str] = None
    expected_outcomes: Optional[str] = None
    form_step: Optional[int] = Field(default=1, ge=1, le=5)
    utm_source: Optional[str] = Field(None, max_length=100)
    utm_medium: Optional[str] = Field(None, max_length=100)
    utm_campaign: Optional[str] = Field(None, max_length=100)
    referrer: Optional[str] = Field(None, max_length=500)
    additional_data: Optional[Dict[str, Any]] = None

class ContactSubmissionCreate(ContactSubmissionBase):
    pass

class ContactSubmissionUpdate(BaseModel):
    first_name: Optional[str] = Field(None, min_length=1, max_length=100)
    last_name: Optional[str] = Field(None, min_length=1, max_length=100)
    email: Optional[EmailStr] = None
    company: Optional[str] = Field(None, max_length=255)
    job_title: Optional[str] = Field(None, max_length=255)
    phone: Optional[str] = Field(None, max_length=50)
    company_size: Optional[str] = None
    industry: Optional[str] = Field(None, max_length=100)
    budget_range: Optional[str] = None
    project_timeline: Optional[str] = None
    project_description: Optional[str] = None
    ai_experience: Optional[str] = None
    specific_challenges: Optional[str] = None
    current_ai_tools: Optional[str] = None
    expected_outcomes: Optional[str] = None
    form_step: Optional[int] = Field(None, ge=1, le=5)
    additional_data: Optional[Dict[str, Any]] = None

class ContactSubmissionResponse(ContactSubmissionBase):
    id: int
    is_qualified: bool
    lead_score: int
    ip_address: Optional[str]
    user_agent: Optional[str]
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True

class ContactFormStep1(BaseModel):
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr

class ContactFormStep2(BaseModel):
    company: str = Field(..., min_length=1, max_length=255)
    job_title: str = Field(..., min_length=1, max_length=255)
    phone: Optional[str] = Field(None, max_length=50)
    company_size: str = Field(..., min_length=1)

class ContactFormStep3(BaseModel):
    industry: str = Field(..., min_length=1, max_length=100)
    budget_range: str = Field(..., min_length=1)
    project_timeline: str = Field(..., min_length=1)

class ContactFormStep4(BaseModel):
    project_description: str = Field(..., min_length=10)
    ai_experience: str = Field(..., min_length=1)
    specific_challenges: str = Field(..., min_length=10)

class ContactFormStep5(BaseModel):
    current_ai_tools: Optional[str] = None
    expected_outcomes: str = Field(..., min_length=10)