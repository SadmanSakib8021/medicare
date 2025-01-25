"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Grid, Calendar, Users, Mail, BarChart2, Settings, LogOut, UserCog } from "lucide-react"

const menuItems = [
  { icon: Grid, label: "Dashboard", href: "/doctor/dashboard" },
  { icon: Calendar, label: "Consultations", href: "/doctor/consultation/1" },
  { icon: Calendar, label: "Appointments", href: "/doctor/appointments" },
  { icon: Users, label: "Patients", href: "/doctor/patients" },
  { icon: Mail, label: "Messages", href: "/doctor/messages" },
  { icon: BarChart2, label: "Report", href: "/doctor/report" },
  { icon: UserCog, label: "Update Profile", href: "/doctor/updateProfile" },
  { icon: Settings, label: "Settings", href: "/doctor/settings" },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    // Here you would typically handle the logout logic
    console.log("Logging out...")
    router.push("/")
  }

  return (
    <aside className="bg-gray-100 h-[calc(100vh-64px)] w-64 fixed left-0 top-16 flex flex-col">
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  pathname === item.href
                    ? "bg-blue-100 text-black font-bold"
                    : "text-gray-600 hover:bg-gray-200 hover:text-black"
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 p-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-200 hover:text-black w-full"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}

