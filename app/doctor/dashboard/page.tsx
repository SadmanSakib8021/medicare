'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Import Shadcn UI components
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// Adjust the import based on your project structure
import { Badge } from '@/components/ui/badge';

// Import Recharts components
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  ResponsiveContainer,
} from 'recharts';
import { da } from 'date-fns/locale';
import { set } from 'date-fns';

// Interfaces for TypeScript (optional)
interface DoctorProfile {
  name: string;
  expertise: string;
  totalPatients: number;
  newPatients: number;
  upcomingAppointments: number;
  appointments: any[];
}

interface DailyPatientData {
  date: string;
  patientCount: number;
}

export default function DoctorDashboard() {
  const router = useRouter();

  // Static data for the doctor's profile
  const [profile, setProfile] = useState<DoctorProfile>({
    name: 'John Doe',
    expertise: 'Cardiology',
    totalPatients: 150,
    newPatients: 10,
    upcomingAppointments: 5,
    appointments: [
      // Example appointments
      { patientName: 'Alice Smith', date: '2023-10-01', time: '10:00 AM' },
      { patientName: 'Bob Johnson', date: '2023-10-02', time: '11:00 AM' },
    ],
  });

  // Static data for daily patient counts
  const [dailyPatientData, setDailyPatientData] = useState<DailyPatientData[]>([
    
  ]);

  const [bookings, setBookings] = useState([]);

  const [first, setFirst] = useState(" ");

  const [total, setTotal] = useState(0);
  const [name, setName] = useState('');
  const [upcoming, setUpcoming] = useState(0);
  useEffect(() => {
    
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        let puki=0;

        const today = new Date().toISOString().split('T')[0];

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
            const num = booking.data.length;
            puki=puki+num
            if(date===today){
              setUpcoming(num);
            }
            const obj = {
              date: date,
              patientCount: num
            }
            setDailyPatientData((prevData) => [...prevData, obj]);
          })
          
          
          setTotal(puki);
          setName(user.name);

          
         
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
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      

      {/* Main content with left margin to prevent sidebar overlap */}
      <main className="flex-1 ml-64 p-8"> {/* Adjust ml-64 based on your sidebar width */}
        <div className="space-y-6">
          {/* Welcome Message */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Welcome Dr. {name}</h1>
            <Button variant="secondary">Settings</Button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent>
                <h3 className="text-gray-500 text-sm">Total Patients</h3>
                <p className="text-2xl font-bold">{total}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h3 className="text-gray-500 text-sm">New Patients</h3>
                <p className="text-2xl font-bold">{profile.newPatients}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h3 className="text-gray-500 text-sm">Upcoming Appointments</h3>
                <p className="text-2xl font-bold">{upcoming}</p>
              </CardContent>
            </Card>
          </div>

          {/* Daily Patient Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Patient Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyPatientData.slice(0,dailyPatientData.length/2)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <RechartsTooltip />
                    <RechartsLegend />
                    <Line type="monotone" dataKey="patientCount" stroke="#3B82F6" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Appointments */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              {profile.appointments && profile.appointments.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {profile.appointments.map((apt, index) => (
                    <li key={index} className="py-3 flex justify-between">
                      <div>
                        <p className="text-lg font-semibold">{apt.patientName}</p>
                        <p className="text-sm text-gray-500">
                          {apt.date} at {apt.time}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No recent appointments</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}