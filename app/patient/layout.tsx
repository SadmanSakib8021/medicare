import Header from "@/components/Header"

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header isLoggedIn={true} />
      <main className="flex-grow">{children}</main>
    </>
  )
}

