import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-blue-300">
                  Online Consultations
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-300">
                  Find a Doctor
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-300">
                  Medicine Delivery
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-300">
                  Lab Tests
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-blue-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-300">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-300">
                  Press
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-blue-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-300">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-blue-300">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-300">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-300">
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-300">
                  Instagram
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2023 HealthCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

