"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { TimePicker } from "@/components/TimePicker"

const specializations = [
  "Medicine",
  "Neurology",
  "Cardiology",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
  "Psychiatry",
  "Ophthalmology",
  "Gynecology",
  "Urology",
]

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function DoctorSignUp() {
  const router = useRouter()
  const [schedules, setSchedules] = useState<Record<string, { start: string; end: string }>>({})
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setSelectedFiles((prev) => [...prev, ...files])
  }

  const handleScheduleChange = (day: string, type: "start" | "end", value: string) => {
    setSchedules((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: value,
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted")
    router.push("/login")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Doctor Registration</CardTitle>
          <CardDescription>Please fill in your professional details to create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Number</Label>
                <Input id="contact" type="tel" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fees">Consultation Fees</Label>
                <Input id="fees" type="number" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    {specializations.map((spec) => (
                      <SelectItem key={spec} value={spec.toLowerCase()}>
                        {spec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" required />
            </div>

            {/* Profile Image */}
            <div className="space-y-2">
              <Label htmlFor="profile">Profile Image</Label>
              <div className="flex items-center gap-4">
                {selectedImage && (
                  <img
                    src={selectedImage || "/placeholder.svg"}
                    alt="Profile preview"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                )}
                <Input id="profile" type="file" accept="image/*" onChange={handleImageChange} required />
              </div>
            </div>

            {/* Credentials Upload */}
            <div className="space-y-2">
              <Label htmlFor="credentials">Degrees and Credentials</Label>
              <Input
                id="credentials"
                type="file"
                accept=".pdf,.doc,.docx"
                multiple
                onChange={handleFileChange}
                required
              />
              {selectedFiles.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium">Selected files:</p>
                  <ul className="text-sm text-gray-500">
                    {selectedFiles.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Schedule */}
            <div className="space-y-4">
              <Label>Schedule</Label>
              {weekDays.map((day) => (
                <div key={day} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <Label>{day}</Label>
                  <TimePicker
                    value={schedules[day]?.start || ""}
                    onChange={(value) => handleScheduleChange(day, "start", value)}
                    placeholder="Start time"
                  />
                  <TimePicker
                    value={schedules[day]?.end || ""}
                    onChange={(value) => handleScheduleChange(day, "end", value)}
                    placeholder="End time"
                  />
                </div>
              ))}
            </div>

            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

