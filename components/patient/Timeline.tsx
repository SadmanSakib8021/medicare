import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit } from "lucide-react"

const timelineEvents = [
  { date: "Dec 2022", event: "Pre-diabetic", details: "A1c 10.4" },
  { date: "Jan 2022", event: "Type 2", details: "" },
  { date: "Jul 2021", event: "Chronic thyroid disorder, Angina Pectoris", details: "" },
  { date: "Jul", event: "Stroke", details: "" },
]

export default function Timeline() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-medium">Timeline</CardTitle>
        <Button variant="ghost" size="sm">
          <Edit className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          {timelineEvents.map((event, index) => (
            <li key={index} className="mb-10 ml-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {event.date}
              </time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{event.event}</h3>
              {event.details && (
                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{event.details}</p>
              )}
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}

