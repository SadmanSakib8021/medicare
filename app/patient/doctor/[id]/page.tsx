"use client"

import { ArrowLeft, Settings, Phone, Video, MessageCircle, Users, Award, FileText, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]

export default function DoctorProfile({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-2xl mx-auto pb-8">
      {/* Header */}
      <div className="bg-purple-600 text-white p-4 flex items-center justify-between mb-6">
        <Link href="/patient/book-consultation">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold">Near By Doctors</h1>
        <Settings className="w-6 h-6" />
      </div>

      {/* Doctor Profile */}
      <div className="px-4">
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
            <img
              src="/placeholder.svg?height=200&width=200"
              alt="Doctor profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold mb-2">Dr. Leslie Alexander</h2>
          <p className="text-gray-600 mb-6">MBBS, MD, Pathology Specialist</p>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <Button variant="secondary" className="rounded-full bg-purple-100 hover:bg-purple-200">
              <Phone className="w-5 h-5 text-purple-600" />
            </Button>
            <Button variant="secondary" className="rounded-full bg-purple-100 hover:bg-purple-200">
              <Video className="w-5 h-5 text-purple-600" />
            </Button>
            <Button variant="secondary" className="rounded-full bg-purple-100 hover:bg-purple-200">
              <MessageCircle className="w-5 h-5 text-purple-600" />
            </Button>
          </div>
        </div>

        {/* Availability */}
        <div className="mb-8">
          <div className="flex gap-2 overflow-x-auto mb-4">
            {days.map((day, index) => (
              <Button
                key={day}
                variant={index === 0 ? "default" : "outline"}
                className={index === 0 ? "bg-purple-600 text-white" : ""}
              >
                {day}
              </Button>
            ))}
          </div>
          <p className="text-center text-gray-600">Everyday: 5pm to 9pm</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-purple-100 p-4 rounded-xl">
            <Users className="w-8 h-8 text-purple-600 mb-2" />
            <p className="font-bold">2.2k</p>
            <p className="text-sm text-gray-600">Patients</p>
          </div>
          <div className="bg-pink-100 p-4 rounded-xl">
            <Award className="w-8 h-8 text-pink-600 mb-2" />
            <p className="font-bold">10 Years</p>
            <p className="text-sm text-gray-600">Experience</p>
          </div>
          <div className="bg-green-100 p-4 rounded-xl">
            <FileText className="w-8 h-8 text-green-600 mb-2" />
            <p className="font-bold">2.2k</p>
            <p className="text-sm text-gray-600">Personal Information</p>
          </div>
          <div className="bg-emerald-100 p-4 rounded-xl">
            <MapPin className="w-8 h-8 text-emerald-600 mb-2" />
            <p className="font-bold">2.2k</p>
            <p className="text-sm text-gray-600">Working Address</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button variant="outline" className="w-full border-purple-600 text-purple-600">
            Dr Profile
          </Button>
          <Button className="w-full bg-purple-600 hover:bg-purple-700">Book an Appointment</Button>
        </div>
      </div>
    </div>
  )
}

