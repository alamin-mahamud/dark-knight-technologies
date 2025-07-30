"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const navigation = [
  { name: "Services", href: "/services" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "ROI Calculator", href: "/roi-calculator" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-sm font-bold">DK</span>
            </div>
            <span className="hidden font-bold sm:inline-block">
              Dark Knight Technologies
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors hover:text-foreground/80 ${
                pathname === item.href 
                  ? "text-foreground font-semibold" 
                  : "text-foreground/60"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Button asChild className="hidden md:inline-flex">
            <Link href="/contact">Get Started</Link>
          </Button>
          
          <Button
            variant="ghost"
            className="md:hidden"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t bg-background">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 text-base font-medium transition-colors ${
                  pathname === item.href
                    ? "text-foreground font-semibold"
                    : "text-foreground/60 hover:text-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-3 pt-2">
              <Button asChild className="w-full">
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}