import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function PatientNavBar({ onSearch, onAddPatient }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold">Patients</h2>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Search patients"
            className="pl-10 pr-4 py-2 w-64"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <Button onClick={onAddPatient} className="bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold">
          Add New Patient
        </Button>
      </div>
    </div>
  )
}

