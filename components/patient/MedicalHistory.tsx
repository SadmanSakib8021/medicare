'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

interface MedicalHistoryItem {
  diseaseName: string;
  issuedDate: string;
}

export default function MedicalHistory() {
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistoryItem[]>([]);

  useEffect(() => {
    const fetchMedicalHistory = async () => {
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
          throw new Error('Failed to fetch medical history');
        }

        const data = await response.json();

        // Map the data to extract the necessary fields
        const medicalHistoryData = data.map((item: any) => ({
          diseaseName: item.diseaseName,
          issuedDate: item.issuedDate,
        }));

        setMedicalHistory(medicalHistoryData);
      } catch (error) {
        console.error('Error fetching medical history:', error);
      }
    };

    fetchMedicalHistory();
  }, []);

  const dateFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' });

  return (
    <div className="space-y-4">
      {medicalHistory.length === 0 ? (
        <p className="text-gray-600">No medical history available.</p>
      ) : (
        medicalHistory.map((item, index) => {
          const date = new Date(item.issuedDate);
          const formattedDate = isNaN(date.getTime())
            ? 'Invalid date'
            : dateFormatter.format(date);

          return (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-md font-medium">{item.diseaseName}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Date: {formattedDate}</p>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
}