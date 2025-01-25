"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Card } from "@/components/ui/card"

// Add interface at top
interface Schedule {
  id: number;
  doctorId: number;
  tue: string;
  fri: string;
  mon: string;
  sun: string;
  wed: string;
  thu: string;
  sat: string;
}

export default function UpdateProfile() {
  const [user, setUser] = useState(null);
  const [schedule, setSchedule] = useState<Schedule | null>(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {

        console.log("fetching schedule");
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');

        const response = await fetch(
          `http://localhost:9090/api/doctor/schedule/{id}?id=${user.id}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch schedule');
        }

        const data = await response.json();
        setSchedule(data);

        console.log(data);

        // Update form data with fetched schedule
        setFormData(prev => ({
          ...prev,
          schedule: {
            sun: data.sun || '',
            mon: data.mon || '',
            tue: data.tue || '',
            wed: data.wed || '',
            thu: data.thu || '',
            fri: data.fri || '',
            sat: data.sat || ''
          }
        }));

      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };

    fetchSchedule();
    
  }, []);

  const [formData, setFormData] = useState({
    doctor: {
      description: "",
      fees: 0
    },
    schedule: {
      sun: "",
      mon: "",
      tue: "",
      wed: "",
      thu: "",
      fri: "",
      sat: ""
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      console.log(user)

      const response = await fetch(`http://localhost:9090/api/doctor/booking_doctor/{doctorId}?doctorId=${user["id"]}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      console.log(response)

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      alert('Profile updated successfully')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile')
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Update Profile</h1>
        <p className="text-gray-500">Manage your schedule and availability</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Doctor Information Card */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Doctor Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Input 
                  placeholder="Enter your specialization"
                  className="w-full"
                  value={formData.doctor.description}
                  onChange={(e) => setFormData({
                    ...formData,
                    doctor: { ...formData.doctor, description: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Fees</label>
                <Input 
                  type="number"
                  placeholder="Enter consultation fees"
                  className="w-full"
                  value={formData.doctor.fees}
                  onChange={(e) => setFormData({
                    ...formData,
                    doctor: { ...formData.doctor, fees: parseFloat(e.target.value) }
                  })}
                />
              </div>
            </div>
          </Card>

          {/* Schedule Card */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Weekly Schedule</h2>
            <div className="space-y-4">
              {Object.keys(formData.schedule).map((day) => (
                <div key={day}>
                  <label className="block text-sm font-medium mb-1 capitalize">
                    {day}
                  </label>
                  <Input 
                    placeholder="e.g. 9:00 AM - 5:00 PM"
                    className="w-full"
                    value={formData.schedule[day as keyof typeof formData.schedule]}
                    onChange={(e) => setFormData({
                      ...formData,
                      schedule: {
                        ...formData.schedule,
                        [day]: e.target.value
                      }
                    })}
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="mt-6">
          <Button 
            type="submit"
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}