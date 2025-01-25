"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, User } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { X } from "lucide-react";

import { CalendarIcon } from "lucide-react"

import { DateRange, DayPicker } from "react-day-picker";



import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format, set } from "date-fns"

// Define interfaces for clarity and type safety
interface PrescriptionCard {
  medicine: string,
  dose: string,
  duration: DateRange;
}

interface Medicine {
  medicineName: string;
  dose: string;
  duration: string;
}

interface PrescriptionPayload {
  doctorId: string;
  patientId: string;
  patientName: string;
  diseaseName: string;
  notes: string;
  issuedDate: string;
  medicines: Medicine[];
}

interface Patient {
  patientName: string;
  patientId: string;
  status: string;
}

interface DayBooking {
  bookingId: number;
  doctorId: string;
  patientId: string | null;
  appointmentDate: string;
  appointmentDay: string | null;
  data: Patient[];

}



export default function ConsultationPage({ params }: { params: { id: string } }) {
  // Define all Hooks at the top level
  const [prescription, setPrescription] = useState({
    diagnosis: "",
    symptoms: "",
    specialNotes: "",
  })

  const [prescriptionCards, setPrescriptionCards] = useState<PrescriptionCard[]>([])
  const [todayBookings, setTodayBookings] = useState<DayBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Patient[]>([]);
  const [aluDate, setAluDate] = useState<Patient[]>([]);
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  })
  

  // Fetch today's bookings on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found, please log in.');
        }

        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user.id) {
          throw new Error('User data is missing.');
        }

        const today = new Date().toISOString().split('T')[0];
        
        const response = await fetch(
          `http://localhost:9090/api/booking/currentday?id=${user.id}&date=${today}`, 
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }

        const fetchedData: DayBooking[] = await response.json();
        
        if (fetchedData.length === 0) {
          throw new Error('No bookings found for today.');
        }

        setTodayBookings(fetchedData);
        console.log('Fetched bookings:', fetchedData);

        console.log(fetchedData[0]?.data);

        const upcomingPatients = fetchedData[0]?.data?.filter((patient: any) => patient.status === "Upcoming") || [];
        setData(upcomingPatients);

        // Find the current patient based on params.id
        const current = upcomingPatients[0];
        setCurrentPatient(current);

        const putki = upcomingPatients.filter((patient: Patient) => {
          console.log(patient.patientId);
          console.log(current.patientId);
          return patient.patientId !== current?.patientId

        });
        setAluDate(putki);
        
        
      } catch (error) {
        console.error('Error:', error);
        // Optionally, you can set an error state here to display to the user
      } finally {
        setLoading(false);
      }
    };
  
    fetchUser();
  }, [params.id])

  // Handle form field changes for diagnosis, symptoms, and specialNotes
  const handleFieldChange = (field: string, value: string) => {
    setPrescription(prev => ({
      ...prev,
      [field]: value
    }));
  }

  // Handle prescription card field changes
  const handlePrescriptionCardChange = (index: number, field: keyof PrescriptionCard, value: any) => {
    if(field === 'duration') {
      const updatedCards = [...prescriptionCards]
      updatedCards[index] = { ...updatedCards[index], [field]: value }
      setPrescriptionCards(updatedCards)
      return
    }
    const updatedCards = [...prescriptionCards]
    updatedCards[index] = { ...updatedCards[index], [field]: value }
    setPrescriptionCards(updatedCards)
  }

  // Handle prescription submission
  const handleSubmitPrescription = async () => {
    if (!currentPatient) {
      alert('No current patient selected.');
      return;
    }

    if (!prescription.diagnosis || !prescription.symptoms) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found, please log in.');
      }

      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user.id || !user.name) {
        throw new Error('User data is incomplete.');
      }
      
      const formattedMedicines = prescriptionCards.map(card => ({
        medicineName: card.medicine,
        dose: card.dose,
        duration: `${card.duration.from} to ${card.duration.to}`
      }));

      const payload: PrescriptionPayload = {
        doctorId: user.id,
        patientId: currentPatient.patientId,
        patientName: currentPatient.patientName, // Use the patient's name
        diseaseName: prescription.symptoms,
        notes: prescription.specialNotes || "",
        issuedDate: new Date().toISOString().split('T')[0],
        medicines: formattedMedicines
      };

      console.log("Submitting payload:", payload);
  
      const response = await fetch("http://localhost:9090/api/doctor/prescription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to submit prescription: ${errorMessage}`);
      }
  
      alert('Prescription submitted successfully');
      // Optionally, reset the form here
      setPrescription({
        diagnosis: "",
        symptoms: "",
        specialNotes: "",
      })
      setPrescriptionCards([]);
      
    } catch (error) {
      console.error('Error:', error);
      alert(`Failed to submit prescription: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Handle loading and error states
  if (loading) {
    return <div className="p-4">Loading...</div>
  }

  if (!currentPatient) {
    return <div className="p-4">No current patient selected.</div>
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
                    alt={currentPatient.patientName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{currentPatient.patientName}</h2>
                  <p className="text-gray-600">Patient ID: {currentPatient.patientId}</p>
                  {/* Add more patient details if available */}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleSubmitPrescription(); }} className="space-y-6">
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
                    onChange={(e) => handleFieldChange('diagnosis', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="symptoms">Symptoms</Label>
                  <Input
                    id="symptoms"
                    value={prescription.symptoms}
                    onChange={(e) => handleFieldChange('symptoms', e.target.value)}
                    required
                  />
                </div>
              </div>

              {prescriptionCards.map((card, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="space-y-2">
                      <Label htmlFor={`medicine-${index}`}>Medicine</Label>
                      <Select
                        value={card.medicine}
                        onValueChange={(value) => handlePrescriptionCardChange(index, 'medicine', value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select medicine" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Medicine A">Medicine A</SelectItem>
                          <SelectItem value="Medicine B">Medicine B</SelectItem>
                          <SelectItem value="Medicine C">Medicine C</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`dose-${index}`}>Dose</Label>
                      <Input
                        id={`dose-${index}`}
                        value={card.dose}
                        onChange={(e) => handlePrescriptionCardChange(index, 'dose', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`duration-${index}`}>Duration</Label>
                      <div className="flex gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              id="date"
                              variant={"outline"}
                              className={cn(
                                "w-[300px] justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon />
                              {card.duration.from? (
                                card.duration.to ? (
                                  <>
                                    {format(card.duration.from, "LLL dd, y")} - {format(card.duration.to, "LLL dd, y")}
                                  </>
                                ) : (
                                  format(card.duration.from, "LLL dd, y")
                                )
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                              initialFocus
                              mode="range"
                              defaultMonth={date?.from}
                              selected={prescriptionCards[index].duration} // Pass the currently selected range
                              onSelect={(selectedRange) => {
                                // Update the specific card's duration
                                handlePrescriptionCardChange(index, 'duration', selectedRange);
                              }}
                              numberOfMonths={2}
                            />

                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div className="space-y-2 flex justify-end">
                      {/* Add proper margins or padding */}
                      <Button
                        variant="destructive"
                        size={"icon"}
                        onClick={() => setPrescriptionCards(prescriptionCards.filter((_, i) => i !== index))}
                        className="mt-6 md:mt-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}



              <Button 
                type="button" 
                variant="default" 
                onClick={() => setPrescriptionCards([...prescriptionCards, { medicine: "", dose: "", duration: { from: new Date(), to: new Date() } }])}
              >
                ADD Medicine
              </Button>

              <div className="space-y-2">
                <Label htmlFor="specialNotes">Special Notes</Label>
                <Textarea
                  id="specialNotes"
                  value={prescription.specialNotes}
                  onChange={(e) => handleFieldChange('specialNotes', e.target.value)}
                  placeholder="Any special instructions or notes"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <div className="mt-4">
            <Button 
              type="submit"
              className="w-full bg-primary text-white"
            >
              Submit Prescription
            </Button>
          </div>
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
              {data.length === 0 ? (
                <p className="text-center text-gray-600">No upcoming patients.</p>
              ) : (
                console.log("data"),
                console.log(aluDate),
                aluDate.map((patient, index) => (
                  
                    <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <User className="w-5 h-5 text-gray-500" />
                        <span className="font-medium">{patient.patientName}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        {/* Replace with actual appointment time if available */}
                        <span>Appointment Time: N/A</span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">Patient ID: {index}</p>
                    </CardContent>
                  </Card>
                
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}