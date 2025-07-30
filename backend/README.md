# Dark Knight Technologies - Backend API

FastAPI backend for the AI/MLOps consultancy website with PostgreSQL database.

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Docker & Docker Compose
- PostgreSQL (if running locally)

### Development Setup

1. **Clone and Navigate**
   ```bash
   cd backend/
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Docker Development (Recommended)**
   ```bash
   docker-compose up -d
   ```

4. **Local Development**
   ```bash
   pip install -r requirements.txt
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

## 🏗️ Architecture

```
backend/
├── app/
│   ├── api/v1/           # API routes
│   ├── core/             # Core configuration
│   ├── models/           # Database models
│   ├── schemas/          # Pydantic schemas
│   ├── utils/            # Utility functions
│   └── main.py           # FastAPI application
├── alembic/              # Database migrations
├── tests/                # Test files
└── docker-compose.yml    # Local development
```

## 📊 Database Models

### Contact Submissions
- Multi-step form handling
- Lead scoring algorithm
- UTM tracking and analytics
- IP and user agent logging

### ROI Calculations
- Industry-specific calculations
- Company size adjustments  
- Process type efficiency factors
- 3-year ROI projections

## 🔌 API Endpoints

### Contact Forms
- `POST /api/v1/contact/submit` - Full contact submission
- `POST /api/v1/contact/step1` - Step 1 (basic info)
- `PUT /api/v1/contact/{id}/step2` - Step 2 (company info)
- `GET /api/v1/contact/` - List submissions (admin)

### ROI Calculator
- `POST /api/v1/roi/calculate` - Full ROI calculation
- `POST /api/v1/roi/quick-calculate` - Quick estimation
- `GET /api/v1/roi/` - List calculations (admin)
- `POST /api/v1/roi/{id}/request-follow-up` - Request consultation

## 🛡️ Security Features

- **Rate Limiting**: SlowAPI with Redis backend
- **CORS Configuration**: Frontend domain whitelist
- **Input Validation**: Pydantic schemas with sanitization
- **SQL Injection Protection**: SQLAlchemy ORM
- **Spam Protection**: Rate limiting + lead scoring

## 📧 Email Integration

- Welcome emails for new contacts
- Internal notifications for qualified leads
- ROI reports with detailed calculations
- SMTP configuration via environment variables

## 🔄 Database Migrations

```bash
# Generate migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback
alembic downgrade -1
```

## 🧪 Testing

```bash
pytest tests/ -v
```

## 📈 Lead Scoring Algorithm

Automatic lead qualification based on:
- Company size (10-30 points)
- Budget range (10-30 points)
- Project timeline (5-20 points)
- Industry type (0-15 points)
- AI experience (0-15 points)
- Job authority level (0-15 points)
- Form completion (10-20 points)

**Qualified Lead Threshold**: 70+ points

## 🎯 ROI Calculation Features

### Industry Multipliers
- Technology: 1.2x
- Finance: 1.3x
- Manufacturing: 1.4x
- Healthcare: 1.1x
- Retail: 1.2x
- Logistics: 1.3x

### Process Efficiency Gains
- Data Processing: 75% time reduction
- Document Analysis: 80% time reduction
- Customer Service: 60% time reduction
- Quality Control: 70% time reduction

## 🌍 Environment Variables

```env
DATABASE_URL=postgresql://user:pass@host:port/db
SECRET_KEY=your-secret-key
CORS_ORIGINS=["http://localhost:3000"]
SMTP_HOST=smtp.gmail.com
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

## 🚢 Deployment

### Docker Production
```bash
docker build -t dark-knight-api .
docker run -p 8000:8000 --env-file .env dark-knight-api
```

### Health Checks
- `GET /health` - Service health status
- `GET /` - API information

## 📝 API Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI JSON**: http://localhost:8000/api/v1/openapi.json

## 🔧 Development Commands

```bash
# Install dependencies
pip install -r requirements.txt

# Format code
black app/
isort app/

# Type checking
mypy app/

# Security scan
bandit -r app/

# Start development server
uvicorn app.main:app --reload
```

## 🐛 Troubleshooting

### Database Connection Issues
1. Verify PostgreSQL is running
2. Check DATABASE_URL format
3. Ensure database exists
4. Run migrations: `alembic upgrade head`

### Email Not Sending
1. Verify SMTP credentials
2. Check firewall/network settings
3. Enable "Less secure apps" (Gmail)
4. Use app-specific passwords

### CORS Errors
1. Add frontend domain to CORS_ORIGINS
2. Check preflight OPTIONS requests
3. Verify protocol (http vs https)

---

**Backend Status**: ✅ Production Ready
**API Version**: v1.0.0
**Database**: PostgreSQL 15
**Python**: 3.11+