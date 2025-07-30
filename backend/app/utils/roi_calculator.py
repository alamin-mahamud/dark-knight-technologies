from typing import Dict, Any
import math

def calculate_roi(input_data: Dict[str, Any]) -> Dict[str, Any]:
    # Extract input values
    current_revenue = input_data['current_revenue']
    current_costs = input_data['current_costs']
    processing_time = input_data['current_processing_time']
    volume_per_month = input_data['volume_processed']
    error_rate = input_data.get('error_rate', 5.0) / 100  # Convert to decimal
    labor_costs = input_data.get('labor_costs', processing_time * volume_per_month * 50)  # Default $50/hour
    industry = input_data['industry']
    company_size = input_data['company_size']
    process_type = input_data['process_type']
    
    # Industry multipliers for AI adoption impact
    industry_multipliers = {
        'technology': 1.2,
        'finance': 1.3,
        'healthcare': 1.1,
        'manufacturing': 1.4,
        'retail': 1.2,
        'logistics': 1.3,
        'automotive': 1.2,
        'default': 1.0
    }
    
    # Company size multipliers
    size_multipliers = {
        'enterprise': 1.3,
        'large': 1.2,
        'medium': 1.1,
        'small': 1.0,
        'startup': 0.9
    }
    
    # Process type efficiency gains
    process_efficiency = {
        'data_processing': 0.75,  # 75% time reduction
        'document_analysis': 0.80,
        'customer_service': 0.60,
        'quality_control': 0.70,
        'inventory_management': 0.65,
        'financial_analysis': 0.70,
        'hr_screening': 0.75,
        'default': 0.65
    }
    
    # Get multipliers
    industry_mult = industry_multipliers.get(industry.lower(), industry_multipliers['default'])
    size_mult = size_multipliers.get(company_size.lower(), 1.0)
    efficiency_gain = process_efficiency.get(process_type.lower(), process_efficiency['default'])
    
    # Calculate base savings
    annual_volume = volume_per_month * 12
    current_annual_hours = annual_volume * processing_time
    
    # Time savings
    time_saved_annually = current_annual_hours * efficiency_gain
    
    # Cost savings calculations
    hourly_rate = labor_costs / (volume_per_month * processing_time) if (volume_per_month * processing_time) > 0 else 50
    direct_labor_savings = time_saved_annually * hourly_rate
    
    # Error reduction savings
    error_cost_per_incident = current_costs / annual_volume * 0.1  # Assume 10% of cost per unit for errors
    current_error_cost = annual_volume * error_rate * error_cost_per_incident
    reduced_error_rate = error_rate * 0.3  # 70% error reduction
    new_error_cost = annual_volume * reduced_error_rate * error_cost_per_incident
    error_reduction_savings = current_error_cost - new_error_cost
    
    # Productivity increase (additional capacity)
    productivity_increase = efficiency_gain * 0.8  # 80% of time saved becomes productive
    productivity_value = current_revenue * productivity_increase * 0.2  # 20% of revenue benefit
    
    # Total potential savings
    total_annual_savings = (direct_labor_savings + error_reduction_savings + productivity_value) * industry_mult * size_mult
    
    # Implementation cost estimation
    base_implementation_cost = 50000  # Base cost
    complexity_multiplier = {
        'simple': 0.8,
        'medium': 1.0,
        'complex': 1.3,
        'enterprise': 1.6
    }
    
    # Determine complexity based on company size and process
    if 'enterprise' in company_size.lower() or 'large' in company_size.lower():
        complexity = 'enterprise'
    elif 'medium' in company_size.lower():
        complexity = 'complex'
    elif 'small' in company_size.lower():
        complexity = 'medium'
    else:
        complexity = 'simple'
    
    implementation_cost = base_implementation_cost * complexity_multiplier[complexity]
    
    # Calculate ROI metrics
    monthly_savings = total_annual_savings / 12
    payback_period = implementation_cost / monthly_savings if monthly_savings > 0 else 999
    three_year_total_savings = total_annual_savings * 3
    three_year_roi = ((three_year_total_savings - implementation_cost) / implementation_cost) * 100
    
    # Monthly ROI
    monthly_roi = (monthly_savings / implementation_cost) * 100 if implementation_cost > 0 else 0
    
    return {
        'potential_savings': round(total_annual_savings, 2),
        'efficiency_gain': round(efficiency_gain * 100, 1),
        'payback_period': round(payback_period, 1),
        'three_year_roi': round(three_year_roi, 1),
        'implementation_cost': round(implementation_cost, 2),
        'time_savings': round(time_saved_annually, 1),
        'cost_reduction': round(direct_labor_savings, 2),
        'error_reduction_savings': round(error_reduction_savings, 2),
        'productivity_increase': round(productivity_increase * 100, 1),
        'monthly_savings': round(monthly_savings, 2),
        'monthly_roi': round(monthly_roi, 2)
    }

def quick_roi_calculation(input_data: Dict[str, Any]) -> Dict[str, Any]:
    # Simplified ROI calculation for quick estimates
    monthly_volume = input_data['monthly_volume']
    hours_per_task = input_data['hours_per_task']
    hourly_rate = input_data.get('hourly_rate', 50.0)
    
    # Assume 65% efficiency gain for quick calculation
    efficiency_gain = 0.65
    
    # Calculate savings
    monthly_hours_current = monthly_volume * hours_per_task
    monthly_hours_saved = monthly_hours_current * efficiency_gain
    monthly_cost_savings = monthly_hours_saved * hourly_rate
    annual_savings = monthly_cost_savings * 12
    
    # Quick implementation estimate based on volume
    if monthly_volume < 100:
        implementation_cost = 25000
    elif monthly_volume < 500:
        implementation_cost = 50000
    elif monthly_volume < 1000:
        implementation_cost = 75000
    else:
        implementation_cost = 100000
    
    # Calculate ROI
    payback_months = implementation_cost / monthly_cost_savings if monthly_cost_savings > 0 else 999
    roi_percentage = ((annual_savings - implementation_cost) / implementation_cost) * 100
    
    return {
        'monthly_hours_saved': round(monthly_hours_saved, 1),
        'monthly_cost_savings': round(monthly_cost_savings, 2),
        'annual_savings': round(annual_savings, 2),
        'roi_percentage': round(roi_percentage, 1),
        'payback_months': round(payback_months, 1),
        'implementation_estimate': round(implementation_cost, 2)
    }