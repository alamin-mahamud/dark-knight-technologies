"use client"

import Link from "next/link"
import { Brain, Database, Cog, GraduationCap, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    title: "AI Implementation",
    description: "End-to-end AI solution development from strategy to deployment",
    icon: Brain,
    features: ["Custom AI Models", "Integration Support", "Performance Optimization"],
    href: "/services/ai-implementation",
  },
  {
    title: "MLOps Setup",
    description: "Complete MLOps infrastructure for scalable machine learning operations",
    icon: Cog,
    features: ["CI/CD Pipelines", "Model Monitoring", "Automated Testing"],
    href: "/services/mlops",
  },
  {
    title: "Data Strategy",
    description: "Strategic data architecture and governance for AI readiness",
    icon: Database,
    features: ["Data Architecture", "Quality Frameworks", "Privacy Compliance"],
    href: "/services/data-strategy",
  },
  {
    title: "Team Training",
    description: "Comprehensive training programs to empower your internal teams",
    icon: GraduationCap,
    features: ["Hands-on Workshops", "Best Practices", "Ongoing Support"],
    href: "/services/training",
  },
]

export function ServicesSection() {
  return (
    <section className="py-24 sm:py-32 bg-muted/50">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl mb-4"
          >
            Our Service Offerings
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground"
          >
            Comprehensive AI solutions designed to transform your business in 30 days
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {service.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm text-muted-foreground">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button asChild variant="outline" className="w-full mt-6">
                      <Link href={service.href}>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button asChild size="lg">
            <Link href="/services">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}