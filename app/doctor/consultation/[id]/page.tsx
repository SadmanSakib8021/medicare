"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, User } from "lucide-react"

// Sample data for next patients
const upcomingPatients = [
  { id: 2, name: "Sarah Johnson", time: "11:30 AM", issue: "Follow-up checkup" },
  { id: 3, name: "Mike Wilson", time: "12:00 PM", issue: "Fever and cold" },
  { id: 4, name: "Emma Davis", time: "12:30 PM", issue: "Regular checkup" },
]

export default function ConsultationPage({ params }: { params: { id: string } }) {
  const [prescription, setPrescription] = useState({
    diagnosis: "",
    symptoms: "",
    medicine: "",
    dosage: "",
    duration: "",
    specialNotes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Prescription submitted:", prescription)
    // Handle prescription submission
  }

  return (
    <div className="flex gap-6">
      {/* Main Consultation Area */}
      <div className="flex-1">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Current Patient</h1>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                  <img
                    src="/placeholder.svg?height=100&width=100"
                    alt="John Doe"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">John Doe</h2>
                  <p className="text-gray-600">Age: 35 | Male</p>
                  <p className="text-gray-600">Patient ID: {params.id}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Prescription</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="diagnosis">Diagnosis</Label>
                  <Input
                    id="diagnosis"
                    value={prescription.diagnosis}
                    onChange={(e) => setPrescription({ ...prescription, diagnosis: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="symptoms">Symptoms</Label>
                  <Input
                    id="symptoms"
                    value={prescription.symptoms}
                    onChange={(e) => setPrescription({ ...prescription, symptoms: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="medicine">Prescribed Medicine</Label>
                <Select
                  value={prescription.medicine}
                  onValueChange={(value) => setPrescription({ ...prescription, medicine: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select medicine" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medicine1">Amoxicillin</SelectItem>
                    <SelectItem value="medicine2">Paracetamol</SelectItem>
                    <SelectItem value="medicine3">Ibuprofen</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dosage">Dosage</Label>
                  <Input
                    id="dosage"
                    value={prescription.dosage}
                    onChange={(e) => setPrescription({ ...prescription, dosage: e.target.value })}
                    placeholder="e.g., 1 tablet twice daily"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={prescription.duration}
                    onChange={(e) => setPrescription({ ...prescription, duration: e.target.value })}
                    placeholder="e.g., 7 days"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialNotes">Special Notes</Label>
                <Textarea
                  id="specialNotes"
                  value={prescription.specialNotes}
                  onChange={(e) => setPrescription({ ...prescription, specialNotes: e.target.value })}
                  placeholder="Any special instructions or notes"
                  rows={4}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline">Save as Draft</Button>
                <Button type="submit">Submit Prescription</Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>

      {/* Upcoming Patients Sidebar */}
      <div className="w-80 shrink-0">
        <Card className="sticky top-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Upcoming Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingPatients.map((patient) => (
                <Card key={patient.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <User className="w-5 h-5 text-gray-500" />
                      <span className="font-medium">{patient.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{patient.time}</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{patient.issue}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

