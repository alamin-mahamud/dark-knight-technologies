"use client"

import Link from "next/link"
import { ArrowRight, Award, Globe, Target, Users, Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const teamMembers = [
  {
    name: "Dr. Sarah Chen",
    role: "Chief AI Officer",
    bio: "Former Google AI researcher with 12+ years in machine learning. Led teams that deployed AI at scale for Fortune 500 companies.",
    expertise: ["Deep Learning", "Computer Vision", "NLP"],
    linkedin: "#",
    email: "sarah@darkknighttech.com",
    image: "SC"
  },
  {
    name: "Michael Rodriguez",
    role: "Head of MLOps",
    bio: "Ex-Netflix ML infrastructure engineer. Specializes in building production-ready ML systems that scale to millions of users.",
    expertise: ["MLOps", "Cloud Architecture", "DevOps"],
    linkedin: "#",
    email: "michael@darkknighttech.com",
    image: "MR"
  },
  {
    name: "Dr. Emily Johnson",
    role: "Data Strategy Lead",
    bio: "PhD in Statistics, former McKinsey data consultant. Expert in enterprise data transformation and governance frameworks.",
    expertise: ["Data Strategy", "Analytics", "Governance"],
    linkedin: "#",
    email: "emily@darkknighttech.com",
    image: "EJ"
  },
  {
    name: "Alex Kim",
    role: "Senior AI Engineer",
    bio: "Full-stack AI developer with expertise in LLMs and generative AI. Built production systems serving 10M+ daily users.",
    expertise: ["LLMs", "Generative AI", "Full-Stack"],
    linkedin: "#",
    email: "alex@darkknighttech.com",
    image: "AK"
  },
  {
    name: "Rachel Thompson",
    role: "Implementation Manager",
    bio: "Project management expert specializing in AI deployments. Ensures on-time delivery with 98% client satisfaction rate.",
    expertise: ["Project Management", "Client Success", "Agile"],
    linkedin: "#",
    email: "rachel@darkknighttech.com",
    image: "RT"
  },
  {
    name: "David Park",
    role: "Training Specialist",
    bio: "Adult learning expert and former university professor. Designed training programs for 50+ enterprise AI teams.",
    expertise: ["Training", "Curriculum Design", "Mentoring"],
    linkedin: "#",
    email: "david@darkknighttech.com",
    image: "DP"
  }
]

const values = [
  {
    title: "Speed Without Compromise",
    description: "We deliver 90% faster than traditional approaches while maintaining the highest quality standards.",
    icon: Target
  },
  {
    title: "Transparent Partnership",
    description: "No black boxes, no vendor lock-in. We build solutions you understand and can maintain.",
    icon: Globe
  },
  {
    title: "Proven Expertise",
    description: "Our team combines decades of experience from Google, Netflix, McKinsey, and top research institutions.",
    icon: Award
  },
  {
    title: "Client Success First",
    description: "Your success is our success. We measure our impact by the ROI we deliver to your business.",
    icon: Users
  }
]

const stats = [
  { label: "Years Combined Experience", value: "75+" },
  { label: "Fortune 500 Clients", value: "40+" },
  { label: "AI Projects Delivered", value: "150+" },
  { label: "Client Satisfaction", value: "98%" }
]

export default function AboutPage() {
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
                Meet the Team Behind the{" "}
                <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  30-Day AI Revolution
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mx-auto max-w-2xl text-xl text-muted-foreground mb-10"
              >
                We&apos;re a team of AI experts, engineers, and strategists who believe that 
                AI transformation shouldn&apos;t take months or years—it should take 30 days.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/50">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl font-bold tracking-tight sm:text-4xl mb-8 text-center"
              >
                Our Story
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="prose prose-lg max-w-none text-muted-foreground"
              >
                <p className="text-lg leading-relaxed mb-6">
                  Dark Knight Technologies was founded in 2021 with a simple mission: make AI accessible 
                  to every business, regardless of size or technical expertise. We saw too many companies 
                  struggling with lengthy AI implementations that took 6-18 months and often failed to 
                  deliver promised results.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Our founders, veterans from Google AI, Netflix ML, and McKinsey, knew there had to be 
                  a better way. By combining proven methodologies, pre-built components, and deep industry 
                  expertise, we developed our revolutionary 30-day implementation process.
                </p>
                <p className="text-lg leading-relaxed">
                  Today, we&apos;ve helped over 150 companies transform their operations with AI, achieving 
                  an average ROI of 340% within the first year. Our approach isn&apos;t just faster—it&apos;s 
                  more reliable, more transparent, and more sustainable than traditional consulting models.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
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
                Our Values
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-muted-foreground"
              >
                The principles that guide everything we do
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mr-4">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="text-xl font-semibold">{value.title}</h3>
                        </div>
                        <p className="text-muted-foreground">{value.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
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
                Our Expert Team
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-muted-foreground"
              >
                Meet the AI experts who will transform your business
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mr-4">
                          <span className="text-lg font-bold text-primary">
                            {member.image}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {member.expertise.map((skill) => (
                          <span
                            key={skill}
                            className="inline-block bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          href={member.linkedin}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Linkedin className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`mailto:${member.email}`}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Mail className="h-4 w-4" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
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
                Ready to Work with Our Team?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-muted-foreground mb-8"
              >
                Let&apos;s discuss how we can transform your business with AI in just 30 days
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
                    Schedule a Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/case-studies">View Our Work</Link>
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