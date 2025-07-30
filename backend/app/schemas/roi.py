from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional, Dict, Any
from datetime import datetime

class ROICalculationInput(BaseModel):
    email: EmailStr
    company: Optional[str] = Field(None, max_length=255)
    industry: str = Field(..., min_length=1, max_length=100)
    company_size: str = Field(..., min_length=1, max_length=50)
    current_revenue: float = Field(..., gt=0, description="Annual revenue in USD")
    current_costs: float = Field(..., gt=0, description="Annual operational costs in USD")
    process_type: str = Field(..., min_length=1, max_length=100)
    current_processing_time: float = Field(..., gt=0, description="Hours per process")
    volume_processed: float = Field(..., gt=0, description="Number of processes per month")
    error_rate: Optional[float] = Field(None, ge=0, le=100, description="Error rate percentage")
    labor_costs: Optional[float] = Field(None, ge=0, description="Monthly labor costs in USD")

    @validator('error_rate')
    def validate_error_rate(cls, v):
        if v is not None and (v < 0 or v > 100):
            raise ValueError('Error rate must be between 0 and 100')
        return v

class ROICalculationResult(BaseModel):
    potential_savings: float = Field(..., description="Annual potential savings in USD")
    efficiency_gain: float = Field(..., description="Efficiency improvement percentage")
    payback_period: float = Field(..., description="Payback period in months")
    three_year_roi: float = Field(..., description="3-year ROI percentage")
    implementation_cost: float = Field(..., description="Estimated implementation cost")
    
    # Detailed breakdown
    time_savings: float = Field(..., description="Hours saved annually")
    cost_reduction: float = Field(..., description="Cost reduction from automation")
    error_reduction_savings: float = Field(..., description="Savings from reduced errors")
    productivity_increase: float = Field(..., description="Productivity increase percentage")
    
    # Monthly projections
    monthly_savings: float = Field(..., description="Monthly savings in USD")
    monthly_roi: float = Field(..., description="Monthly ROI percentage")

class ROICalculationCreate(ROICalculationInput):
    calculation_inputs: Dict[str, Any]
    calculation_results: Dict[str, Any]
    potential_savings: float
    efficiency_gain: float
    payback_period: float
    three_year_roi: float
    implementation_cost: float

class ROICalculationResponse(BaseModel):
    id: int
    email: str
    company: Optional[str]
    industry: str
    company_size: str
    current_revenue: float
    current_costs: float
    process_type: str
    current_processing_time: float
    volume_processed: float
    error_rate: Optional[float]
    labor_costs: Optional[float]
    
    potential_savings: float
    efficiency_gain: float
    payback_period: float
    three_year_roi: float
    implementation_cost: float
    
    calculation_inputs: Dict[str, Any]
    calculation_results: Dict[str, Any]
    
    pdf_generated: bool
    pdf_downloaded: bool
    follow_up_requested: bool
    
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True

class ROIQuickCalculation(BaseModel):
    industry: str = Field(..., min_length=1)
    company_size: str = Field(..., min_length=1)
    process_type: str = Field(..., min_length=1)
    monthly_volume: int = Field(..., gt=0)
    hours_per_task: float = Field(..., gt=0)
    hourly_rate: float = Field(default=50.0, gt=0)

class ROIQuickResult(BaseModel):
    monthly_hours_saved: float
    monthly_cost_savings: float
    annual_savings: float
    roi_percentage: float
    payback_months: float
    implementation_estimate: float