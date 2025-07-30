"use client"

import Link from "next/link"
import { ArrowRight, TrendingUp, Clock, DollarSign } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const featuredCaseStudies = [
  {
    id: "fintech-fraud-detection",
    company: "FinanceFlow",
    industry: "FinTech",
    title: "AI-Powered Fraud Detection",
    description: "Reduced false positives by 85% and saved $2.3M annually with real-time ML scoring",
    image: "FF",
    timeline: "28 days",
    keyMetric: "85%",
    metricLabel: "False Positive Reduction",
    icon: DollarSign,
    tags: ["Machine Learning", "Real-time Processing", "Financial Services"]
  },
  {
    id: "retail-demand-forecasting",
    company: "MegaRetail Corp",
    industry: "Retail",
    title: "Demand Forecasting System",
    description: "30% inventory cost reduction with ML-driven demand prediction and automated reordering",
    image: "MR",
    timeline: "30 days",
    keyMetric: "30%",
    metricLabel: "Cost Reduction",
    icon: TrendingUp,
    tags: ["Time Series", "Inventory Optimization", "E-commerce"]
  },
  {
    id: "healthcare-patient-triage",
    company: "HealthSystem Plus",
    industry: "Healthcare",
    title: "Intelligent Patient Triage",
    description: "40% reduction in ER wait times with NLP-powered symptom analysis and priority scoring",
    image: "HP",
    timeline: "25 days",
    keyMetric: "40%",
    metricLabel: "Wait Time Reduction",
    icon: Clock,
    tags: ["Natural Language Processing", "Healthcare", "Emergency Systems"]
  }
]

export function CaseStudyPreviewSection() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl mb-4"
          >
            Success Stories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground"
          >
            See how we&apos;ve helped companies achieve measurable results in 30 days
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredCaseStudies.map((study, index) => {
            const Icon = study.icon
            return (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <span className="text-sm font-bold text-primary">
                          {study.image}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {study.timeline}
                        </div>
                        <div className="text-xs text-muted-foreground">{study.industry}</div>
                      </div>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {study.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {study.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <Icon className="h-5 w-5 text-green-600 mr-2" />
                        <span className="text-2xl font-bold text-green-600">{study.keyMetric}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{study.metricLabel}</div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {study.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Link href={`/case-studies#${study.id}`}>
                        Read Full Case Study
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button asChild size="lg">
            <Link href="/case-studies">
              View All Case Studies
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export function CaseStudyCard({ study }: { study: typeof featuredCaseStudies[0] }) {
  const Icon = study.icon
  
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <span className="text-sm font-bold text-primary">
              {study.image}
            </span>
          </div>
          <div className="text-right">
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {study.timeline}
            </div>
            <div className="text-xs text-muted-foreground">{study.industry}</div>
          </div>
        </div>
        <CardTitle className="text-lg">{study.title}</CardTitle>
        <CardDescription>{study.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <Icon className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-2xl font-bold text-green-600">{study.keyMetric}</span>
          </div>
          <div className="text-sm text-muted-foreground">{study.metricLabel}</div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        <Button asChild variant="outline" className="w-full">
          <Link href={`/case-studies#${study.id}`}>
            Read Full Case Study
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}