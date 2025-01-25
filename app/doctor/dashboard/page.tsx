"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'

interface DoctorProfile {
  name: string
  expertise: string
  appointments?: any[]
  totalPatients?: number
  newPatients?: number
  upcomingAppointments?: number
}

export default function DoctorDashboard() {
  const router = useRouter()
  const [profile, setProfile] = useState<DoctorProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          router.push('/login')
          return
        }

        const response = await fetch('http://localhost:9090/api/user/myprofile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch profile')
        }

        const data = await response.json()
        setProfile(data)
      } catch (err) {
        setError('Failed to load dashboard data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDoctorProfile()
  }, [router])

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      {/* Main content with left margin to prevent sidebar overlap */}
      <main className="flex-1 ml-64 p-8"> {/* ml-64 matches sidebar width */}
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : profile ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Welcome Dr. {profile.name}</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm">Total Patients</h3>
                <p className="text-2xl font-bold">{profile.totalPatients || 0}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm">New Patients</h3>
                <p className="text-2xl font-bold">{profile.newPatients || 0}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm">Upcoming Appointments</h3>
                <p className="text-2xl font-bold">{profile.upcomingAppointments || 0}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Recent Appointments</h2>
              {profile.appointments && profile.appointments.length > 0 ? (
                <ul className="divide-y">
                  {profile.appointments.map((apt, index) => (
                    <li key={index} className="py-3">
                      {/* Appointment details */}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No recent appointments</p>
              )}
            </div>
          </div>
        ) : null}
      </main>
    </div>
  )
}

