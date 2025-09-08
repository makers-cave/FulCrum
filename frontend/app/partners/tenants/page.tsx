"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { tenantData, sampleTenantOrders } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { useState } from "react";

const TanentsPage = () => {
  const [selectedTenant, setSelectedTenant] = useState<string | null>("1");
  const [editingTenant, setEditingTenant] = useState<any | null>(null);

  const tenants = tenantData;
  const orders = selectedTenant ? sampleTenantOrders[selectedTenant as keyof typeof sampleTenantOrders] ?? [] : [];
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Tenants</h1>
          <p className="text-sm text-muted-foreground">View, Add New, Edit or Delete Tenants.</p>
        </div>

        <div className="flex items-center gap-3">
          <Input placeholder="Search tentants..." className="max-w-sm" />
          <Badge>Add New</Badge>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Top section: Tenant list */}
        <Card>
          <CardHeader>
            <CardTitle>Tenants</CardTitle>
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
                {tenants.map((t) => (
                  <TableRow
                    key={t._id}
                    className={`cursor-pointer ${selectedTenant === t._id ? "bg-muted" : ""}`}
                    onClick={() => setSelectedTenant(t._id)}
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
                        <Link href={`/partners/tenants/${t._id}`}>
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
              {selectedTenant
                ? `Orders for ${tenants.find((t) => t._id === selectedTenant)?.name}`
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

        {/* Edit Tenant Dialog */}
        {/* <Dialog open={!!editingTenant} onOpenChange={() => setEditingTenant(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Tenant</DialogTitle>
            </DialogHeader>
            {editingTenant && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={editingTenant.avatar} alt={editingTenant.name} />
                    <AvatarFallback>{editingTenant.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-lg font-semibold">{editingTenant.name}</p>
                    <p className="text-sm text-muted-foreground">{editingTenant.email}</p>
                  </div>
                </div>

                Editable fields
                <div className="grid gap-3">
                  <label className="text-sm font-medium">Name</label>
                  <Input defaultValue={editingTenant.name} />

                  <label className="text-sm font-medium">Email</label>
                  <Input defaultValue={editingTenant.email} />

                  <label className="text-sm font-medium">Phone</label>
                  <Input defaultValue={editingTenant.phone} />
                </div>
              </div>
            )}
            <DialogFooter className="pt-4">
              <Button variant="outline" onClick={() => setEditingTenant(null)}>
                Cancel
              </Button>
              <Button>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog> */}
      </div>
    </div>
  )
}

export default TanentsPage