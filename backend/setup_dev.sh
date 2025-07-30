#!/bin/bash

echo "🚀 Dark Knight Technologies - Backend Developer Setup"
echo "=================================================="

# Check Python version
python_version=$(python --version 2>&1)
echo "✅ Python version: $python_version"

# Install dependencies
echo "📦 Installing Python dependencies..."
pip install -r requirements.txt

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Dependency installation failed!"
    echo "💡 Trying alternative approach..."
    
    # Install core dependencies individually
    pip install fastapi uvicorn sqlalchemy alembic pydantic[email] pydantic-settings
    pip install python-multipart slowapi aiosqlite email-validator dnspython
    
    if [ $? -eq 0 ]; then
        echo "✅ Core dependencies installed!"
    else
        echo "❌ Installation failed. Please install manually:"
        echo "   pip install pydantic[email]"
        echo "   pip install email-validator"
        exit 1
    fi
fi

# Create database tables
echo "🗄️  Creating database tables..."
python -c "
from app.core.database import engine, Base
from app.models.contact import ContactSubmission, ROICalculation
from app.models.casestudy import CaseStudy, CaseStudyMetric, CaseStudyTimeline, CaseStudyInquiry, IndustryBenchmark
Base.metadata.create_all(bind=engine)
print('✅ Database tables created!')
"

# Test API startup
echo "🧪 Testing API startup..."
timeout 10s python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 &
PID=$!
sleep 5

# Test health endpoint
if curl -s http://localhost:8000/health | grep -q "healthy"; then
    echo "✅ API is healthy and ready!"
    kill $PID 2>/dev/null
else
    echo "❌ API startup failed!"
    kill $PID 2>/dev/null
    exit 1
fi

echo ""
echo "🎉 SETUP COMPLETE!"
echo "==================="
echo "Start the API server:"
echo "  python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"
echo ""
echo "API Documentation: http://localhost:8000/docs"
echo "Health Check: http://localhost:8000/health"
echo ""
echo "🔗 Key Endpoints for Frontend:"
echo "  POST /api/v1/contact/submit"
echo "  POST /api/v1/roi/calculate"
echo "  POST /api/v1/roi/advanced-calculate"
echo "  GET  /api/v1/case-studies/"
echo ""