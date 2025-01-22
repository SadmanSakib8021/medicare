import { Calendar, CheckCircle, XCircle } from "lucide-react"

const StatCard = ({ icon: Icon, color, number, title, change, isPositive }) => (
  <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
    <div className="flex items-center">
      <div className={`p-3 rounded-full ${color} mr-4`}>
        <Icon className="text-white" size={24} />
      </div>
      <div>
        <p className="text-2xl font-bold">{number}</p>
        <p className="text-gray-500">{title}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-sm text-gray-500">Last month</p>
      <p className={`text-sm font-semibold ${isPositive ? "text-green-500" : "text-red-500"}`}>
        {isPositive ? "↑" : "↓"} {change}%
      </p>
    </div>
  </div>
)

export default function StatisticsDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard
        icon={Calendar}
        color="bg-blue-500"
        number={183}
        title="Total Appointments"
        change={5.4}
        isPositive={true}
      />
      <StatCard
        icon={CheckCircle}
        color="bg-green-500"
        number={94}
        title="Completed Counselling"
        change={1.6}
        isPositive={false}
      />
      <StatCard
        icon={Calendar}
        color="bg-yellow-500"
        number={83}
        title="Pending Appointments"
        change={9.7}
        isPositive={true}
      />
      <StatCard
        icon={XCircle}
        color="bg-red-500"
        number={6}
        title="Canceled Appointments"
        change={0.2}
        isPositive={false}
      />
    </div>
  )
}

