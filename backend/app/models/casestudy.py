from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, JSON, Float, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class CaseStudy(Base):
    __tablename__ = "case_studies"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False, index=True)
    slug = Column(String(255), unique=True, nullable=False, index=True)
    client_name = Column(String(255), nullable=False)
    client_logo_url = Column(String(500), nullable=True)
    industry = Column(String(100), nullable=False, index=True)
    company_size = Column(String(50), nullable=False)
    
    # Challenge/Solution/Results structure
    challenge = Column(Text, nullable=False)
    solution = Column(Text, nullable=False)
    results = Column(Text, nullable=False)
    
    # Key metrics
    implementation_time = Column(Integer, nullable=False)  # days
    cost_savings = Column(Float, nullable=True)  # annual savings in USD
    efficiency_gain = Column(Float, nullable=True)  # percentage
    roi_percentage = Column(Float, nullable=True)  # 3-year ROI
    error_reduction = Column(Float, nullable=True)  # percentage
    time_savings = Column(Float, nullable=True)  # hours saved annually
    
    # Technologies and processes
    technologies_used = Column(JSON, nullable=True)  # ['ML', 'NLP', 'Computer Vision']
    process_types = Column(JSON, nullable=True)  # ['data_processing', 'automation']
    
    # Content and media
    hero_image_url = Column(String(500), nullable=True)
    client_testimonial = Column(Text, nullable=True)
    client_testimonial_author = Column(String(255), nullable=True)
    client_testimonial_title = Column(String(255), nullable=True)
    
    # SEO and metadata
    meta_description = Column(String(500), nullable=True)
    keywords = Column(JSON, nullable=True)
    
    # Publishing
    is_published = Column(Boolean, default=False)
    is_featured = Column(Boolean, default=False)
    publish_date = Column(DateTime(timezone=True), nullable=True)
    
    # Analytics
    view_count = Column(Integer, default=0)
    lead_generation_count = Column(Integer, default=0)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    metrics = relationship("CaseStudyMetric", back_populates="case_study", cascade="all, delete-orphan")
    timeline_items = relationship("CaseStudyTimeline", back_populates="case_study", cascade="all, delete-orphan")

class CaseStudyMetric(Base):
    __tablename__ = "case_study_metrics"

    id = Column(Integer, primary_key=True, index=True)
    case_study_id = Column(Integer, ForeignKey("case_studies.id"), nullable=False)
    
    metric_name = Column(String(255), nullable=False)  # "Cost Reduction", "Time Saved", etc.
    metric_value = Column(String(100), nullable=False)  # "85%", "$2.3M", "1,200 hours"
    metric_description = Column(String(500), nullable=True)
    metric_icon = Column(String(100), nullable=True)  # icon identifier
    display_order = Column(Integer, default=0)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    case_study = relationship("CaseStudy", back_populates="metrics")

class CaseStudyTimeline(Base):
    __tablename__ = "case_study_timeline"

    id = Column(Integer, primary_key=True, index=True)
    case_study_id = Column(Integer, ForeignKey("case_studies.id"), nullable=False)
    
    phase_name = Column(String(255), nullable=False)  # "Discovery", "Development", "Deployment"
    phase_description = Column(Text, nullable=False)
    days_duration = Column(Integer, nullable=False)
    phase_order = Column(Integer, nullable=False)
    
    # Phase details
    deliverables = Column(JSON, nullable=True)  # ["Data analysis", "Model training"]
    key_milestones = Column(JSON, nullable=True)  # ["95% accuracy achieved"]
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    case_study = relationship("CaseStudy", back_populates="timeline_items")

class CaseStudyInquiry(Base):
    __tablename__ = "case_study_inquiries"

    id = Column(Integer, primary_key=True, index=True)
    case_study_id = Column(Integer, ForeignKey("case_studies.id"), nullable=False)
    
    # Contact information
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    company = Column(String(255), nullable=True)
    job_title = Column(String(255), nullable=True)
    
    # Inquiry details
    inquiry_message = Column(Text, nullable=True)
    similar_challenge = Column(Boolean, default=False)
    interested_services = Column(JSON, nullable=True)
    
    # Tracking
    referrer_url = Column(String(500), nullable=True)
    ip_address = Column(String(45), nullable=True)
    user_agent = Column(Text, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class IndustryBenchmark(Base):
    __tablename__ = "industry_benchmarks"

    id = Column(Integer, primary_key=True, index=True)
    industry = Column(String(100), nullable=False, index=True)
    process_type = Column(String(100), nullable=False, index=True)
    
    # Benchmark metrics
    avg_implementation_time = Column(Integer, nullable=False)  # days
    avg_cost_savings = Column(Float, nullable=False)  # percentage
    avg_efficiency_gain = Column(Float, nullable=False)  # percentage
    avg_roi = Column(Float, nullable=False)  # percentage
    
    # Sample size and confidence
    sample_size = Column(Integer, nullable=False)
    confidence_level = Column(Float, default=95.0)  # percentage
    last_updated = Column(DateTime(timezone=True), server_default=func.now())
    
    # Additional context
    notes = Column(Text, nullable=True)
    data_sources = Column(JSON, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())