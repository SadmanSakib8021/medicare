'use client'; // Add this at the very top of the file

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

// Add interfaces
interface Medicine {
  medicineName: string;
  dose: string;
  duration: string;
}

interface Prescription {
  id: number;
  doctorId: string;
  patientId: string;
  patientName: string;
  diseaseName: string;
  notes: string;
  issuedDate: string;
  medicines: Medicine[];
}

export default function Timeline() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        
        const response = await fetch(
          `http://localhost:9090/api/doctor/getprescription?Id=${user.id}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        if (!response.ok) throw new Error('Failed to fetch prescriptions');
        const data = await response.json();
        setPrescriptions(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPrescriptions();
  }, []);

  return (
    <>
      <div className="space-y-4">
        {prescriptions.map((prescription) => (
          <Card 
            key={prescription.id} 
            onClick={() => setSelectedPrescription(prescription)}
            className="cursor-pointer hover:shadow-md transition-shadow"
          >
            <CardHeader>
              <CardTitle className="text-md font-medium">
                {prescription.diseaseName}
              </CardTitle>
              <p className="text-sm text-gray-500">
                Issued: {prescription.issuedDate}
              </p>
            </CardHeader>
            <CardContent>
              <p>Patient: {prescription.patientName}</p>
              {prescription.notes && (
                <p className="text-sm text-gray-600">Notes: {prescription.notes}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedPrescription} onOpenChange={() => setSelectedPrescription(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedPrescription?.diseaseName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Patient Details</h3>
              <p><strong>Name:</strong> {selectedPrescription?.patientName}</p>
              <p><strong>Date:</strong> {selectedPrescription?.issuedDate}</p>
            </div>
            {selectedPrescription?.notes && (
              <div>
                <h3 className="font-semibold">Notes</h3>
                <p>{selectedPrescription.notes}</p>
              </div>
            )}
            {selectedPrescription?.medicines && selectedPrescription.medicines.length > 0 && (
              <div>
                <h3 className="font-semibold">Medicines</h3>
                <div className="space-y-2">
                  {selectedPrescription.medicines.map((medicine, index) => (
                    <div key={index} className="p-2 bg-gray-50 rounded">
                      <p><strong>Name:</strong> {medicine.medicineName}</p>
                      <p><strong>Dose:</strong> {medicine.dose}</p>
                      <p><strong>Duration:</strong> {medicine.duration}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}