import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ProfileHeader from "./ProfileHeader"
import Timeline from "./Timeline"
import MedicalHistory from "./MedicalHistory"
import Medications from "./Medications"
import Diet from "./Diet"

export default function PatientProfile() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardContent className="p-6">
          <ProfileHeader />
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Timeline />
        <div className="space-y-8">
          <MedicalHistory />
          <Medications />
          <Diet />
        </div>
      </div>
    </div>
  )
}

