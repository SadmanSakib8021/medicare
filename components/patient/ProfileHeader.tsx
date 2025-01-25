'use client';

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Edit } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProfileHeader() {
  const [user, setUser] = useState<any>(null);  // Initialize with null or an empty object

  useEffect(() => {
    const use = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(use);
  }, []);

  if (!user) {
    return <div>Loading...</div>;  // Add a loading state in case the user data is not available yet
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-shrink-0">
        <img
          src="/placeholder.svg?height=150&width=150"
          alt={user.name || "User"}
          className="w-36 h-36 rounded-full object-cover"
        />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
            <p className="text-gray-600 mb-1">Male | Elshiekh Zayed, Giza</p>
            <p className="text-gray-600 mb-1">Accountant</p>
            <p className="text-gray-600 mb-4">12 Dec 1992 (38 years)</p>
            <div className="flex gap-2 mb-4">
              <Button variant="outline" size="icon">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Obesity</Badge>
              <Badge variant="secondary">Uncontrolled Type 2</Badge>
              <Badge variant="outline">Fear of medication</Badge>
              <Badge variant="outline">Fear of insulin</Badge>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>
      <div className="flex-shrink-0 grid grid-cols-2 gap-4">
        {[
          { label: "BMI", value: "22.4", change: "+10" },
          { label: "Weight", value: "92 kg", change: "+10 kg" },
          { label: "Height", value: "175 cm", change: null },
          { label: "Blood Pressure", value: "124/80", change: "+10" },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="text-lg font-bold">{item.value}</p>
            {item.change && <p className="text-sm text-green-500">{item.change}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
