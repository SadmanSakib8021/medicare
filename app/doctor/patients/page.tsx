"use client"

import { useState } from "react"
import StatisticsDashboard from "@/components/StatisticsDashboard"
import PatientNavBar from "@/components/PatientNavBar"
import PatientCard from "@/components/PatientCard"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample patient data
const patients = [
  {
    id: 1,
    name: "Robert Fox",
    dateTime: "05 Feb, 11:00 am - 11:45 am",
    counselingType: "Individual Counseling",
    status: "completed",
    profilePicture: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Jane Cooper",
    dateTime: "06 Feb, 2:00 pm - 2:45 pm",
    counselingType: "Couple Therapy",
    status: "upcoming",
    profilePicture: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Esther Howard",
    dateTime: "07 Feb, 10:00 am - 10:45 am",
    counselingType: "Family Counseling",
    status: "cancelled",
    profilePicture: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Jenny Wilson",
    dateTime: "08 Feb, 3:00 pm - 3:45 pm",
    counselingType: "Group Therapy",
    status: "upcoming",
    profilePicture: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Guy Hawkins",
    dateTime: "09 Feb, 1:00 pm - 1:45 pm",
    counselingType: "Individual Counseling",
    status: "completed",
    profilePicture: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Wade Warren",
    dateTime: "10 Feb, 11:30 am - 12:15 pm",
    counselingType: "Couple Therapy",
    status: "upcoming",
    profilePicture: "/placeholder.svg?height=200&width=200",
  },
]

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "all" || patient.status === statusFilter),
  )

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleAddPatient = () => {
    console.log("Add new patient clicked")
    // Implement add patient functionality here
  }

  return (
    <div className="p-6">
      <StatisticsDashboard />
      <PatientNavBar onSearch={handleSearch} onAddPatient={handleAddPatient} />
      <div className="mb-4">
        <Select onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredPatients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </div>
    </div>
  )
}

