"use client";

import {
  ArrowLeft,
  Settings,
  Phone,
  Video,
  MessageCircle,
  Users,
  Award,
  FileText,
  MapPin,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useState, useEffect } from "react";


// Generate time slots with 15-minute intervals
const generateTimeSlots = () => {
  const slots = [];
  const startTime = new Date();
  startTime.setHours(2, 0, 0); // Start at 9 AM
  const endTime = new Date();
  endTime.setHours(12, 0, 0); // End at 5 PM

  while (startTime < endTime) {
    slots.push(startTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    }));
    startTime.setMinutes(startTime.getMinutes() + 15);
  }
  return slots;
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const timeSlots = generateTimeSlots();

interface DoctorCardProps {
  doctor: {
    id: number;
    username: string;
    name: string;
    email: string;
    role: string;
    number: string;
    expertise: string;
    degree: string;
    image: string;
    schedule: string;
    credential: string;
    deskid: string;
    verified: boolean;
  };
}

interface Schedule {
  id: number;
  doctorId: number;
  tue: string;
  wed: string;
  sun: string;
  mon: string;
  fri: string;
  thu: string;
  sat: string;
}

export default function DoctorProfile({ params }: { params: { id: string } }) {
  const [set, setSet] = useState(0);
  const [set2, setSet2] = useState(0);
  const [doc, setDoc] = useState<DoctorCardProps["doctor"] | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [loading, setLoading] = useState(true);
  const [aluDate, setAluDate] = useState("");

  useEffect(() => {
    console.log("useEffect triggered");
    const doctor = localStorage.getItem("doctor");

    const currentDate = new Date();
    console.log(currentDate.getDay());
    setSet(currentDate.getDay()-1);
    setSet2(currentDate.getDay()-1);
    setAluDate(currentDate.toISOString().split("T")[0]);

    const newDate = new Date();

    newDate.setDate(currentDate.getDate() + 1);

    console.log(newDate.getDate().toString());



    if (doctor) {
      console.log("Doctor found in localStorage");
      setDoc(JSON.parse(doctor));
      console.log(params.id);
    }
  }, []);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const str = String(params.id);
        const token = localStorage.getItem('token');
        console.log(token);
        const response = await fetch(
          `http://localhost:9090/api/doctor/schedule/{id}?id=${params.id}`, 
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch schedule');
        }
        
        const data = await response.json();
        setSchedule(data);
      } catch (error) {
        console.error('Failed to fetch schedule:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [params.id]);

  if (loading) {
    return <div>Loading schedule...</div>;
  }

  if (!doc) {
    return (
      <div className="max-w-2xl mx-auto pb-8 pt-8 text-center">
        <p>Loading doctor information...</p>
      </div>
    );
  }

  const getDate = (day: number) => {
    console.log(" pututut ");
    let alu = day;

    let day11=0;
    if(alu<set2){
      day11=6-set2+alu+1;
    }
    else{
      day11=alu-set2;
    }
    console.log(day11);
    const date = new Date();
    date.setDate(date.getDate() + day11);
    setAluDate(date.toISOString().split("T")[0]);
    console.log(date.toISOString().split("T")[0]);
    
    if(date.getDay()===0){
      setSet(6);
      return;
    }
    setSet(date.getDay()-1);
  };

  const handleBooking = async () => {
    console.log("handleBooking called");
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      
      console.log(user);
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow" as RequestRedirect
      };

      console.log(`http://localhost:9090/api/booking/bookDoctor?doctorId=${params.id}&patientId=${user.id}&patientName=${user.name}&appointmentDate=${aluDate}&status=Upcoming`);
  
      const response = await fetch(
        `http://localhost:9090/api/booking/bookDoctor?doctorId=${params.id}&patientId=${user.id}&patientName=${user.name}&appointmentDate=${aluDate}&status=Upcoming`, 
        requestOptions
      );

      console.log(response);
  
      if (!response.ok) {
        throw new Error('Booking failed');
      }
  
      const result = await response.text();
      console.log(result);
      alert('Booking successful!');
  
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto pb-8 pt-8 ">
      {/* Doctor Profile */}
      <div className="px-4">
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
            <img
              src={doc.image || "/placeholder.svg?height=200&width=200"}
              alt="Doctor profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold mb-2">Dr. {doc.name}</h2>
          <p className="text-gray-600 mb-6">{doc.degree}, {doc.expertise}</p>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <Button
              variant="secondary"
              className="rounded-full bg-purple-100 hover:bg-purple-200"
            >
              <Phone className="w-5 h-5 text-purple-600" />
            </Button>
            <Button
              variant="secondary"
              className="rounded-full bg-purple-100 hover:bg-purple-200"
            >
              <Video className="w-5 h-5 text-purple-600" />
            </Button>
            <Button
              variant="secondary"
              className="rounded-full bg-purple-100 hover:bg-purple-200"
            >
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
                variant={index === set ? "default" : "outline"}
                onClick={() => getDate(index)}
              >
                {day}
              </Button>
            ))}
          </div>
          <p className="text-center text-gray-600">{doc.schedule}</p>
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
            <p className="font-bold">{doc.credential}</p>
            <p className="text-sm text-gray-600">Credential</p>
          </div>
          <div className="bg-emerald-100 p-4 rounded-xl">
            <MapPin className="w-8 h-8 text-emerald-600 mb-2" />
            <p className="font-bold">{doc.deskid}</p>
            <p className="text-sm text-gray-600">Desk ID</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full border-purple-600 text-purple-600"
          >
            Dr Profile
          </Button>
          <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleBooking}>
            Book an Appointment
          </Button>
        </div>
      </div>

      {/* Booking Section */}
      <Card className="p-6 mt-8">
        <h2 className="text-2xl font-bold mb-6">Book Appointment</h2>
        
        {/* Days Selection */}
        <div className="grid grid-cols-7 gap-4 mb-6">
          {days.map((day, index) => (
            <Button
              key={day}
              variant={selectedDay === day ? "default" : "outline"}
              className={`w-full ${
                selectedDay === day 
                  ? "bg-blue-600 text-white" 
                  : "hover:bg-blue-50"
              }`}
              onClick={() => getDate(index)}
            >
              {day}
            </Button>
          ))}
        </div>

        {/* Time Slots */}
        {selectedDay && (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Available Slots for {selectedDay}
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((slot) => (
                <Button
                  key={slot}
                  variant={selectedSlot === slot ? "default" : "outline"}
                  className={`w-full ${
                    selectedSlot === slot 
                      ? "bg-blue-600 text-white" 
                      : "hover:bg-blue-50"
                  }`}
                  onClick={() => setSelectedSlot(slot)}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  {slot}
                </Button>
              ))}
            </div>

            {selectedSlot && (
              <Button
                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white"
                onClick={() => {
                  window.alert(`Booking confirmed for ${selectedDay} at ${selectedSlot}`);
                  setSelectedDay(null);
                  setSelectedSlot(null);
                }}
              >
                Confirm Booking for {selectedDay} at {selectedSlot}
              </Button>
            )}
          </div>
        )}
        {/* <Button 
          onClick={handleBooking}
          className="w-full mt-4 bg-primary text-white"
          disabled={!selectedSlot}
        >
          Book Appointment
        </Button> */}
      </Card>

      {/* Schedule Card */}
      <Card className="absolute top-4 right-4 p-4 w-64 bg-white shadow-lg pt-64">
        <h3 className="text-lg font-bold mb-3 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Weekly Schedule For Doctor
        </h3>
        <div className="space-y-2">
          {schedule && Object.entries(schedule)
            .filter(([key]) => ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].includes(key))
            .map(([day, time]) => (
              <div key={day} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                <span className="font-medium capitalize">{day}</span>
                <span className="text-gray-600">{time || 'Not Available'}</span>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
}
