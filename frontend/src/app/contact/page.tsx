"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useContactForm, type ContactFormData } from "@/lib/api"
import { trackContactFormSubmission } from "@/lib/analytics"

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    details: "hello@darkknighttech.com",
    description: "Send us an email anytime"
  },
  {
    icon: Phone,
    title: "Phone",
    details: "+1 (555) 123-4567",
    description: "Mon-Fri from 8am to 6pm EST"
  },
  {
    icon: MapPin,
    title: "Office",
    details: "Remote-First Team",
    description: "Serving clients globally"
  },
  {
    icon: Clock,
    title: "Response Time",
    details: "< 24 Hours",
    description: "We respond to all inquiries quickly"
  }
]

const formSteps = [
  {
    step: 1,
    title: "Tell us about your project",
    description: "Basic information about your needs"
  },
  {
    step: 2,
    title: "Project details",
    description: "Timeline, budget, and requirements"
  },
  {
    step: 3,
    title: "Schedule consultation",
    description: "Pick a time that works for you"
  }
]

export default function ContactPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<ContactFormData>({
    // Step 1
    name: "",
    email: "",
    company: "",
    role: "",
    
    // Step 2
    projectType: "",
    timeline: "",
    budget: "",
    description: "",
    
    // Step 3
    preferredTime: "",
    urgency: ""
  })
  const { submitForm } = useContactForm()

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await submitForm(formData)
      
      if (result.success) {
        // Track successful form submission
        trackContactFormSubmission(formData)
        
        alert(result.message || "Thank you! We'll be in touch within 24 hours.")
        // Reset form on success
        setFormData({
          name: "",
          email: "",
          company: "",
          role: "",
          projectType: "",
          timeline: "",
          budget: "",
          description: "",
          preferredTime: "",
          urgency: ""
        })
        setCurrentStep(1)
      } else {
        alert(result.error || "Something went wrong. Please try again.")
      }
    } catch {
      alert("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

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
                Start Your{" "}
                <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  30-Day AI Transformation
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mx-auto max-w-2xl text-xl text-muted-foreground mb-10"
              >
                Ready to transform your business with AI? Let&apos;s discuss your project and 
                see how we can deliver results in just 30 days.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 bg-muted/50">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                    <p className="font-medium mb-1">{info.details}</p>
                    <p className="text-sm text-muted-foreground">{info.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-24">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Form Steps */}
                <div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold tracking-tight mb-8"
                  >
                    Get Started in 3 Simple Steps
                  </motion.h2>
                  
                  <div className="space-y-6">
                    {formSteps.map((step, index) => (
                      <motion.div
                        key={step.step}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className={`flex items-start p-4 rounded-lg border ${
                          currentStep === step.step 
                            ? "border-primary bg-primary/5" 
                            : "border-border"
                        }`}
                      >
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-sm mr-4 ${
                          currentStep === step.step
                            ? "bg-primary text-primary-foreground"
                            : currentStep > step.step
                            ? "bg-green-600 text-white"
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {currentStep > step.step ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            step.step
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{step.title}</h3>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Contact Form */}
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Step {currentStep} of 3</CardTitle>
                        <CardDescription>
                          {formSteps[currentStep - 1].description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                          {currentStep === 1 && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="name">Full Name *</Label>
                                  <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                    placeholder="John Smith"
                                    required
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="email">Email *</Label>
                                  <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    placeholder="john@company.com"
                                    required
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="company">Company *</Label>
                                  <Input
                                    id="company"
                                    value={formData.company}
                                    onChange={(e) => handleInputChange("company", e.target.value)}
                                    placeholder="Acme Corp"
                                    required
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="role">Your Role</Label>
                                  <Input
                                    id="role"
                                    value={formData.role}
                                    onChange={(e) => handleInputChange("role", e.target.value)}
                                    placeholder="CTO, CEO, etc."
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {currentStep === 2 && (
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="projectType">Project Type *</Label>
                                <select
                                  id="projectType"
                                  value={formData.projectType}
                                  onChange={(e) => handleInputChange("projectType", e.target.value)}
                                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                  required
                                >
                                  <option value="">Select a service</option>
                                  <option value="ai-implementation">AI Implementation</option>
                                  <option value="mlops">MLOps Setup</option>
                                  <option value="data-strategy">Data Strategy</option>
                                  <option value="training">Team Training</option>
                                  <option value="consultation">General Consultation</option>
                                </select>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="timeline">Timeline</Label>
                                  <select
                                    id="timeline"
                                    value={formData.timeline}
                                    onChange={(e) => handleInputChange("timeline", e.target.value)}
                                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                  >
                                    <option value="">Select timeline</option>
                                    <option value="urgent">ASAP (&lt; 30 days)</option>
                                    <option value="soon">1-3 months</option>
                                    <option value="planning">3-6 months</option>
                                    <option value="future">6+ months</option>
                                  </select>
                                </div>
                                <div>
                                  <Label htmlFor="budget">Budget Range</Label>
                                  <select
                                    id="budget"
                                    value={formData.budget}
                                    onChange={(e) => handleInputChange("budget", e.target.value)}
                                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                  >
                                    <option value="">Select budget</option>
                                    <option value="under-25k">Under $25K</option>
                                    <option value="25k-50k">$25K - $50K</option>
                                    <option value="50k-100k">$50K - $100K</option>
                                    <option value="100k-plus">$100K+</option>
                                  </select>
                                </div>
                              </div>
                              <div>
                                <Label htmlFor="description">Project Description</Label>
                                <textarea
                                  id="description"
                                  value={formData.description}
                                  onChange={(e) => handleInputChange("description", e.target.value)}
                                  placeholder="Tell us about your AI goals and challenges..."
                                  rows={4}
                                  className="w-full px-3 py-2 border border-input rounded-md bg-background resize-none"
                                />
                              </div>
                            </div>
                          )}

                          {currentStep === 3 && (
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="preferredTime">Preferred Meeting Time</Label>
                                <select
                                  id="preferredTime"
                                  value={formData.preferredTime}
                                  onChange={(e) => handleInputChange("preferredTime", e.target.value)}
                                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                >
                                  <option value="">Select time preference</option>
                                  <option value="morning">Morning (9AM - 12PM EST)</option>
                                  <option value="afternoon">Afternoon (12PM - 5PM EST)</option>
                                  <option value="evening">Evening (5PM - 8PM EST)</option>
                                  <option value="flexible">I&apos;m flexible</option>
                                </select>
                              </div>
                              <div>
                                <Label htmlFor="urgency">How urgent is this project?</Label>
                                <select
                                  id="urgency"
                                  value={formData.urgency}
                                  onChange={(e) => handleInputChange("urgency", e.target.value)}
                                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                >
                                  <option value="">Select urgency</option>
                                  <option value="high">High - Need to start immediately</option>
                                  <option value="medium">Medium - Within next month</option>
                                  <option value="low">Low - Just exploring options</option>
                                </select>
                              </div>
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <h4 className="font-semibold mb-2">What happens next?</h4>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                  <li>• We&apos;ll review your information within 24 hours</li>
                                  <li>• Schedule a 30-minute discovery call</li>
                                  <li>• Provide a custom 30-day implementation plan</li>
                                  <li>• Start transforming your business with AI</li>
                                </ul>
                              </div>
                            </div>
                          )}

                          <div className="flex justify-between pt-6">
                            {currentStep > 1 && (
                              <Button type="button" variant="outline" onClick={handlePrevStep}>
                                Previous
                              </Button>
                            )}
                            {currentStep < 3 ? (
                              <Button 
                                type="button" 
                                onClick={handleNextStep}
                                className="ml-auto"
                                disabled={
                                  (currentStep === 1 && (!formData.name || !formData.email || !formData.company)) ||
                                  (currentStep === 2 && !formData.projectType)
                                }
                              >
                                Next Step
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            ) : (
                              <Button type="submit" className="ml-auto" disabled={isSubmitting}>
                                {isSubmitting ? "Sending..." : "Send Message"}
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}