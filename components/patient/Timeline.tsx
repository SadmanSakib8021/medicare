'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Define interfaces
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

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');

        const response = await fetch(
          `http://localhost:9090/api/doctor/getprescription?Id=${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error('Failed to fetch prescriptions');
        const data = await response.json();
        setPrescriptions(data);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };

    fetchPrescriptions();
  }, []);

  return (
    <>
      <Card className="bg-white rounded shadow">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Prescriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-[40rem] overflow-y-auto space-y-4">
            {prescriptions.length === 0 ? (
              <p className="text-center text-gray-500">No prescriptions available.</p>
            ) : (
              prescriptions.slice().reverse().map((prescription) => (
                <Card
                  key={prescription.id}
                  onClick={() => setSelectedPrescription(prescription)}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      {prescription.diseaseName}
                    </CardTitle>
                    <p className="text-sm text-gray-500">
                      Issued: {new Date(prescription.issuedDate).toLocaleDateString()}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      <strong>Patient:</strong> {prescription.patientName}
                    </p>
                    {prescription.notes && (
                      <p className="text-sm text-gray-600 mt-2">
                        <strong>Notes:</strong> {prescription.notes}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {selectedPrescription && (
        <Dialog
          open={!!selectedPrescription}
          onOpenChange={() => setSelectedPrescription(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {selectedPrescription.diseaseName}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg">Patient Details</h3>
                <p>
                  <strong>Name:</strong> {selectedPrescription.patientName}
                </p>
                <p>
                  <strong>Date:</strong>{' '}
                  {new Date(selectedPrescription.issuedDate).toLocaleDateString()}
                </p>
              </div>
              {selectedPrescription.notes && (
                <div>
                  <h3 className="font-semibold text-lg">Notes</h3>
                  <p className="text-gray-700">{selectedPrescription.notes}</p>
                </div>
              )}
              {selectedPrescription.medicines &&
                selectedPrescription.medicines.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg">Medicines</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedPrescription.medicines.map((medicine, index) => (
                        <div
                          key={index}
                          className="p-4 bg-gray-50 rounded border"
                        >
                          <p>
                            <strong>Name:</strong> {medicine.medicineName}
                          </p>
                          <p>
                            <strong>Dose:</strong> {medicine.dose}
                          </p>
                          <p>
                            <strong>Duration:</strong> {medicine.duration}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              <div className="flex justify-end">
                <Button onClick={() => setSelectedPrescription(null)}>
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}