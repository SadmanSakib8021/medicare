"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DoctorCard from "@/components/DoctorCard"

const specialties = [
  "Accident and emergency medicine",
  "Addiction Medicine",
  "Aerospace medicine",
  "Anesthesiology",
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Gastroenterology",
  "Neurology",
  "Oncology",
  "Pediatrics",
  "Psychiatry",
  "Radiology",
  "Surgery",
  "Urology",
]

export default function BookConsultation() {
  const [doctors, setDoctors] = useState<{ id: string; [key: string]: any }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()
  const [achoda, setAchoda] = useState("Myself")

  const [aluDoctor, setAluDoctor] = useState([])



  function filterDoctors(ex: string) {
    const doctorska = aluDoctor.filter((doctor: { expertise: string }) => {
      return doctor.expertise === ex
    })
    //setAluDoctors(doctors)
    setAluDoctor(doctorska)
  }

  function filterDoctorsByName(substring: string) {
    if (substring.trim() === "") {
      setAluDoctor(doctors)
      return
    }
    const doctorska = aluDoctor.filter((doctor: { name: string }) => {
      return doctor.name.toLowerCase().includes(substring.toLowerCase())
    })
    setAluDoctor(doctorska)
  }

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem('token')
        console.log(token)
        if (!token) {
          router.push('/login')
          return
        }

        const response = await fetch('http://localhost:9090/api/doctor/alldoctor', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        

        console.log(response.status)

        if (!response.ok) {
          if (response.status === 401) {
            //router.push('/login')
            //return
          }
          throw new Error('Failed to fetch doctors')
        }

        const data = await response.json()
        setDoctors(data)
        setAluDoctor(data)
        console.log(data)
      } catch (err) {
        console.error(err)
        setError('Failed to load doctors')
      } finally {
        setLoading(false)
      }
    }

    fetchDoctors()
  }, [router])

  if (loading) return <div>Loading doctors...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Search Doctor, Make an Appointment</h1>
        <p className="text-gray-600">Discover the best doctors, clinic & hospital the city nearest to you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="mb-6">
            {achoda === "someone" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input placeholder="Patient name" />
                <Input placeholder="Phone or Email" />
              </div>
            ) : null}
            <RadioGroup defaultValue="myself" className="flex space-x-4 mb-4" onValueChange={(value) => {
              setAchoda(value);
              console.log(value);
            }}>
              <div className="flex items-center space-x-2">
              <RadioGroupItem value="myself" id="myself" />
              <Label htmlFor="myself">Myself</Label>
              </div>
              <div className="flex items-center space-x-2">
              <RadioGroupItem value="someone" id="someone" />
              <Label htmlFor="someone">Someone</Label>
              </div>
            </RadioGroup>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold">Submit</Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {aluDoctor.map((doctor) => (
              <DoctorCard  doctor={doctor} />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-6">
            <Input placeholder="Search doctors or clinics" className="mb-4" onChange={(e) => filterDoctorsByName(e.target.value)}/>
            {/* <Select defaultValue="bangladesh">
              <SelectTrigger>
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bangladesh">Bangladesh</SelectItem>
                <SelectItem value="india">India</SelectItem>
                <SelectItem value="pakistan">Pakistan</SelectItem>
              </SelectContent>
            </Select> */}
            {/* <Select>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select a State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dhaka">Dhaka</SelectItem>
                <SelectItem value="chittagong">Chittagong</SelectItem>
                <SelectItem value="rajshahi">Rajshahi</SelectItem>
              </SelectContent>
            </Select> */}
          </div>

            <div className="mb-6">
            <h3 className="font-bold mb-2">Speciality</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {specialties.map((specialty) => (
                <div key={specialty} className="flex items-center">
                <Checkbox 
                  id={specialty} 
                  onCheckedChange={(checked) => {
                  if (checked) {
                    filterDoctors(specialty)
                  } else {
                    setAluDoctor(doctors)
                  }
                  }} 
                />
                <label htmlFor={specialty} className="ml-2 text-sm">
                  {specialty}
                </label>
                </div>
              ))}
            </div>
            </div>

            <div>
            <h3 className="font-bold mb-2">Qualification</h3>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select qualification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mbbs">MBBS</SelectItem>
                <SelectItem value="md">MD</SelectItem>
                <SelectItem value="phd">PhD</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}

