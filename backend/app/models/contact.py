from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, JSON, Float
from sqlalchemy.sql import func
from app.core.database import Base

class ContactSubmission(Base):
    __tablename__ = "contact_submissions"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    company = Column(String(255), nullable=True)
    job_title = Column(String(255), nullable=True)
    phone = Column(String(50), nullable=True)
    company_size = Column(String(50), nullable=True)
    industry = Column(String(100), nullable=True)
    budget_range = Column(String(50), nullable=True)
    project_timeline = Column(String(50), nullable=True)
    project_description = Column(Text, nullable=True)
    ai_experience = Column(String(50), nullable=True)
    specific_challenges = Column(Text, nullable=True)
    current_ai_tools = Column(Text, nullable=True)
    expected_outcomes = Column(Text, nullable=True)
    form_step = Column(Integer, default=1)
    is_qualified = Column(Boolean, default=False)
    lead_score = Column(Integer, default=0)
    utm_source = Column(String(100), nullable=True)
    utm_medium = Column(String(100), nullable=True)
    utm_campaign = Column(String(100), nullable=True)
    referrer = Column(String(500), nullable=True)
    ip_address = Column(String(45), nullable=True)
    user_agent = Column(Text, nullable=True)
    additional_data = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class ROICalculation(Base):
    __tablename__ = "roi_calculations"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), nullable=False, index=True)
    company = Column(String(255), nullable=True)
    industry = Column(String(100), nullable=False)
    company_size = Column(String(50), nullable=False)
    current_revenue = Column(Float, nullable=False)
    current_costs = Column(Float, nullable=False)
    process_type = Column(String(100), nullable=False)
    current_processing_time = Column(Float, nullable=False)
    volume_processed = Column(Float, nullable=False)
    error_rate = Column(Float, nullable=True)
    labor_costs = Column(Float, nullable=True)
    
    # Calculated fields
    potential_savings = Column(Float, nullable=False)
    efficiency_gain = Column(Float, nullable=False)
    payback_period = Column(Float, nullable=False)
    three_year_roi = Column(Float, nullable=False)
    implementation_cost = Column(Float, nullable=False)
    
    # Results metadata
    calculation_inputs = Column(JSON, nullable=False)
    calculation_results = Column(JSON, nullable=False)
    
    # PDF and follow-up
    pdf_generated = Column(Boolean, default=False)
    pdf_downloaded = Column(Boolean, default=False)
    follow_up_requested = Column(Boolean, default=False)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())