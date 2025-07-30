"use client"

import Link from "next/link"
import { ArrowRight, TrendingUp, Clock, DollarSign, Users } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const caseStudies = [
  {
    id: "fintech-fraud-detection",
    company: "FinanceFlow",
    industry: "FinTech",
    title: "AI-Powered Fraud Detection System",
    description: "Implemented real-time fraud detection reducing false positives by 85% and saving $2.3M annually",
    challenge: "Legacy rule-based system had 40% false positive rate, causing customer friction and operational costs",
    solution: "Deployed ensemble ML models with real-time scoring and adaptive learning capabilities",
    results: [
      { metric: "False Positives Reduced", value: "85%" },
      { metric: "Detection Speed", value: "<100ms" },
      { metric: "Annual Savings", value: "$2.3M" },
      { metric: "Customer Satisfaction", value: "+32%" }
    ],
    technologies: ["Python", "TensorFlow", "Kafka", "Redis", "PostgreSQL"],
    timeline: "28 days",
    icon: DollarSign
  },
  {
    id: "retail-demand-forecasting",
    company: "MegaRetail Corp",
    industry: "Retail",
    title: "Demand Forecasting & Inventory Optimization",
    description: "Built ML-driven demand forecasting system reducing inventory costs by 30% while improving stock availability",
    challenge: "Manual forecasting led to $5M in overstock and frequent stockouts during peak seasons",
    solution: "Implemented time-series forecasting with external data integration and automated reordering",
    results: [
      { metric: "Inventory Costs Reduced", value: "30%" },
      { metric: "Stockout Reduction", value: "65%" },
      { metric: "Forecast Accuracy", value: "94%" },
      { metric: "ROI", value: "420%" }
    ],
    technologies: ["Python", "Prophet", "Apache Airflow", "Snowflake", "Tableau"],
    timeline: "30 days",
    icon: TrendingUp
  },
  {
    id: "healthcare-patient-triage",
    company: "HealthSystem Plus",
    industry: "Healthcare",
    title: "Intelligent Patient Triage System",
    description: "Developed AI triage system improving emergency room efficiency by 40% and patient outcomes",
    challenge: "ER wait times averaged 4 hours with manual triage causing delayed treatment for critical cases",
    solution: "Built NLP-powered triage system analyzing symptoms, vitals, and medical history for priority scoring",
    results: [
      { metric: "Wait Time Reduction", value: "40%" },
      { metric: "Critical Case Detection", value: "98%" },
      { metric: "Staff Efficiency", value: "+45%" },
      { metric: "Patient Satisfaction", value: "+28%" }
    ],
    technologies: ["Python", "spaCy", "FastAPI", "MongoDB", "React"],
    timeline: "25 days",
    icon: Users
  }
]

const industries = [
  { name: "FinTech", count: 25, growth: "+40%" },
  { name: "Healthcare", count: 18, growth: "+60%" },
  { name: "Retail", count: 22, growth: "+35%" },
  { name: "Manufacturing", count: 15, growth: "+50%" },
  { name: "Logistics", count: 12, growth: "+45%" },
  { name: "Energy", count: 8, growth: "+30%" }
]

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background py-24 sm:py-32">
          <div className="container">
            <div className="mx-auto max-w-4xl text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold tracking-tight sm:text-6xl mb-6"
              >
                Real Results from{" "}
                <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  Real Companies
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mx-auto max-w-2xl text-xl text-muted-foreground mb-10"
              >
                See how we&apos;ve helped 150+ companies transform their operations with AI in just 30 days
              </motion.p>
            </div>
          </div>
        </section>

        {/* Industries Overview */}
        <section className="py-16 bg-muted/50">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-2xl font-bold tracking-tight mb-4"
              >
                Industries We&apos;ve Transformed
              </motion.h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {industries.map((industry, index) => (
                <motion.div
                  key={industry.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold mb-1">{industry.count}</div>
                  <div className="text-sm text-muted-foreground mb-1">{industry.name}</div>
                  <div className="text-xs text-green-600 font-medium">{industry.growth}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Case Studies */}
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
                Featured Success Stories
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-muted-foreground"
              >
                Deep dive into how we delivered measurable results in 30 days
              </motion.p>
            </div>

            <div className="space-y-16">
              {caseStudies.map((study, index) => {
                const Icon = study.icon
                return (
                  <motion.div
                    key={study.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="overflow-hidden">
                      <CardHeader className="bg-muted/50">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                              <Icon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-sm font-medium text-muted-foreground">
                                  {study.company}
                                </span>
                                <span className="text-sm text-muted-foreground">•</span>
                                <span className="text-sm text-muted-foreground">
                                  {study.industry}
                                </span>
                              </div>
                              <CardTitle className="text-xl">{study.title}</CardTitle>
                              <CardDescription className="mt-1">
                                {study.description}
                              </CardDescription>
                            </div>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 mr-1" />
                            {study.timeline}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                          {/* Challenge & Solution */}
                          <div className="lg:col-span-2 space-y-6">
                            <div>
                              <h4 className="font-semibold mb-2">Challenge</h4>
                              <p className="text-sm text-muted-foreground">{study.challenge}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Solution</h4>
                              <p className="text-sm text-muted-foreground">{study.solution}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Technologies Used</h4>
                              <div className="flex flex-wrap gap-2">
                                {study.technologies.map((tech) => (
                                  <span
                                    key={tech}
                                    className="inline-block bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Results */}
                          <div>
                            <h4 className="font-semibold mb-4">Key Results</h4>
                            <div className="space-y-4">
                              {study.results.map((result) => (
                                <div key={result.metric} className="text-center p-3 bg-muted/50 rounded-lg">
                                  <div className="text-2xl font-bold text-green-600 mb-1">
                                    {result.value}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {result.metric}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-muted/50">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl font-bold tracking-tight sm:text-4xl mb-4"
              >
                Ready to Become Our Next Success Story?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-muted-foreground mb-8"
              >
                Join 150+ companies that have transformed their business with our 30-day AI implementation
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button asChild size="lg">
                  <Link href="/contact">
                    Start Your 30-Day Transformation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/services">View Our Services</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}