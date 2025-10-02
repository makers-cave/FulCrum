"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, Truck, Eye, Filter, PlusCircle, ListOrdered, NotepadText, ScanBarcode, AlignHorizontalDistributeCenter } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePageHeader } from "@/contexts/PageHeaderContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Order } from "@/lib/types";
import { getOrders } from "@/lib/services/ordersService";
import { Spinner } from "@/components/spinner";
import { NotFound } from "@/components/notFound";
import AllocateLotDialog from "@/app/fulfillment/orders/allocateLot";
import { Separator } from "@/components/ui/separator";

// Status Badge helper
function StatusBadge({ status }: { status: Order["status"] }) {
    switch (status) {
        case "pending":
            return <Badge variant="destructive">Pending</Badge>;
        case "picking":
            return <Badge variant="secondary">Picking</Badge>;
        case "shipped":
            return <Badge className="bg-green-500 hover:bg-green-600">Shipped</Badge>;
        default:
            return null;
    }
}
function autoAllocate() {
    alert("Auto Allocate clicked!");
}
export default function OrdersPage() {
    const { setHeader } = usePageHeader()
    const [orders, setOrders] = useState<Order[]>(null!); // Replace null! with actual data fetching logic
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        setHeader("Orders", "View and process customer orders")
    }, [setHeader])
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [query, setQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<string>("All");
    useEffect(() => {
        async function loadParts() {
            try {
                const t = await getOrders();
                if (t) {
                    setOrders(t)
                } else {
                    setError(true);
                }
            } catch (e) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        loadParts()
    });
    if (loading) {
        return <Spinner text="Loading Orders..." />
    }
    else if (error || !orders) {
        return <NotFound entityName="Orders" backHref="/" backLabel="Go back to Dashboard" />
    } else {
        return (
            <div className="p-6 space-y-6">
                {/* Toolbar */}
                <div className="flex items-center gap-2 justify-end">
                    <Input
                        placeholder="Search product name or SKU..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-64"
                    />
                    {/* Filter Dialog */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="flex gap-2">
                                <Filter className="h-4 w-4" />
                                Filters
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Filter Orders</DialogTitle>
                                <DialogDescription>
                                    Narrow down your order list.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Category</Label>
                                    <Select
                                        value={categoryFilter}
                                        onValueChange={setCategoryFilter}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="All">All</SelectItem>
                                            <SelectItem value="Motors">Motors</SelectItem>
                                            <SelectItem value="Microcontrollers">
                                                Microcontrollers
                                            </SelectItem>
                                            <SelectItem value="Electronics">Electronics</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <div className="flex gap-2">
                        <Button><PlusCircle className="h-4 w-4" /> Add</Button>
                    </div>
                </div>

                {/* Orders Table */}
                <Card>
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <ListOrdered className="h-5 w-5" />
                            Orders
                        </CardTitle>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => autoAllocate()}><AlignHorizontalDistributeCenter className="h-4 w-4 mr-1" />Allocate all</Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 grid gap-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order ID</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Items</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow key={order.id} onClick={() => setSelectedOrder(order)} className="cursor-pointer hover:bg-accent">
                                        <TableCell>{order.id}</TableCell>
                                        <TableCell>{order.customer}</TableCell>
                                        <TableCell>{order.date}</TableCell>
                                        <TableCell>{order.items}</TableCell>
                                        <TableCell><StatusBadge status={order.status} /></TableCell>
                                        <TableCell>{order.location.name}</TableCell>
                                        <TableCell className="flex gap-2">
                                            {order.status === "pending" && (
                                                <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); alert("Pick Clicked"); }}>
                                                    <Package className="h-4 w-4 mr-1" /> Pick
                                                </Button>
                                            )}
                                            {order.status === "picking" && (
                                                <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); alert("Ship Clicked"); }}>
                                                    <Truck className="h-4 w-4 mr-1" /> Ship
                                                </Button>
                                            )}
                                            {order.status === "shipped" && (
                                                <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); alert("Track Clicked"); }}>
                                                    <ScanBarcode className="h-4 w-4 mr-1" /> Track
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                {/* Drawer for Order Details */}
                <Card>
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <NotepadText className="h-5 w-5" />
                            Order details
                            {selectedOrder && <div className="flex items-center gap-2">
                                <StatusBadge status={selectedOrder.status} />
                            </div>}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 grid gap-4">

                        {selectedOrder && (
                            <div className="space-y-6">
                                {/* 2 Column Details */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Order ID</p>
                                        <p className="font-medium">{selectedOrder.id}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Customer</p>
                                        <p className="font-medium">{selectedOrder.customer}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Date</p>
                                        <p className="font-medium">{selectedOrder.date}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Fulfillment</p>
                                        <p className="font-medium">{selectedOrder.location.name}</p>
                                    </div>
                                </div>
                                <Separator />
                                {/* Items Table */}
                                <div className="mt-6">
                                    <p className="font-semibold mb-2">Order Items</p>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>SKU</TableHead>
                                                <TableHead>Product</TableHead>
                                                <TableHead>Qty</TableHead>
                                                <TableHead>Lots</TableHead>
                                                <TableHead className="text-right">Allocate</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {selectedOrder.itemsList?.map((item) => (
                                                <TableRow key={item.sku}>
                                                    <TableCell>{item.sku}</TableCell>
                                                    <TableCell>{item.name}</TableCell>
                                                    <TableCell>{item.qty}</TableCell>
                                                    <TableCell>
                                                        {item.lots?.map(lot => (<Badge key={lot._id} className="mr-1">{lot.lot.name}</Badge>))}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <AllocateLotDialog sku={item.sku} onUpdate={(lots) => {
                                                            const updatedItems = selectedOrder.itemsList?.map(i => {
                                                                if (i.sku === item.sku) {
                                                                    return { ...i, lots };
                                                                }
                                                                return i;
                                                            });
                                                            setSelectedOrder({ ...selectedOrder, itemsList: updatedItems });
                                                        }}></AllocateLotDialog>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                {/* Button */}
                                <div className="mt-6">
                                    <Button className="w-full">Generate Picking List</Button>
                                </div>
                            </div>

                        )}

                    </CardContent>
                </Card>
            </div>
        )
    }
}
