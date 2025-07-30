"use client"

import Link from "next/link"
import { ArrowRight, Sparkles, Zap } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium">
              <Sparkles className="mr-2 h-4 w-4" />
              Transform Your Business with AI
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight sm:text-6xl mb-6"
          >
            <span className="text-foreground">30-Day AI Implementation</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              90% Faster Results
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-2xl text-xl text-muted-foreground mb-10"
          >
            Our AI/MLOps Team-as-a-Service delivers enterprise-grade AI implementations 
            in just 30 days. No lengthy consultations, no endless meetings—just results.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/contact">
                Start Your 30-Day Implementation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="text-lg px-8">
              <Link href="/case-studies">View Case Studies</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20 mb-4">
                <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">30-Day Delivery</h3>
              <p className="text-muted-foreground">
                From strategy to deployment in just one month
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/20 mb-4">
                <Sparkles className="h-6 w-6 text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">90% Faster</h3>
              <p className="text-muted-foreground">
                Than traditional AI implementation approaches
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20 mb-4">
                <ArrowRight className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Guaranteed ROI</h3>
              <p className="text-muted-foreground">
                Measurable results or your money back
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20 dark:bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.900),theme(colors.gray.900))] dark:opacity-20" />
    </section>
  )
}