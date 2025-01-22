import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PatientDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Welcome, Mahib</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You have 2 upcoming appointments</p>
            <Link href="/patient/appointments">
              <Button className="mt-4">View Appointments</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Medical Records</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Access your medical history and test results</p>
            <Link href="/patient/profile">
              <Button className="mt-4">View Records</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Book Consultation</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Schedule a new appointment with a doctor</p>
            <Link href="/patient/book-consultation">
              <Button className="mt-4">Book Now</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

