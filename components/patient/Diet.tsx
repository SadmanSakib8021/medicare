import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplet, Utensils, CandyCane, Coffee } from "lucide-react"

const dietItems = [
  { icon: Droplet, label: "Water Intake", items: ["8 Cups - per day", "3 Cups - per day"] },
  { icon: Utensils, label: "Diet Plan", items: ["Intermittent fasting"] },
  { icon: CandyCane, label: "Sugar Intake", items: ["Table sugar", "Daily Avg 3/6"] },
  { icon: Coffee, label: "Additional Items", items: ["Lactose", "Beans"] },
]

export default function Diet() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-medium">Diet</CardTitle>
        <Button variant="ghost" size="sm">
          Notes
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {dietItems.map((item) => (
            <div key={item.label} className="flex items-center space-x-4">
              <item.icon className="h-5 w-5 text-gray-500" />
              <div>
                <h3 className="font-semibold">{item.label}</h3>
                <p className="text-sm text-gray-600">{item.items.join(", ")}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

