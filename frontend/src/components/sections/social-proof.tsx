"use client"

import Link from "next/link"
import { Star, TrendingUp, Users, Clock, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    label: "Projects Delivered",
    value: "150+",
    icon: TrendingUp,
  },
  {
    label: "Happy Clients",
    value: "89",
    icon: Users,
  },
  {
    label: "Average Implementation Time",
    value: "28 Days",
    icon: Clock,
  },
  {
    label: "Client Satisfaction",
    value: "98%",
    icon: Star,
  },
]

const testimonials = [
  {
    content: "Dark Knight Technologies transformed our data strategy in just 30 days. The ROI was immediate and substantial.",
    author: "Sarah Chen",
    role: "CTO",
    company: "TechCorp Solutions",
  },
  {
    content: "Their MLOps implementation reduced our model deployment time from weeks to hours. Incredible expertise.",
    author: "Michael Rodriguez",
    role: "Head of Data Science",
    company: "DataDriven Inc",
  },
  {
    content: "The team training program was exceptional. Our developers are now confident in implementing AI solutions independently.",
    author: "Emily Johnson",
    role: "VP Engineering",
    company: "InnovateLabs",
  },
]

const clientLogos = [
  { name: "TechCorp", logo: "TC" },
  { name: "DataDriven", logo: "DD" },
  { name: "InnovateLabs", logo: "IL" },
  { name: "FutureAI", logo: "FA" },
  { name: "CloudScale", logo: "CS" },
  { name: "SmartSys", logo: "SS" },
]

export function SocialProofSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl mb-4"
          >
            Trusted by Industry Leaders
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground"
          >
            Join the companies that have transformed their business with our AI solutions
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center mb-16 opacity-60"
        >
          {clientLogos.map((client) => (
            <div key={client.name} className="flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-background">
                <span className="text-sm font-bold text-muted-foreground">
                  {client.logo}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-current text-yellow-400"
                      />
                    ))}
                  </div>
                  <blockquote className="text-sm text-muted-foreground mb-4">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.author}</div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button asChild size="lg">
            <Link href="/case-studies">
              View Detailed Case Studies
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}