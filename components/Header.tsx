import Link from "next/link"
import { Search, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Header({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          HealthCare
        </Link>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input type="text" placeholder="Search" className="pl-8 pr-2 py-1 border rounded-full" />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center text-gray-600 hover:text-blue-600">
                    Healthcare Services <ChevronDown size={16} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link href="#" className="w-full">
                        Healthcare Services
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="#" className="w-full">
                        Appointment
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="#" className="w-full">
                        AI Consultation
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-600">
                  Offers
                </Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li>
                    <Link href="/patient/dashboard" className="text-gray-600 hover:text-blue-600">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/patient/book-consultation" className="text-gray-600 hover:text-blue-600">
                      Book Consultation
                    </Link>
                  </li>
                  <li>
                    <Link href="/patient/appointments" className="text-gray-600 hover:text-blue-600">
                      My Appointments
                    </Link>
                  </li>
                  <li>
                    <Link href="/patient/profile" className="text-gray-600 hover:text-blue-600">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link href="/logout" className="text-gray-600 hover:text-blue-600">
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/signup" className="text-gray-600 hover:text-blue-600">
                      Sign Up
                    </Link>
                  </li>
                  <li>
                    <Link href="/login" className="text-gray-600 hover:text-blue-600">
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

