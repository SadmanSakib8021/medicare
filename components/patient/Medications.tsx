'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit } from 'lucide-react';

// Define interfaces for TypeScript
interface Medicine {
  prescriptionId: number;
  name: string;
  dose: string;
  duration: string;
  date: string;
}

export default function Medications() {
  const [medications, setMedications] = useState<Medicine[]>([]);

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');

        const response = await fetch(
          `http://localhost:9090/api/doctor/getprescription?Id=${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error('Failed to fetch medications');
        }

        const data = await response.json();

        // Extract medicines from prescriptions
        let medicationsData: Medicine[] = [];

        data.forEach((prescription: any) => {
          const { id: prescriptionId, issuedDate } = prescription;
          if (prescription.medicines && prescription.medicines.length > 0) {
            prescription.medicines.forEach((medicine: any) => {
              medicationsData.push({
                prescriptionId,
                name: medicine.medicineName,
                dose: medicine.dose,
                duration: medicine.duration,
                date: issuedDate,
              });
            });
          }
        });

        setMedications(medicationsData);
      } catch (error) {
        console.error('Error fetching medications:', error);
      }
    };

    fetchMedications();
  }, []);

  const dateFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-medium">Medications</CardTitle>
        <Button variant="ghost" size="sm">
          <Edit className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {medications.length === 0 ? (
          <p className="text-gray-600">No medications available.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Dose</TableHead>
                <TableHead>Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medications.map((med, index) => {
                const date = new Date(med.date);
                const formattedDate = isNaN(date.getTime())
                  ? 'Invalid date'
                  : dateFormatter.format(date);

                return (
                  <TableRow key={`${med.prescriptionId}-${index}`}>
                    <TableCell className="font-medium">{med.name}</TableCell>
                    <TableCell>{formattedDate}</TableCell>
                    <TableCell>{med.dose}</TableCell>
                    <TableCell>{med.duration}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}