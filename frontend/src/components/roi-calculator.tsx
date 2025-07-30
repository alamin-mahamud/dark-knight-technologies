"use client"

import { useState } from "react"
import { Calculator, TrendingUp, DollarSign, Clock, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useROICalculation, type ROICalculationData } from "@/lib/api"

const companySizeOptions = [
  { value: "startup", label: "Startup (1-50 employees)" },
  { value: "small", label: "Small Business (51-200 employees)" },
  { value: "medium", label: "Medium Business (201-1000 employees)" },
  { value: "large", label: "Large Enterprise (1000+ employees)" }
]

const industryOptions = [
  { value: "fintech", label: "FinTech" },
  { value: "healthcare", label: "Healthcare" },
  { value: "retail", label: "Retail & E-commerce" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "logistics", label: "Logistics & Supply Chain" },
  { value: "energy", label: "Energy & Utilities" },
  { value: "other", label: "Other" }
]

const processOptions = [
  { value: "customer_service", label: "Customer Service" },
  { value: "data_analysis", label: "Data Analysis" },
  { value: "inventory_management", label: "Inventory Management" },
  { value: "fraud_detection", label: "Fraud Detection" },
  { value: "quality_control", label: "Quality Control" },
  { value: "demand_forecasting", label: "Demand Forecasting" },
  { value: "document_processing", label: "Document Processing" },
  { value: "risk_assessment", label: "Risk Assessment" }
]

const painPointOptions = [
  { value: "manual_tasks", label: "Too many manual tasks" },
  { value: "slow_decisions", label: "Slow decision making" },
  { value: "data_silos", label: "Data silos and inconsistency" },
  { value: "high_errors", label: "High error rates" },
  { value: "scalability", label: "Scalability challenges" },
  { value: "compliance", label: "Compliance and reporting" },
  { value: "customer_satisfaction", label: "Customer satisfaction issues" }
]

const budgetOptions = [
  { value: "under_50k", label: "Under $50K" },
  { value: "50k_100k", label: "$50K - $100K" },
  { value: "100k_250k", label: "$100K - $250K" },
  { value: "250k_500k", label: "$250K - $500K" },
  { value: "500k_plus", label: "$500K+" }
]

const timelineOptions = [
  { value: "immediate", label: "Immediate (< 30 days)" },
  { value: "short_term", label: "Short term (1-3 months)" },
  { value: "medium_term", label: "Medium term (3-6 months)" },
  { value: "long_term", label: "Long term (6+ months)" }
]

interface ROIResult {
  estimated_savings: string
  roi_percentage: string
  payback_period: string
  efficiency_gain: string
}

export function ROICalculator() {
  const [step, setStep] = useState(1)
  const [isCalculating, setIsCalculating] = useState(false)
  const [results, setResults] = useState<ROIResult | null>(null)
  const [formData, setFormData] = useState<ROICalculationData>({
    company_size: "",
    industry: "",
    current_processes: [],
    pain_points: [],
    budget_range: "",
    timeline: ""
  })
  
  const { calculateROI } = useROICalculation()

  const handleInputChange = (field: keyof ROICalculationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleArrayChange = (field: 'current_processes' | 'pain_points', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const handleCalculate = async () => {
    setIsCalculating(true)
    
    try {
      const result = await calculateROI(formData)
      
      if (result.success && result.data) {
        setResults(result.data as ROIResult)
        setStep(4)
      } else {
        alert(result.error || "Failed to calculate ROI. Please try again.")
      }
    } catch {
      alert("Failed to calculate ROI. Please try again.")
    } finally {
      setIsCalculating(false)
    }
  }

  const resetCalculator = () => {
    setStep(1)
    setResults(null)
    setFormData({
      company_size: "",
      industry: "",
      current_processes: [],
      pain_points: [],
      budget_range: "",
      timeline: ""
    })
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
            <Calculator className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl">AI ROI Calculator</CardTitle>
        <CardDescription>
          Discover your potential savings and ROI with our 30-day AI implementation
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step <= 3 && (
          <div className="mb-6">
            <div className="flex justify-between items-center">
              {[1, 2, 3].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`flex items-center ${
                    stepNumber < 3 ? "flex-1" : ""
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                      step >= stepNumber
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div
                      className={`flex-1 h-0.5 mx-4 ${
                        step > stepNumber ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold">Company Information</h3>
            
            <div>
              <Label htmlFor="company_size">Company Size *</Label>
              <select
                id="company_size"
                value={formData.company_size}
                onChange={(e) => handleInputChange("company_size", e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background mt-1"
                required
              >
                <option value="">Select company size</option>
                {companySizeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="industry">Industry *</Label>
              <select
                id="industry"
                value={formData.industry}
                onChange={(e) => handleInputChange("industry", e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background mt-1"
                required
              >
                <option value="">Select industry</option>
                {industryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={() => setStep(2)}
                disabled={!formData.company_size || !formData.industry}
              >
                Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold">Current Processes & Challenges</h3>
            
            <div>
              <Label>Which processes would you like to optimize with AI? *</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {processOptions.map((option) => (
                  <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.current_processes.includes(option.value)}
                      onChange={() => handleArrayChange("current_processes", option.value)}
                      className="rounded border-input"
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label>What are your main pain points? *</Label>
              <div className="grid grid-cols-1 gap-3 mt-2">
                {painPointOptions.map((option) => (
                  <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.pain_points.includes(option.value)}
                      onChange={() => handleArrayChange("pain_points", option.value)}
                      className="rounded border-input"
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Previous
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={formData.current_processes.length === 0 || formData.pain_points.length === 0}
              >
                Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold">Budget & Timeline</h3>
            
            <div>
              <Label htmlFor="budget_range">Budget Range *</Label>
              <select
                id="budget_range"
                value={formData.budget_range}
                onChange={(e) => handleInputChange("budget_range", e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background mt-1"
                required
              >
                <option value="">Select budget range</option>
                {budgetOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="timeline">Implementation Timeline *</Label>
              <select
                id="timeline"
                value={formData.timeline}
                onChange={(e) => handleInputChange("timeline", e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background mt-1"
                required
              >
                <option value="">Select timeline</option>
                {timelineOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                Previous
              </Button>
              <Button
                onClick={handleCalculate}
                disabled={isCalculating || !formData.budget_range || !formData.timeline}
              >
                {isCalculating ? "Calculating..." : "Calculate ROI"}
                <Calculator className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 4 && results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Your AI ROI Projection</h3>
              <p className="text-muted-foreground">
                Based on your company profile and industry benchmarks
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {results.estimated_savings}
                  </div>
                  <div className="text-sm text-muted-foreground">Estimated Annual Savings</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {results.roi_percentage}
                  </div>
                  <div className="text-sm text-muted-foreground">Return on Investment</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {results.payback_period}
                  </div>
                  <div className="text-sm text-muted-foreground">Payback Period</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <ArrowRight className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {results.efficiency_gain}
                  </div>
                  <div className="text-sm text-muted-foreground">Efficiency Improvement</div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-muted/50 p-6 rounded-lg">
              <h4 className="font-semibold mb-3">Ready to make this a reality?</h4>
              <p className="text-sm text-muted-foreground mb-4">
                These projections are based on industry benchmarks and similar implementations. 
                Schedule a consultation to get a detailed implementation plan.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild>
                  <a href="/contact">Schedule Consultation</a>
                </Button>
                <Button variant="outline" onClick={resetCalculator}>
                  Calculate Again
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}