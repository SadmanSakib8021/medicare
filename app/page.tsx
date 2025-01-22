import Header from "@/components/Header"
import Hero from "@/components/Hero"
import ServiceFeatures from "@/components/ServiceFeatures"
import Testimonials from "@/components/Testimonials"
import AdditionalFeatures from "@/components/AdditionalFeatures"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero>
          {/* ... existing content ... */}
          <div className="space-x-4">
            <Link
              href="/"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Get Started
            </Link>
            <Link href="/patient/book-consultation">
              <Button variant="outline">Book Consultation</Button>
            </Link>
          </div>
        </Hero>
        <ServiceFeatures />
        <Testimonials />
        <AdditionalFeatures />
        <Footer />
      </main>
    </>
  )
}

