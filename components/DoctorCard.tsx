import { Card } from "@/components/ui/card"
import Link from "next/link"
import { UserCircle } from "lucide-react" // Add this import

interface DoctorCardProps {
  doctor: {
    id: number
    username: string
    name: string
    email: string
    role: string
    number: string
    expertise: string
    degree: string
    image: string
    schedule: string
    credential: string
    deskid: string
    verified: boolean
  }
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Link href={`/patient/doctor/${doctor.id}`}>
      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="relative flex flex-col items-center">
          {doctor.verified && (
            <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full" />
          )}
          <div className="w-24 h-24 mb-4 text-gray-400">
            <UserCircle size={96} />
          </div>
          <h3 className="font-bold text-lg text-center">Dr. {doctor.name}</h3>
          <p className="text-gray-600 text-sm text-center">{doctor.expertise}</p>
          <p className="text-gray-500 text-xs text-center mt-1">{doctor.degree}</p>
          <p className="text-gray-500 text-xs text-center mt-1">Schedule: {doctor.schedule}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
              {doctor.credential}
            </span>
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
              {doctor.deskid}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  )
}

