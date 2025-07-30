"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle, Clock, Users, Zap } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const services = [
  {
    id: "ai-implementation",
    title: "AI Implementation",
    description: "End-to-end AI solution development from strategy to deployment",
    icon: Zap,
    timeline: "30 days",
    price: "Starting at $50K",
    features: [
      "Custom AI model development",
      "Data pipeline integration",
      "Performance optimization",
      "Production deployment",
      "Team training included"
    ]
  },
  {
    id: "mlops",
    title: "MLOps Setup",
    description: "Complete MLOps infrastructure for scalable machine learning operations",
    icon: Clock,
    timeline: "21 days",
    price: "Starting at $40K",
    features: [
      "CI/CD pipeline setup",
      "Model monitoring dashboard",
      "Automated testing framework",
      "Version control system",
      "Deployment automation"
    ]
  },
  {
    id: "data-strategy",
    title: "Data Strategy",
    description: "Strategic data architecture and governance for AI readiness",
    icon: Users,
    timeline: "14 days",
    price: "Starting at $25K",
    features: [
      "Data architecture design",
      "Quality frameworks",
      "Privacy compliance setup",
      "Governance policies",
      "Migration planning"
    ]
  },
  {
    id: "training",
    title: "Team Training",
    description: "Comprehensive training programs to empower your internal teams",
    icon: CheckCircle,
    timeline: "7 days",
    price: "Starting at $15K",
    features: [
      "Hands-on workshops",
      "Best practices guide",
      "Ongoing support",
      "Certification program",
      "Custom curriculum"
    ]
  }
]

const processSteps = [
  {
    step: 1,
    title: "Discovery & Strategy",
    description: "Deep dive into your business needs and technical requirements",
    duration: "Days 1-5"
  },
  {
    step: 2,
    title: "Architecture & Design",
    description: "Design scalable solutions tailored to your infrastructure",
    duration: "Days 6-10"
  },
  {
    step: 3,
    title: "Development & Integration",
    description: "Build and integrate AI solutions with your existing systems",
    duration: "Days 11-25"
  },
  {
    step: 4,
    title: "Testing & Deployment",
    description: "Rigorous testing and smooth production deployment",
    duration: "Days 26-30"
  }
]

const faqs = [
  {
    question: "How do you guarantee 30-day delivery?",
    answer: "Our team uses proven frameworks and pre-built components to accelerate development. We've refined our process over 150+ projects to ensure consistent delivery timelines."
  },
  {
    question: "What if my project needs changes during development?",
    answer: "We include 2 scope adjustment cycles in our 30-day process. Major changes may extend the timeline, but we'll discuss this upfront with transparent pricing."
  },
  {
    question: "Do you provide ongoing support after deployment?",
    answer: "Yes! All implementations include 90 days of free support, plus optional maintenance packages for long-term partnership."
  },
  {
    question: "Can you work with our existing tech stack?",
    answer: "Absolutely. We specialize in integrating with existing systems including AWS, Azure, GCP, and on-premise infrastructure."
  }
]

export default function ServicesPage() {
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
                Our <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">AI Services</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mx-auto max-w-2xl text-xl text-muted-foreground mb-10"
              >
                Comprehensive AI solutions designed to transform your business in 30 days or less
              </motion.p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 bg-muted/50">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">{service.timeline}</div>
                            <div className="font-semibold">{service.price}</div>
                          </div>
                        </div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 mb-6">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-center text-sm">
                              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <Button asChild className="w-full">
                          <Link href={`/services/${service.id}`}>
                            Learn More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* 30-Day Process */}
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
                Our 30-Day Implementation Process
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-muted-foreground"
              >
                A proven methodology that delivers results 90% faster than traditional approaches
              </motion.p>
            </div>

            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-border"></div>
              <div className="space-y-12">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative flex items-start"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                      {step.step}
                    </div>
                    <div className="ml-8">
                      <div className="text-sm text-muted-foreground mb-1">{step.duration}</div>
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-muted/50">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl font-bold tracking-tight sm:text-4xl mb-4"
              >
                Frequently Asked Questions
              </motion.h2>
            </div>

            <div className="mx-auto max-w-3xl">
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl font-bold tracking-tight sm:text-4xl mb-4"
              >
                Ready to Transform Your Business?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-muted-foreground mb-8"
              >
                Start your 30-day AI implementation today
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
                    Get Started Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/case-studies">View Case Studies</Link>
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