from fastapi import APIRouter

from app.api.v1.endpoints import contact, roi, casestudy

api_router = APIRouter()
api_router.include_router(contact.router, prefix="/contact", tags=["contact"])
api_router.include_router(roi.router, prefix="/roi", tags=["roi"])
api_router.include_router(casestudy.router, prefix="/case-studies", tags=["case-studies"])