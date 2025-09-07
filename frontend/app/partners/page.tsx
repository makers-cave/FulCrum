import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { partnerDashboardData } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Calendar, Factory, Home, PieChart, Truck, Users } from "lucide-react";

const PartnersPage = () => {
  const data = partnerDashboardData;
  return (
    <div className="p-6 space-y-6">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold">Partners Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of Tenants, Customers, Suppliers, Manufacturers & Carriers</p>
      </div>

      <div className="flex items-center gap-3">
        <Input placeholder="Search partners..." className="max-w-sm" />
        <Badge>Live</Badge>
      </div>
    </div>

    {/* KPI Row */}
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {data.kpis.map((d) => (
        <KPI key={d.title} {...d} />
      ))}
    </div>

    {/* Mid Section: charts & top lists */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Top Customers */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><PieChart className="h-4 w-4" /> Top Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {data.topCustomers.map((c) => (
              <li key={c.name} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-muted-foreground">Orders: {c.orders}</div>
                </div>
                <div className="text-sm font-semibold">{c.orders}</div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Carrier Performance */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">Carrier Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {data.carriersPerformance.map((c) => (
              <li key={c.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{c.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs text-muted-foreground">On-time %</div>
                  </div>
                </div>
                <div className="font-semibold">{c.onTimePct}%</div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Recent Partner Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {data.recentActivity.map((r, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="text-xs text-muted-foreground w-20">{r.when}</div>
                <div className="flex-1">
                  <div className="font-medium">{r.who}</div>
                  <div className="text-sm text-muted-foreground">{r.type} — {r.summary}</div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>

    {/* Bottom Section: Contracts expiring & Directory */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Contracts expiring */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Contracts expiring soon</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Partner</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.expiringContracts.map((c) => (
                <TableRow key={c.name}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.type}</TableCell>
                  <TableCell>{c.expires}</TableCell>
                  <TableCell>
                      <Badge variant={c.status === "Action required" ? "destructive" : "secondary"}>{c.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Directory (full width on large screens) */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Partners Directory</CardTitle>
          <CardContent className="pt-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Partner</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Activity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.directory.map((d) => (
                  <TableRow key={d.name}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{d.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{d.name}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{d.type}</TableCell>
                    <TableCell>
                      <Badge variant={d.status === "Active" ? "secondary" : "outline"}>{d.status}</Badge>
                    </TableCell>
                    <TableCell>{d.lastActivity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  </div>
)

}
function KPI({
  title,
  value,
  delta,
  icon: Icon,
}: {
  title: string;
  value: number;
  delta: number;
  icon: any;
}) {
  return (
    <Card className="flex flex-col items-center justify-center p-4">
      <CardContent className="flex flex-col items-center justify-center text-center space-y-1 p-0">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon className="h-5 w-5" />
          <span>{title}</span>
        </div>
        <div className="text-3xl font-bold">{value}</div>
        <div
          className={cn(
            "text-sm font-medium",
            delta > 0 ? "text-green-500" :delta < 0 ? "text-red-500": "text-gray-500"
          )}
        >
          {delta > 0 ? `+${delta}` : delta}
        </div>
      </CardContent>
    </Card>
  );
}

export default PartnersPage 