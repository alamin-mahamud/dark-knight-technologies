"use client"

import { Star, Quote } from "lucide-react"
import { motion } from "framer-motion"

import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "CTO",
    company: "FinanceFlow",
    image: "SM",
    rating: 5,
    quote: "Dark Knight Technologies delivered exactly what they promised - a 30-day AI implementation that reduced our fraud detection false positives by 85%. The ROI was immediate and substantial.",
    results: "85% reduction in false positives"
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "VP Operations",
    company: "MegaRetail Corp",
    image: "MC",
    rating: 5,
    quote: "We were skeptical about the 30-day promise, but they delivered ahead of schedule. Our inventory costs dropped by 30% in the first quarter after implementation.",
    results: "30% inventory cost reduction"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    role: "Chief Medical Officer",
    company: "HealthSystem Plus",
    image: "ER",
    rating: 5,
    quote: "The AI triage system has transformed our emergency department. Patient wait times are down 40% and our staff can focus on providing better care instead of administrative tasks.",
    results: "40% reduction in wait times"
  },
  {
    id: 4,
    name: "James Thompson",
    role: "CEO",
    company: "LogiCorp Solutions",
    image: "JT",
    rating: 5,
    quote: "The transparency and expertise of the Dark Knight team is unmatched. They didn't just build our AI system - they trained our team to maintain and improve it.",
    results: "98% client satisfaction score"
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "Data Director",
    company: "EnergyTech Industries",
    image: "LW",
    rating: 5,
    quote: "From strategy to deployment, the process was seamless. Our predictive maintenance system now prevents equipment failures before they happen, saving us millions.",
    results: "$3.2M in prevented downtime"
  },
  {
    id: 6,
    name: "Robert Kumar",
    role: "Head of Innovation",
    company: "ManufacturingPlus",
    image: "RK",
    rating: 5,
    quote: "The quality control AI system has been a game-changer. We've reduced defects by 70% and our production efficiency has never been higher.",
    results: "70% reduction in defects"
  }
]

export function TestimonialsSection() {
  return (
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
            What Our Clients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground"
          >
            Real feedback from companies we&apos;ve transformed with AI
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full relative">
                <CardContent className="p-6">
                  <div className="absolute top-4 right-4">
                    <Quote className="h-6 w-6 text-muted-foreground/30" />
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mr-4">
                      <span className="text-sm font-bold text-primary">
                        {testimonial.image}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <blockquote className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  <div className="mt-auto pt-4 border-t">
                    <div className="text-xs font-medium text-green-600">
                      Key Result: {testimonial.results}
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
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">4.9/5 average rating</span>
            <span>•</span>
            <span>150+ successful implementations</span>
            <span>•</span>
            <span>98% client satisfaction</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mr-4">
            <span className="text-sm font-bold text-primary">
              {testimonial.image}
            </span>
          </div>
          <div>
            <h4 className="font-semibold">{testimonial.name}</h4>
            <p className="text-sm text-muted-foreground">
              {testimonial.role} at {testimonial.company}
            </p>
          </div>
        </div>

        <div className="flex mb-3">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        <blockquote className="text-sm text-muted-foreground mb-4">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        <div className="text-xs font-medium text-green-600">
          Key Result: {testimonial.results}
        </div>
      </CardContent>
    </Card>
  )
}