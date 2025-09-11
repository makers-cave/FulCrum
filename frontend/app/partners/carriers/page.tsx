"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { usePageHeader } from "@/contexts/PageHeaderContext";
import { carriersData, sampleTenantOrders } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { useEffect, useState } from "react";

const CarriersPage = () => {
    const { setHeader } = usePageHeader()
  
    useEffect(() => {
      setHeader("Carriers", "View all Carriers.")
    }, [setHeader])
  const [selectedEntity, setSelectedEntity] = useState<string | null>("1");
  
  const data = carriersData;
  const orders = selectedEntity ? sampleTenantOrders[selectedEntity as keyof typeof sampleTenantOrders] ?? [] : [];
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-end gap-6">
        <div className="flex items-center gap-3">
          <Input placeholder="Search Carriers..." className="max-w-sm" />
          <Badge>Add New</Badge>
        </div>
      </div>
      {/* Top section: Tenant list */}
      <Card>
        <CardHeader>
          <CardTitle>Carriers List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((t) => (
                <TableRow
                  key={t._id}
                  className={`cursor-pointer ${selectedEntity === t._id ? "bg-muted" : ""}`}
                  onClick={() => setSelectedEntity(t._id)}
                >
                  <TableCell className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={t.avatar} alt={t.name} />
                      <AvatarFallback>{t.name[0]}</AvatarFallback>
                    </Avatar>
                    {t.name}
                  </TableCell>
                  <TableCell>{t.email}</TableCell>
                  <TableCell>{t.phone}</TableCell>
                  <TableCell>
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/partners/carriers/${t._id}`}>
                          Edit
                        </Link>
                      </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Bottom section: Orders for selected tenant */}
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedEntity
              ? `Orders for ${data.find((t) => t._id === selectedEntity)?.name}`
              : "Select a tenant to view orders"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((o) => (
                  <TableRow key={o._id}>
                    <TableCell>{o._id}</TableCell>
                    <TableCell>{o.item}</TableCell>
                    <TableCell>{o.qty}</TableCell>
                    <TableCell>{o.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-muted-foreground">No orders for this tenant</p>
          )}
        </CardContent>
      </Card>
    </div>

  )

}

export default CarriersPage