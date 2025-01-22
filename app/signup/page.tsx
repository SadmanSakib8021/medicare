import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignUpPage() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Choose your account type</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Link href="/signup/doctor">
            <Button className="w-full">Sign up as a Doctor</Button>
          </Link>
          <Link href="/signup/patient">
            <Button className="w-full" variant="outline">
              Sign up as a Patient
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

