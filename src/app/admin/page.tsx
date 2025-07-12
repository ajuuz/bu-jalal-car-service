import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, ShoppingCart, User, DollarSign } from "lucide-react"

const stats = [
  {
    title: "Total Users",
    icon: <User className="text-blue-500 w-6 h-6" />,
    value: "1,250",
    change: "+5.3%",
  },
  {
    title: "Orders",
    icon: <ShoppingCart className="text-green-500 w-6 h-6" />,
    value: "320",
    change: "+2.1%",
  },
  {
    title: "Revenue",
    icon: <DollarSign className="text-yellow-500 w-6 h-6" />,
    value: "$12,450",
    change: "+8.7%",
  },
  {
    title: "Visitors",
    icon: <BarChart className="text-purple-500 w-6 h-6" />,
    value: "9,800",
    change: "+12.4%",
  },
]

export default function AdminDashboard() {
  return (
    <div className="px-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change} from last week</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
