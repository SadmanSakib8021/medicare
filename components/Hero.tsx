import { Heart, Clock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="bg-blue-50 py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-6xl font-bold mb-6">Healthcare</h1>
        <div className="flex justify-center space-x-8 mb-8">
          <div className="flex items-center">
            <Heart className="text-red-500 mr-2" />
            <h2 className="text-xl font-semibold">Reduce Health Risks</h2>
          </div>
          <div className="flex items-center">
            <Clock className="text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold">No More Delays</h2>
          </div>
        </div>
        <div className="space-x-4">
          <Link href="/patient/book-consultation">
            <Button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300">
              Book Consultation
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

