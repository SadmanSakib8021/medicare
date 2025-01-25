import Sidebar from "@/components/Sidebar"
export default function ConsultationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    (
        <div className="min-h-screen bg-gray-50">
          {/* Sidebar */}
          <Sidebar />
    
          {/* Main Content */}
          <div className="pl-64">
            {/* Header */}
            <header className="h-16 bg-white border-b flex items-center px-6">
              <h1 className="text-xl font-semibold text-gray-800">Update Profile</h1>
            </header>
    
            {/* Content Area */}
            <main className="p-6">
              {children}
            </main>
          </div>
        </div>
      )
  )
}

