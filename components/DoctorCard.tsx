import { Card } from "@/components/ui/card"
import Link from "next/link"

interface DoctorCardProps {
  doctor: {
    id: number
    name: string
    designation: string
    imageUrl: string
    isAvailable?: boolean
  }
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Link href={`/patient/doctor/${doctor.id}`}>
      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="relative flex flex-col items-center">
          {doctor.isAvailable && <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full" />}
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
            <img src={doctor.imageUrl || "/placeholder.svg"} alt={doctor.name} className="w-full h-full object-cover" />
          </div>
          <h3 className="font-bold text-lg text-center">{doctor.name}</h3>
          <p className="text-gray-600 text-sm text-center">{doctor.designation}</p>
        </div>
      </Card>
    </Link>
  )
}

