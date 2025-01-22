import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PatientCard({ patient }) {
  const statusColors = {
    completed: "bg-green-100 text-green-800",
    upcoming: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4 flex items-start space-x-4">
        <img
          src={patient.profilePicture || "/placeholder.svg"}
          alt={patient.name}
          className="w-16 h-16 rounded-full border-2 border-gray-200"
        />
        <div>
          <h3 className="font-bold text-lg">{patient.name}</h3>
          <p className="text-sm text-gray-500">{patient.dateTime}</p>
          <p className="text-sm italic text-gray-600">{patient.counselingType}</p>
          <Badge className={`mt-2 ${statusColors[patient.status]}`}>
            {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

