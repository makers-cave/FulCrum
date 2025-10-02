"use client";
import { SafeImage } from "@/components/SafeImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { usePageHeader } from "@/contexts/PageHeaderContext"
import { sampleLocations } from "@/lib/data";
import { Location } from "@/lib/types";
import { Calendar, DollarSign, Filter, Grid, Info, Loader2, MapPin, Package, PencilRuler, PlusCircle, ReceiptText, Trash2, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react"

const LocationsPage = () => {
    const { setHeader } = usePageHeader()
        useEffect(() => {
        setHeader("Locations", "View and manage warehouse locations")
    }, [setHeader])
    const [locations, setLocations] = useState<Location[]>(sampleLocations)
    const [search, setSearch] = useState("")
    const [filterCategory, setFilterCategory] = useState<string>("All")
    const [filterStatus, setFilterStatus] = useState<string>("All")
    const filteredLocations = sampleLocations.filter((loc) => {
        const matchesSearch =
            loc.name.toLowerCase().includes(search.toLowerCase()) ||
            loc.sku.toLowerCase().includes(search.toLowerCase())
        const matchesCategory =
            filterCategory === "All" || loc.category === filterCategory
        const matchesStatus =
            filterStatus === "All" || loc.status === filterStatus
        return matchesSearch && matchesCategory && matchesStatus
    })
      const [loading, setLoading] = useState(false)

    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
    return (
        <div className="p-6 space-y-6">
            {/* Search + Filter + Add */}
            <div className="flex items-center gap-2 justify-end">
                <Input
                    placeholder="Search parts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
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
                            <DialogTitle>Filter Parts</DialogTitle>
                            <DialogDescription>
                                Narrow down your locations list by geoghaphy.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Category</Label>
                                <Select
                                    value={filterCategory}
                                    onValueChange={setFilterCategory}
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

                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Select
                                    value={filterStatus}
                                    onValueChange={setFilterStatus}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="All">All</SelectItem>
                                        <SelectItem value="In Stock">In Stock</SelectItem>
                                        <SelectItem value="Low Stock">Low Stock</SelectItem>
                                        <SelectItem value="Out of Stock">
                                            Out of Stock
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                <Button><PlusCircle className="h-4 w-4" />Add</Button>
            </div>
            {/* Parts table */}
            <Card>
                <CardHeader className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        Parts Inventory
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>SKU</TableHead>
                                <TableHead>City</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Phone</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredLocations.map((location) => (
                                <TableRow key={location.id} onClick={() => setSelectedLocation(location)} className="cursor-pointer hover:bg-accent">
                                    <TableCell>
                                        <SafeImage
                                            src={location.image}
                                            alt={location.name}
                                            width={40}
                                            height={40}
                                            className="rounded"
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">{location.name}</TableCell>
                                    <TableCell>{location.category}</TableCell>
                                    <TableCell>{location.sku}</TableCell>
                                    <TableCell>{location.address?.city} {location.address?.state}</TableCell>
                                    <TableCell>{location.contactPerson}</TableCell>
                                    <TableCell>{location.phone}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            {/* Part details */}
            <Card>
                <CardHeader className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <ReceiptText className="h-5 w-5" />
                        {selectedLocation ? selectedLocation.name : "Select a part to view details"}
                    </CardTitle>
                    {loading && (
                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    )}
                    {selectedLocation != null && <div className="flex items-center gap-2">
                        <Button variant="outline" asChild size="sm">
                            <Link href={`/inventory/parts/${selectedLocation?.id}`}>
                                <PencilRuler />Edit
                            </Link>
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => alert("Archive product")}>
                            <Trash2 />Archive
                        </Button>
                    </div>}
                </CardHeader>
                <CardContent className="p-4 grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_2fr] gap-4 w-full">
                        {/* Section 1 - Image */}
                        <div className="flex items-center justify-center border rounded-md bg-muted p-2  h-48 ">
                            <SafeImage
                                src={selectedLocation?.image}
                                alt="Part"
                                width={120}
                                height={120}
                                className="object-contain"
                            />
                        </div>

                        {/* Section 2 */}
                        <div className="border rounded-md divide-y h-full">
                            <div className="flex justify-between items-center p-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-4 w-4" />
                                    <span>Assembly part</span>
                                </div>
                                <Badge>
                                    {selectedLocation?.isAssemblable ? "Yes" : "No"}
                                </Badge>
                            </div>
                            <div className="flex justify-between items-center p-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>Sellable</span>
                                </div>
                                <Badge variant="secondary">{selectedLocation?.isSellable ? "Yes" : "No"}</Badge>
                            </div>
                            <div className="flex justify-between items-center p-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <span>Purchasable</span>
                                </div>
                                <Badge variant="outline">{selectedLocation?.isPurchasable ? "Yes" : "No"}</Badge>
                            </div>
                            <div className="flex justify-between items-center p-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <Info className="h-4 w-4" />
                                    <span>Description</span>
                                </div>
                                <span className="wrap-break-word pl-2">{selectedLocation?.description || "-"}</span>
                            </div>
                        </div>

                        {/* Section 3 */}
                        <div className="border rounded-md divide-y h-full">
                            <div className="flex justify-between items-center p-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>Belongs To</span>
                                </div>
                                <Badge variant="secondary">{selectedLocation?.owner}</Badge>
                            </div>
                            <div className="flex justify-between items-center p-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-4 w-4" />
                                    <span>Price Range</span>
                                </div>
                                <span>-</span>
                            </div>
                            <div className="flex justify-between items-center p-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>Default Loc.</span>
                                </div>
                                <Button variant="link" className="p-0 text-blue-600">
                                    {selectedLocation?.defaultLocation || "-"}
                                </Button>
                            </div>
                            <div className="flex justify-between items-center p-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <span>Responsible</span>
                                </div>
                                <Button variant="link" className="p-0 text-blue-600">
                                    {selectedLocation?.respnsibleUser || "-"}
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center border rounded-md p-3 md:col-span-[1fr,2fr,2fr]">
                        <div className="flex items-center gap-2">
                            <Grid className="h-4 w-4" />
                            <span className="font-medium">Available Stock</span>
                            <span className="text-2xl font-bold">140</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center border rounded-md p-3 md:col-span-[1fr,2fr,2fr]">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-sm text-muted-foreground">
                                    <th className="p-2">Location</th>
                                    <th className="p-2">Stock</th>
                                    <th className="p-2">Reserved</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {partsLocation.map((loc) => (
                                    <LocationRow key={loc._id} location={loc} level={0} />
                                ))} */}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>


        </div>
    )
}

export default LocationsPage