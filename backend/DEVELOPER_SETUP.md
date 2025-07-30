# 🚀 Backend Developer Quick Setup Guide

## ⚠️ DEPENDENCY ISSUE RESOLUTION

If you encounter `ImportError: email-validator is not installed`, follow these steps:

### 1. Quick Fix (Use this script)
```bash
chmod +x setup_dev.sh
./setup_dev.sh
```

### 2. Manual Installation
```bash
# Install core dependencies with email validation
pip install pydantic[email]==2.11.7
pip install email-validator==2.2.0
pip install dnspython==2.7.0

# Install remaining dependencies
pip install -r requirements.txt
```

### 3. Verify Installation
```bash
python -c "from pydantic import EmailStr; print('✅ Email validation working!')"
```

## 🔧 Complete Setup Process

### Step 1: Environment Setup
```bash
cd backend/
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### Step 2: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 3: Database Setup
```bash
python -c "
from app.core.database import engine, Base
from app.models.contact import ContactSubmission, ROICalculation
from app.models.casestudy import CaseStudy, CaseStudyMetric, CaseStudyTimeline, CaseStudyInquiry, IndustryBenchmark
Base.metadata.create_all(bind=engine)
print('Database ready!')
"
```

### Step 4: Start Server
```bash
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

## 📋 Verification Checklist

- [ ] Server starts without errors
- [ ] Health check: `curl http://localhost:8000/health`
- [ ] API docs accessible: http://localhost:8000/docs
- [ ] Case studies endpoint: `curl http://localhost:8000/api/v1/case-studies/stats`

## 🔗 API Endpoints for Frontend Integration

### Contact Forms
```
POST /api/v1/contact/submit
POST /api/v1/contact/step1
PUT  /api/v1/contact/{id}/step2
```

### ROI Calculator
```
POST /api/v1/roi/calculate
POST /api/v1/roi/quick-calculate
POST /api/v1/roi/advanced-calculate
```

### Case Studies (Epic 3)
```
GET  /api/v1/case-studies/
GET  /api/v1/case-studies/featured
GET  /api/v1/case-studies/stats
GET  /api/v1/case-studies/{slug}
POST /api/v1/case-studies/{id}/inquire
```

## 🚨 Common Issues & Solutions

### Issue: `ImportError: email-validator is not installed`
**Solution:** Install pydantic with email extras: `pip install pydantic[email]`

### Issue: `Address already in use`
**Solution:** Kill existing processes: `pkill -f uvicorn`

### Issue: Database connection errors
**Solution:** SQLite database is automatically created. Check file permissions.

### Issue: CORS errors from frontend
**Solution:** Frontend domains are whitelisted in `app/core/config.py`

## 📞 Need Help?

1. Check server logs: `tail -f server.log`
2. Test endpoints with curl or Postman
3. Verify all dependencies: `pip list | grep -E "(fastapi|pydantic|email)"

## 🎯 Frontend Integration Ready

✅ **API Base URL:** `http://localhost:8000/api/v1/`  
✅ **CORS:** Configured for frontend domains  
✅ **Rate Limiting:** 10-20 requests/minute per endpoint  
✅ **Validation:** Comprehensive input validation with Pydantic  
✅ **Documentation:** Auto-generated at `/docs`

**Status:** 🟢 **OPERATIONAL AND READY FOR EPIC 3 INTEGRATION**