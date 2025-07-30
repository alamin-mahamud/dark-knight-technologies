from typing import Dict, Any, List, Tuple
import math
from datetime import datetime, timedelta

class AdvancedROICalculator:
    """Advanced ROI calculator with industry-specific algorithms and risk analysis"""
    
    def __init__(self):
        self.industry_data = {
            'technology': {
                'base_efficiency': 0.75,
                'adoption_curve': 0.85,
                'risk_factor': 0.15,
                'maintenance_cost': 0.12,
                'scalability': 1.3
            },
            'finance': {
                'base_efficiency': 0.80,
                'adoption_curve': 0.90,
                'risk_factor': 0.10,
                'maintenance_cost': 0.15,
                'scalability': 1.2
            },
            'healthcare': {
                'base_efficiency': 0.70,
                'adoption_curve': 0.75,
                'risk_factor': 0.20,
                'maintenance_cost': 0.18,
                'scalability': 1.1
            },
            'manufacturing': {
                'base_efficiency': 0.85,
                'adoption_curve': 0.95,
                'risk_factor': 0.12,
                'maintenance_cost': 0.10,
                'scalability': 1.4
            },
            'retail': {
                'base_efficiency': 0.72,
                'adoption_curve': 0.88,
                'risk_factor': 0.18,
                'maintenance_cost': 0.14,
                'scalability': 1.25
            },
            'logistics': {
                'base_efficiency': 0.78,
                'adoption_curve': 0.92,
                'risk_factor': 0.15,
                'maintenance_cost': 0.11,
                'scalability': 1.35
            }
        }
        
        self.process_complexity = {
            'data_processing': {'complexity': 0.6, 'ai_impact': 0.85},
            'document_analysis': {'complexity': 0.7, 'ai_impact': 0.90},
            'customer_service': {'complexity': 0.8, 'ai_impact': 0.70},
            'quality_control': {'complexity': 0.75, 'ai_impact': 0.88},
            'inventory_management': {'complexity': 0.65, 'ai_impact': 0.82},
            'financial_analysis': {'complexity': 0.85, 'ai_impact': 0.92},
            'hr_screening': {'complexity': 0.70, 'ai_impact': 0.80},
            'predictive_maintenance': {'complexity': 0.90, 'ai_impact': 0.95}
        }

    def calculate_advanced_roi(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Calculate comprehensive ROI with risk analysis and projections"""
        
        # Extract and validate inputs
        industry = input_data.get('industry', 'technology').lower()
        process_type = input_data.get('process_type', 'data_processing').lower()
        company_size = input_data.get('company_size', 'medium').lower()
        current_revenue = input_data.get('current_revenue', 1000000)
        current_costs = input_data.get('current_costs', 500000)
        volume_per_month = input_data.get('volume_processed', 1000)
        processing_time = input_data.get('current_processing_time', 2.0)
        error_rate = input_data.get('error_rate', 5.0) / 100
        
        # Get industry and process data
        industry_profile = self.industry_data.get(industry, self.industry_data['technology'])
        process_profile = self.process_complexity.get(process_type, self.process_complexity['data_processing'])
        
        # Calculate base metrics
        base_calculations = self._calculate_base_metrics(
            current_revenue, current_costs, volume_per_month, 
            processing_time, error_rate, industry_profile, process_profile
        )
        
        # Add advanced calculations
        risk_analysis = self._calculate_risk_factors(input_data, industry_profile)
        growth_projections = self._calculate_growth_projections(base_calculations, industry_profile)
        competitive_advantage = self._calculate_competitive_advantage(input_data, industry_profile)
        
        # Calculate implementation phases
        implementation_phases = self._calculate_implementation_phases(input_data, process_profile)
        
        # Combine all results
        return {
            **base_calculations,
            **risk_analysis,
            **growth_projections,
            **competitive_advantage,
            'implementation_phases': implementation_phases,
            'confidence_score': self._calculate_confidence_score(input_data, industry_profile),
            'recommendation': self._generate_recommendation(base_calculations, risk_analysis)
        }

    def _calculate_base_metrics(self, revenue: float, costs: float, volume: float, 
                               time: float, error_rate: float, industry: Dict, process: Dict) -> Dict[str, Any]:
        """Calculate foundational ROI metrics"""
        
        annual_volume = volume * 12
        current_annual_hours = annual_volume * time
        
        # Enhanced efficiency calculation
        base_efficiency = industry['base_efficiency']
        process_impact = process['ai_impact']
        combined_efficiency = base_efficiency * process_impact
        
        # Time and cost savings
        time_saved_annually = current_annual_hours * combined_efficiency
        hourly_rate = (costs / 2080) if costs > 0 else 50  # Assume 2080 working hours/year
        direct_savings = time_saved_annually * hourly_rate
        
        # Error reduction benefits
        error_cost_per_incident = costs / annual_volume * 0.15
        current_error_cost = annual_volume * error_rate * error_cost_per_incident
        reduced_error_rate = error_rate * (1 - combined_efficiency * 0.8)
        new_error_cost = annual_volume * reduced_error_rate * error_cost_per_incident
        error_savings = current_error_cost - new_error_cost
        
        # Productivity gains
        productivity_multiplier = industry['scalability']
        productivity_gain = combined_efficiency * productivity_multiplier * 0.3
        productivity_value = revenue * productivity_gain * 0.25
        
        # Total savings
        total_annual_savings = direct_savings + error_savings + productivity_value
        
        # Implementation cost with complexity adjustment
        base_cost = 75000
        complexity_multiplier = 1 + (process['complexity'] - 0.5)
        implementation_cost = base_cost * complexity_multiplier
        
        # Maintenance costs
        annual_maintenance = implementation_cost * industry['maintenance_cost']
        net_annual_savings = total_annual_savings - annual_maintenance
        
        return {
            'potential_savings': round(total_annual_savings, 2),
            'net_savings': round(net_annual_savings, 2),
            'implementation_cost': round(implementation_cost, 2),
            'annual_maintenance': round(annual_maintenance, 2),
            'efficiency_gain': round(combined_efficiency * 100, 1),
            'payback_period': round(implementation_cost / (net_annual_savings / 12), 1) if net_annual_savings > 0 else 999,
            'three_year_roi': round(((net_annual_savings * 3 - implementation_cost) / implementation_cost) * 100, 1),
            'five_year_roi': round(((net_annual_savings * 5 - implementation_cost) / implementation_cost) * 100, 1),
            'time_savings': round(time_saved_annually, 1),
            'error_reduction': round((error_rate - reduced_error_rate) / error_rate * 100, 1),
            'productivity_increase': round(productivity_gain * 100, 1)
        }

    def _calculate_risk_factors(self, input_data: Dict[str, Any], industry: Dict) -> Dict[str, Any]:
        """Calculate implementation and business risks"""
        
        base_risk = industry['risk_factor']
        
        # Company size risk adjustment
        company_size = input_data.get('company_size', 'medium').lower()
        size_risk_multiplier = {
            'startup': 1.4, 'small': 1.2, 'medium': 1.0, 'large': 0.8, 'enterprise': 0.6
        }.get(company_size, 1.0)
        
        # Process complexity risk
        process_type = input_data.get('process_type', 'data_processing').lower()
        process_risk = self.process_complexity.get(process_type, {}).get('complexity', 0.7)
        
        # Data quality risk
        data_quality_score = input_data.get('data_quality', 70) / 100
        data_risk = 1 - data_quality_score
        
        # Combined risk score
        total_risk = (base_risk * size_risk_multiplier + process_risk * 0.3 + data_risk * 0.2) / 2
        risk_percentage = min(total_risk * 100, 50)  # Cap at 50%
        
        # Risk-adjusted savings
        risk_adjustment = 1 - (total_risk * 0.5)  # Reduce savings by up to 25%
        
        return {
            'risk_score': round(risk_percentage, 1),
            'risk_factors': {
                'implementation_complexity': round(process_risk * 100, 1),
                'organizational_readiness': round((1 - base_risk) * 100, 1),
                'data_quality': round(data_quality_score * 100, 1)
            },
            'risk_adjustment_factor': round(risk_adjustment, 2),
            'confidence_interval': {
                'low': round(risk_adjustment * 0.8, 2),
                'high': round(min(risk_adjustment * 1.2, 1.0), 2)
            }
        }

    def _calculate_growth_projections(self, base_calc: Dict, industry: Dict) -> Dict[str, Any]:
        """Calculate multi-year growth projections"""
        
        annual_savings = base_calc['net_savings']
        scalability = industry['scalability']
        
        # Growth factors
        learning_curve_improvement = 0.05  # 5% annual improvement
        technology_advancement = 0.03  # 3% annual tech improvement
        scale_benefits = 0.04  # 4% benefits from scaling
        
        projections = {}
        cumulative_savings = 0
        
        for year in range(1, 6):
            # Apply growth factors
            year_multiplier = 1 + (learning_curve_improvement + technology_advancement + scale_benefits) * (year - 1)
            scale_multiplier = min(scalability ** (year * 0.3), scalability * 1.5)
            
            year_savings = annual_savings * year_multiplier * scale_multiplier
            cumulative_savings += year_savings
            
            projections[f'year_{year}'] = {
                'savings': round(year_savings, 2),
                'cumulative': round(cumulative_savings, 2),
                'roi': round((cumulative_savings - base_calc['implementation_cost']) / base_calc['implementation_cost'] * 100, 1)
            }
        
        return {'growth_projections': projections}

    def _calculate_competitive_advantage(self, input_data: Dict, industry: Dict) -> Dict[str, Any]:
        """Calculate competitive advantage metrics"""
        
        # Market timing advantage
        ai_adoption_rate = input_data.get('market_ai_adoption', 30) / 100
        early_adopter_advantage = max(0, (1 - ai_adoption_rate) * 0.2)  # Up to 20% advantage
        
        # Speed to market improvement
        current_timeline = input_data.get('current_development_time', 180)  # days
        ai_speed_improvement = industry['base_efficiency']
        new_timeline = current_timeline * (1 - ai_speed_improvement * 0.6)
        time_to_market_advantage = (current_timeline - new_timeline) / current_timeline
        
        # Quality improvement impact
        quality_score_improvement = industry['base_efficiency'] * 0.8
        
        return {
            'competitive_advantages': {
                'early_adopter_benefit': round(early_adopter_advantage * 100, 1),
                'time_to_market_improvement': round(time_to_market_advantage * 100, 1),
                'quality_score_increase': round(quality_score_improvement * 100, 1),
                'market_positioning_score': round((early_adopter_advantage + time_to_market_advantage + quality_score_improvement) / 3 * 100, 1)
            }
        }

    def _calculate_implementation_phases(self, input_data: Dict, process: Dict) -> List[Dict]:
        """Break down implementation into phases with timelines and costs"""
        
        total_cost = input_data.get('implementation_cost', 75000)
        complexity = process['complexity']
        
        # Base phase structure
        phases = [
            {'name': 'Discovery & Planning', 'duration_weeks': 2, 'cost_percentage': 0.15},
            {'name': 'Data Preparation', 'duration_weeks': 3, 'cost_percentage': 0.20},
            {'name': 'Model Development', 'duration_weeks': 4, 'cost_percentage': 0.30},
            {'name': 'Integration & Testing', 'duration_weeks': 3, 'cost_percentage': 0.20},
            {'name': 'Deployment & Training', 'duration_weeks': 2, 'cost_percentage': 0.15}
        ]
        
        # Adjust for complexity
        for phase in phases:
            phase['duration_weeks'] = math.ceil(phase['duration_weeks'] * (1 + complexity * 0.5))
            phase['cost'] = round(total_cost * phase['cost_percentage'], 2)
            
        return phases

    def _calculate_confidence_score(self, input_data: Dict, industry: Dict) -> int:
        """Calculate overall confidence in the ROI projection"""
        
        # Factors affecting confidence
        data_completeness = len([v for v in input_data.values() if v is not None]) / len(input_data)
        industry_maturity = 1 - industry['risk_factor']
        process_certainty = self.process_complexity.get(
            input_data.get('process_type', 'data_processing').lower(),
            {'ai_impact': 0.7}
        )['ai_impact']
        
        # Company readiness factors
        company_size = input_data.get('company_size', 'medium').lower()
        size_confidence = {'startup': 0.6, 'small': 0.7, 'medium': 0.8, 'large': 0.9, 'enterprise': 0.95}.get(company_size, 0.8)
        
        # Calculate overall confidence
        confidence = (data_completeness * 0.3 + industry_maturity * 0.25 + process_certainty * 0.25 + size_confidence * 0.2)
        return round(confidence * 100)

    def _generate_recommendation(self, base_calc: Dict, risk_analysis: Dict) -> Dict[str, Any]:
        """Generate strategic recommendation based on analysis"""
        
        roi = base_calc['three_year_roi']
        payback = base_calc['payback_period']
        risk_score = risk_analysis['risk_score']
        
        # Decision matrix
        if roi > 200 and payback < 12 and risk_score < 20:
            recommendation = "HIGHLY RECOMMENDED"
            priority = "immediate"
            reasoning = "Exceptional ROI with low risk and fast payback."
        elif roi > 100 and payback < 18 and risk_score < 30:
            recommendation = "RECOMMENDED"
            priority = "high"
            reasoning = "Strong business case with manageable risk."
        elif roi > 50 and payback < 24 and risk_score < 40:
            recommendation = "CONDITIONALLY RECOMMENDED"
            priority = "medium"
            reasoning = "Positive ROI but requires careful risk management."
        else:
            recommendation = "FURTHER ANALYSIS NEEDED"
            priority = "low"
            reasoning = "ROI projection requires optimization or risk mitigation."
        
        return {
            'recommendation': recommendation,
            'priority': priority,
            'reasoning': reasoning,
            'next_steps': self._get_next_steps(recommendation)
        }

    def _get_next_steps(self, recommendation: str) -> List[str]:
        """Get recommended next steps based on analysis"""
        
        if recommendation == "HIGHLY RECOMMENDED":
            return [
                "Schedule executive presentation",
                "Begin vendor selection process",
                "Allocate budget and resources",
                "Form implementation team"
            ]
        elif recommendation == "RECOMMENDED":
            return [
                "Conduct detailed feasibility study",
                "Identify pilot use case",
                "Assess organizational readiness",
                "Develop implementation roadmap"
            ]
        elif recommendation == "CONDITIONALLY RECOMMENDED":
            return [
                "Address identified risk factors",
                "Improve data quality initiatives",
                "Consider phased implementation",
                "Seek additional stakeholder buy-in"
            ]
        else:
            return [
                "Refine business requirements",
                "Explore alternative approaches",
                "Conduct market research",
                "Consider consulting engagement"
            ]