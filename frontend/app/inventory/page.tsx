"use client"

import { useEffect, useState } from "react"
import {
  LayoutDashboard,
  Store,
  Package,
  Tag,
  Truck,
  CreditCard,
  BarChart,
  Settings,
  HelpCircle,
  LogOut,
  Search,
  Users,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { inventoryDashboardData as data } from "@/lib/data"
import { usePageHeader } from "@/contexts/PageHeaderContext"
// -------------------- Page --------------------
export default function DashboardPage() {
  const { setHeader } = usePageHeader()

  useEffect(() => {
    setHeader("Inventory Dashboard", "All Parts and Products at a glance")
  }, [setHeader])
  return (
    <div className="flex min-h-screen">
      {/* Main */}
      <main className="flex-1 p-6 space-y-6">
        {/* Top bar */}
        <div className="flex items-center justify-end">

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input placeholder="Search item, order, etc" className="pl-8" />
            </div>

          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4">
          {data.summaryStats.map((s, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{s.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-green-600">{s.change} from last week</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Profit by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={data.profitData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                    label
                  >
                    {data.profitData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <p className="text-center mt-2 font-bold">$1,000,000</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data.orderSummary}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="profit" stroke="#22c55e" />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-center mt-2 font-bold">$8,870</p>
            </CardContent>
          </Card>
        </div>

        {/* Stock + Restock */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Stock Level</CardTitle>
            </CardHeader>
            <CardContent>
              {data.stockLevels.map((s, i) => (
                <div key={i} className="mb-4">
                  <p className="text-sm">{s.product}</p>
                  <Progress value={(s.current / s.total) * 100} />
                  <p className="text-xs text-gray-500">
                    {s.current} of {s.total} remaining
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Restock</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.restocks.map((r, i) => (
                    <TableRow key={i}>
                      <TableCell>{r.product}</TableCell>
                      <TableCell>{r.qty}</TableCell>
                      <TableCell>{r.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-80 p-6 border-l space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Source</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <TrafficItem label="Amazon" value={27} trend="up" />
              <TrafficItem label="Ebay" value={23} trend="down" />
              <TrafficItem label="Aliexpress" value={18} trend="down" />
              <TrafficItem label="Etsy" value={10} trend="up" />
              <TrafficItem label="Walmart" value={8} trend="down" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.activities.map((a, i) => (
              <div key={i} className="flex items-start space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{a.user[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">{a.user}</span> {a.action}
                  </p>
                  <p className="text-xs text-gray-500">{a.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </aside>
    </div>
  )
}

// -------------------- Components --------------------
function SidebarItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <Button
      variant="ghost"
      className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white"
    >
      {icon}
      <span className="ml-2">{label}</span>
    </Button>
  )
}

function TrafficItem({
  label,
  value,
  trend,
}: {
  label: string
  value: number
  trend: "up" | "down"
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span>{label}</span>
      <span
        className={`font-medium ${trend === "up" ? "text-green-600" : "text-red-600"
          }`}
      >
        {value}%
      </span>
    </div>
  )
}
