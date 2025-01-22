import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Heart, Scissors, AlertTriangle, Users, Activity } from "lucide-react"

const medicalHistory = [
  { category: "Chronic Disease", items: ["IHD", "Obesity", "Chronic thyroid disorder"], icon: Heart },
  { category: "Surgery", items: ["Liposuction"], icon: Scissors },
  { category: "Diabetes Emergencies", items: ["Diabetic Ketoacidosis"], icon: AlertTriangle },
  { category: "Family Disease", items: ["Obesity (Father)"], icon: Users },
  {
    category: "Diabetes-related Complications",
    items: ["Nephropathy", "Neuropathy", "Retinopathy", "Diabetic foot", "Sexual dysfunction"],
    icon: Activity,
  },
]

export default function MedicalHistory() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-medium">Medical History</CardTitle>
        <Button variant="ghost" size="sm">
          <Edit className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {medicalHistory.map((category) => (
            <div key={category.category} className="flex items-start space-x-4">
              <category.icon className="h-5 w-5 mt-0.5 text-gray-500" />
              <div>
                <h3 className="font-semibold">{category.category}</h3>
                <p className="text-sm text-gray-600">{category.items.join(", ")}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

