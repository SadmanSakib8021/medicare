import { Calendar, Users, Truck, FlaskRoundIcon as Flask } from "lucide-react"

export default function ServiceFeatures() {
  const services = [
    { icon: Calendar, title: "Online Appointments" },
    { icon: Users, title: "Find the Doctors You Need" },
    { icon: Truck, title: "24/7 Medicine Delivery" },
    { icon: Flask, title: "Lab Tests at Home" },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <service.icon className="mx-auto mb-4 text-blue-500" size={48} />
              <h3 className="text-xl font-semibold">{service.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

