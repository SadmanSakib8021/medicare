import { Headphones, MessageCircle, Calculator } from "lucide-react"

export default function AdditionalFeatures() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Headphones className="mx-auto mb-4 text-blue-500" size={48} />
            <h3 className="text-xl font-semibold mb-2">Weekly Podcasts</h3>
            <p>Connect to Our Sessions</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <MessageCircle className="mx-auto mb-4 text-blue-500" size={48} />
            <h3 className="text-xl font-semibold mb-2">Say Hi To Medico Chan</h3>
            <p>AI-driven chatbot for quick assistance</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Calculator className="mx-auto mb-4 text-blue-500" size={48} />
            <h3 className="text-xl font-semibold mb-2">Nutrition Calculator</h3>
            <p>Calculate your daily nutritional needs</p>
          </div>
        </div>
      </div>
    </section>
  )
}

