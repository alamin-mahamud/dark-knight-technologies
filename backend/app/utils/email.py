import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any
from app.core.config import settings

async def send_notification_email(contact_submission, is_qualified: bool):
    if not settings.SMTP_USERNAME or not settings.SMTP_PASSWORD:
        print("Email settings not configured, skipping email notification")
        return
    
    try:
        # Create message
        msg = MIMEMultipart()
        msg['From'] = settings.FROM_EMAIL
        msg['To'] = "sales@darkknight.tech"  # Internal notification
        msg['Subject'] = f"New {'Qualified' if is_qualified else 'Unqualified'} Lead: {contact_submission.first_name} {contact_submission.last_name}"
        
        # Email body
        body = f"""
        New contact form submission received:
        
        Name: {contact_submission.first_name} {contact_submission.last_name}
        Email: {contact_submission.email}
        Company: {contact_submission.company or 'Not provided'}
        Job Title: {contact_submission.job_title or 'Not provided'}
        Phone: {contact_submission.phone or 'Not provided'}
        
        Company Details:
        - Size: {contact_submission.company_size or 'Not provided'}
        - Industry: {contact_submission.industry or 'Not provided'}
        - Budget: {contact_submission.budget_range or 'Not provided'}
        - Timeline: {contact_submission.project_timeline or 'Not provided'}
        
        Project Information:
        - Description: {contact_submission.project_description or 'Not provided'}
        - AI Experience: {contact_submission.ai_experience or 'Not provided'}
        - Challenges: {contact_submission.specific_challenges or 'Not provided'}
        
        Lead Scoring:
        - Score: {contact_submission.lead_score}/100
        - Qualified: {'Yes' if is_qualified else 'No'}
        - Form Step: {contact_submission.form_step}/5
        
        Submission ID: {contact_submission.id}
        Created: {contact_submission.created_at}
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Send email
        server = smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT)
        server.starttls()
        server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
        text = msg.as_string()
        server.sendmail(settings.FROM_EMAIL, "sales@darkknight.tech", text)
        server.quit()
        
        print(f"Notification email sent for submission {contact_submission.id}")
        
    except Exception as e:
        print(f"Failed to send notification email: {e}")

async def send_roi_report_email(email: str, calculation_results: Dict[str, Any]):
    if not settings.SMTP_USERNAME or not settings.SMTP_PASSWORD:
        print("Email settings not configured, skipping ROI report email")
        return
    
    try:
        # Create message
        msg = MIMEMultipart()
        msg['From'] = settings.FROM_EMAIL
        msg['To'] = email
        msg['Subject'] = "Your AI Implementation ROI Analysis - Dark Knight Technologies"
        
        # Email body
        body = f"""
        Thank you for using our ROI Calculator!
        
        Here's a summary of your AI implementation analysis:
        
        🎯 KEY METRICS:
        • Annual Potential Savings: ${calculation_results['potential_savings']:,.2f}
        • Efficiency Gain: {calculation_results['efficiency_gain']}%
        • Payback Period: {calculation_results['payback_period']} months
        • 3-Year ROI: {calculation_results['three_year_roi']}%
        • Implementation Cost: ${calculation_results['implementation_cost']:,.2f}
        
        📊 DETAILED BREAKDOWN:
        • Time Savings: {calculation_results['time_savings']} hours annually
        • Direct Cost Reduction: ${calculation_results['cost_reduction']:,.2f}
        • Error Reduction Savings: ${calculation_results['error_reduction_savings']:,.2f}
        • Productivity Increase: {calculation_results['productivity_increase']}%
        • Monthly Savings: ${calculation_results['monthly_savings']:,.2f}
        
        Ready to take the next step? Our AI implementation experts are standing by to:
        ✓ Provide a detailed technical assessment
        ✓ Create a custom implementation roadmap
        ✓ Discuss your specific use case in detail
        
        Schedule a free consultation: https://darkknight.tech/contact
        
        Best regards,
        The Dark Knight Technologies Team
        
        P.S. This analysis is based on industry averages and your inputs. Actual results may vary based on your specific implementation and requirements.
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Send email
        server = smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT)
        server.starttls()
        server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
        text = msg.as_string()
        server.sendmail(settings.FROM_EMAIL, email, text)
        server.quit()
        
        print(f"ROI report email sent to {email}")
        
    except Exception as e:
        print(f"Failed to send ROI report email: {e}")

async def send_welcome_email(email: str, first_name: str):
    if not settings.SMTP_USERNAME or not settings.SMTP_PASSWORD:
        return
    
    try:
        msg = MIMEMultipart()
        msg['From'] = settings.FROM_EMAIL
        msg['To'] = email
        msg['Subject'] = "Welcome to Dark Knight Technologies - Your AI Transformation Starts Here"
        
        body = f"""
        Hi {first_name},
        
        Thank you for your interest in Dark Knight Technologies!
        
        We've received your information and our AI implementation specialists will review your requirements. Here's what happens next:
        
        1. ⚡ Initial Review (24 hours)
           Our team will assess your project requirements and timeline
        
        2. 🎯 Strategy Call (2-3 business days)
           A 30-minute consultation to discuss your specific needs
        
        3. 📋 Custom Proposal (1 week)
           Detailed implementation plan with timeline and investment
        
        4. 🚀 30-Day Implementation
           Rapid deployment of your AI solution
        
        While you wait, feel free to:
        • Check out our case studies: https://darkknight.tech/case-studies
        • Use our ROI Calculator: https://darkknight.tech/roi-calculator
        • Read our AI implementation guide: https://darkknight.tech/resources
        
        Questions? Simply reply to this email or call us at +1 (555) 123-4567
        
        Looking forward to transforming your business with AI!
        
        Best regards,
        The Dark Knight Technologies Team
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        server = smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT)
        server.starttls()
        server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
        text = msg.as_string()
        server.sendmail(settings.FROM_EMAIL, email, text)
        server.quit()
        
        print(f"Welcome email sent to {email}")
        
    except Exception as e:
        print(f"Failed to send welcome email: {e}")