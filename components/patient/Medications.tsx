import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit } from "lucide-react"

const medications = [
  {
    name: "ACTRAPID® HM 1",
    indication: "Amaryl 1 mg",
    status: "Adherent",
    startDate: "2022-01-01",
    assignedBy: "Dr. Smith",
    notes: "Take with meals",
  },
  {
    name: "Metformin",
    indication: "Type 2 Diabetes",
    status: "Somewhat adherent",
    startDate: "2021-06-15",
    assignedBy: "Dr. Johnson",
    notes: "Take twice daily",
  },
  {
    name: "Lisinopril",
    indication: "Hypertension",
    status: "Not adherent",
    startDate: "2022-03-10",
    assignedBy: "Dr. Williams",
    notes: "Take in the morning",
  },
]

export default function Medications() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-medium">Medications</CardTitle>
        <Button variant="ghost" size="sm">
          <Edit className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Indication</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Assigned By</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medications.map((med) => (
              <TableRow key={med.name}>
                <TableCell className="font-medium">{med.name}</TableCell>
                <TableCell>{med.indication}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      med.status === "Adherent"
                        ? "success"
                        : med.status === "Somewhat adherent"
                          ? "warning"
                          : "destructive"
                    }
                  >
                    {med.status}
                  </Badge>
                </TableCell>
                <TableCell>{med.startDate}</TableCell>
                <TableCell>{med.assignedBy}</TableCell>
                <TableCell>{med.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

