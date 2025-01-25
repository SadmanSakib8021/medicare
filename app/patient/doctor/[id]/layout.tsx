import Header from "@/components/Header";

export default function DoctorProfileLayout({
    children,
}: {
    children: React.ReactNode
}): JSX.Element {
    return (
        <div className="min-h-screen bg-gray-50">
                  {/* Sidebar */}

                  <Header isLoggedIn={true} />
                  
            
                  {/* Main Content */}
                  <div className="pt-4">
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
    );
}