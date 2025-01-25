"use client"

import { useEffect, useState } from "react"
import StatisticsDashboard from "@/components/StatisticsDashboard"
import PatientNavBar from "@/components/PatientNavBar"
import PatientCard from "@/components/PatientCard"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { set } from "date-fns"

// Sample patient data


interface Patient {
 
  date: string;
  patientName: string;
  patientId: string;
  status: string;
}



export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [bookings, setBookings] = useState([]);
  const [patients, setPat] = useState<Patient[]>([]);
  const [first, setFirst] = useState(" ");

  const filteredPatients = patients.filter((patient) => {
    if (statusFilter === "all") {
      return patient;
    } else {
      console.log(patient.status);
      console.log(statusFilter);
      return patient.status.toLowerCase() === statusFilter;
    }
  });
  
  const aluMara = (value: string) => {
    setStatusFilter(value)
    console.log(statusFilter);
  }
  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleAddPatient = () => {
    console.log("Add new patient clicked")
    // Implement add patient functionality here
  }

  useEffect(() => {
    setFirst(" ");
  }, []);

  useEffect(() => {
    
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');

        const response = await fetch(
          `http://localhost:9090/api/booking/doctorBookings?doctorId=${user.id}`, 
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          setBookings(data);
          console.log(data);
          data.map((booking: any) => {
              const date= booking.appointmentDate;
              booking.data.map((patient: any) => {
                const obj = {
                  name: patient.patientName,
                  date: date,
                  patientName: patient.patientName,
                  patientId: patient.patientId,
                  status: patient.status
                }
                patients.push(obj);
              })
          })
          console.log("d djansd adnsadan ");
          console.log(patients);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        console.log(bookings);
      }
    };

    fetchBookings();
  }, [first]);
  return (
    <div className="p-6">
      <StatisticsDashboard />
      <PatientNavBar onSearch={handleSearch} onAddPatient={handleAddPatient} />
      <div className="mb-4">
        <Select onValueChange={aluMara}>
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
          <PatientCard  patient={patient} />
        ))}
      </div>
    </div>
  )
}

