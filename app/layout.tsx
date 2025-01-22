import "./globals.css"
import { Inter } from "next/font/google"
import Header from "@/components/Header"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Modern Healthcare Service",
  description: "Book consultations, find doctors, and more.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header isLoggedIn={false} />
        {children}
      </body>
    </html>
  )
}

