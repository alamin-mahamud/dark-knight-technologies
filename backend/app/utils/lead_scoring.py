from typing import Dict, Any

def calculate_lead_score(contact_data: Dict[str, Any]) -> int:
    score = 0
    
    # Company size scoring
    company_size = contact_data.get('company_size', '').lower()
    if 'enterprise' in company_size or '1000+' in company_size or '500+' in company_size:
        score += 25
    elif 'medium' in company_size or '100-500' in company_size or '50-100' in company_size:
        score += 20
    elif 'small' in company_size or '10-50' in company_size:
        score += 15
    elif 'startup' in company_size or '1-10' in company_size:
        score += 10
    
    # Budget range scoring
    budget_range = contact_data.get('budget_range', '').lower()
    if '$100k+' in budget_range or '$500k+' in budget_range or '$1m+' in budget_range:
        score += 30
    elif '$50k-$100k' in budget_range:
        score += 25
    elif '$25k-$50k' in budget_range:
        score += 20
    elif '$10k-$25k' in budget_range:
        score += 15
    elif '$5k-$10k' in budget_range:
        score += 10
    
    # Project timeline scoring
    timeline = contact_data.get('project_timeline', '').lower()
    if 'immediate' in timeline or '1 month' in timeline or '1-3 months' in timeline:
        score += 20
    elif '3-6 months' in timeline:
        score += 15
    elif '6-12 months' in timeline:
        score += 10
    elif '12+ months' in timeline:
        score += 5
    
    # Industry scoring (AI-friendly industries)
    industry = contact_data.get('industry', '').lower()
    high_value_industries = [
        'technology', 'healthcare', 'finance', 'manufacturing', 
        'retail', 'logistics', 'automotive', 'pharma'
    ]
    if any(ind in industry for ind in high_value_industries):
        score += 15
    
    # AI experience scoring
    ai_experience = contact_data.get('ai_experience', '').lower()
    if 'advanced' in ai_experience or 'expert' in ai_experience:
        score += 15
    elif 'intermediate' in ai_experience or 'some' in ai_experience:
        score += 10
    elif 'beginner' in ai_experience or 'basic' in ai_experience:
        score += 5
    
    # Job title scoring
    job_title = contact_data.get('job_title', '').lower()
    high_authority_titles = [
        'ceo', 'cto', 'cio', 'vp', 'director', 'head', 'chief', 'president'
    ]
    if any(title in job_title for title in high_authority_titles):
        score += 15
    elif 'manager' in job_title or 'lead' in job_title:
        score += 10
    
    # Form completion scoring
    form_step = contact_data.get('form_step', 1)
    if form_step >= 5:
        score += 20  # Completed full form
    elif form_step >= 3:
        score += 15
    elif form_step >= 2:
        score += 10
    
    # Project description quality (basic length check)
    project_desc = contact_data.get('project_description', '')
    if len(project_desc) > 200:
        score += 10
    elif len(project_desc) > 100:
        score += 5
    
    return min(score, 100)  # Cap at 100