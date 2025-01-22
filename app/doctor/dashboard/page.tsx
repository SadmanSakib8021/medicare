export default function DoctorDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome, Dr. Shawn</h1>
      <p className="mb-4">Here's an overview of your upcoming appointments and patient statistics.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Today's Appointments</h2>
          <ul>
            <li>9:00 AM - John Doe</li>
            <li>11:30 AM - Jane Smith</li>
            <li>2:00 PM - Mike Johnson</li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Patient Statistics</h2>
          <p>Total Patients: 150</p>
          <p>New Patients This Month: 12</p>
          <p>Upcoming Appointments: 8</p>
        </div>
      </div>
    </div>
  )
}

