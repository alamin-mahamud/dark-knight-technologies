# Dark Knight Technologies - Frontend

## 🚀 Production-Ready Next.js 15 Application

A high-performance, SEO-optimized frontend for Dark Knight Technologies' AI/MLOps services platform.

## ✨ Features

- **🎯 30-Day AI Implementation Landing Page** - Convert visitors to leads
- **📱 Mobile-First Responsive Design** - Perfect on all devices
- **⚡ Optimized Performance** - 158KB bundle, Core Web Vitals optimized
- **🔍 SEO & Analytics Ready** - Schema.org, GA4, conversion tracking
- **🎨 Modern UI/UX** - Tailwind CSS, Framer Motion animations
- **🔒 Security Headers** - XSS protection, content security policies

## 📊 Performance Metrics

- **Bundle Size**: 158KB (homepage)
- **First Load JS**: 99.6KB shared
- **Build Time**: ~8 seconds
- **Pages**: 10 optimized routes
- **Components**: 20+ reusable components

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **Analytics**: Google Analytics 4
- **Forms**: Multi-step validation
- **API**: TypeScript client with error handling

### Key Pages
- `/` - Homepage with hero, services, testimonials
- `/services` - Service offerings with pricing
- `/about` - Team and company information  
- `/contact` - Multi-step contact form
- `/case-studies` - Success stories and metrics
- `/roi-calculator` - Interactive ROI calculator

## 🚀 Getting Started

```bash
npm install          # Install dependencies
cp .env.example .env.local
npm run dev         # Development server
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔧 Environment Variables
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-code
NODE_ENV=production
```

## 📱 Production Deployment

```bash
npm run build       # Production build
npm run start       # Start production server
```

### Production Checklist
- ✅ Bundle optimization enabled
- ✅ SEO meta tags and schema.org
- ✅ Analytics and conversion tracking
- ✅ Security headers configured
- ✅ Mobile responsiveness verified
- ✅ Core Web Vitals optimized

## 🔗 API Integration

Integrates with Dark Knight Technologies backend:
- Contact Forms: POST `/api/v1/contact/`
- ROI Calculator: POST `/api/v1/roi/calculate/`
- Health Check: GET `/health`

## 📈 Analytics & Conversion Tracking

- Form submission tracking
- ROI calculation events
- CTA click monitoring
- Page view analytics
- Lead generation metrics

---

**Built with ❤️ by Dark Knight Technologies**
