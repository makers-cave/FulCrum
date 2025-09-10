"use client"

import Image from "next/image"
import { useState } from "react"
import { Edit, Trash2, Package, Filter, ReceiptText, User, MapPin, DollarSign, Calendar, Grid, Info, ShoppingCart, ChevronDown, ChevronRight, Loader2, Factory } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Part, PartLocation } from "@/lib/types"
import { sampleParts, partsLocation } from "@/lib/data"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible"
import { Separator } from "@/components/ui/separator"
import { EllipsedBadge } from "@/components/ellipsedBadge"
import { EllipsedText } from "@/components/EllipsedText"

// ---------------- Page ----------------
export default function PartsPage() {
  const [parts, setParts] = useState<Part[]>(sampleParts)
  const [search, setSearch] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("All")
  const [filterStatus, setFilterStatus] = useState<string>("All")
  const [loading, setLoading] = useState(false)
  const filteredParts = parts.filter((part) => {
    const matchesSearch =
      part.name.toLowerCase().includes(search.toLowerCase()) ||
      part.sku.toLowerCase().includes(search.toLowerCase())
    const matchesCategory =
      filterCategory === "All" || part.category === filterCategory
    const matchesStatus =
      filterStatus === "All" || part.status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);

  return (
    <div className="p-6 space-y-6">
      {/* Search + Filter + Add */}
      <div className="flex items-center gap-2">
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
                Narrow down your part list by category or stock status.
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

        <Button>Add Part</Button>
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
                <TableHead>Stock</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredParts.map((part) => (
                <TableRow key={part._id} onClick={() => setSelectedPart(part)} className="cursor-pointer hover:bg-accent">
                  <TableCell>
                    <Image
                      src={part.image}
                      alt={part.name}
                      width={40}
                      height={40}
                      className="rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{part.name}</TableCell>
                  <TableCell>{part.category}</TableCell>
                  <TableCell>{part.sku}</TableCell>
                  <TableCell>{part.stock}</TableCell>
                  <TableCell>{part.price}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        part.status === "In Stock"
                          ? "default"
                          : part.status === "Low Stock"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {part.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => alert(`Edit ${part.name}`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() =>
                        setParts(parts.filter((p) => p._id !== part._id))
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
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
            {selectedPart ? selectedPart.name : "Select a part to view details"}
          </CardTitle>
          {loading && (
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          )}
        </CardHeader>
        <CardContent className="p-4 grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_2fr] gap-4 w-full">
            {/* Section 1 - Image */}
            <div className="flex items-center justify-center border rounded-md bg-muted p-2  h-48 ">
              <Image
                src={selectedPart ? selectedPart.image : "/placeholder.jpg"}
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
                  <Info className="h-4 w-4" />
                  <span>Description</span>
                </div>
                <EllipsedText maxWidth="max-w-[180px]" text={selectedPart?.description || "-" } />
              </div>
              <div className="flex justify-between items-center p-2 text-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  <span>Assembly part</span>
                </div>
                <Badge>
                  {selectedPart?.isAssemblable ? "Yes" : "No"}
                </Badge>
              </div>
              <div className="flex justify-between items-center p-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Sellable</span>
                </div>
                <Badge variant="secondary">{selectedPart?.isSellable ? "Yes" : "No"}</Badge>
              </div>
              <div className="flex justify-between items-center p-2 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Purchasable</span>
                </div>
                <Badge variant="outline">{selectedPart?.isPurchasable ? "Yes" : "No"}</Badge>
              </div>
            </div>

            {/* Section 3 */}
            <div className="border rounded-md divide-y h-full">
              <div className="flex justify-between items-center p-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Belongs To</span>
                </div>
                <Badge variant="secondary">{selectedPart?.owner}</Badge>
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
                  {selectedPart?.defaultLocation || "-"}
                </Button>
              </div>
              <div className="flex justify-between items-center p-2 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Responsible</span>
                </div>
                <Button variant="link" className="p-0 text-blue-600">
                  {selectedPart?.respnsibleUser || "-"}
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center border rounded-md p-3 col-span-2">
            <div className="flex items-center gap-2">
              <Grid className="h-4 w-4" />
              <span className="font-medium">Available Stock</span>
              <span className="text-2xl font-bold">140</span>
            </div>
          </div>
          <div className="flex justify-between items-center border rounded-md p-3 col-span-2">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-muted-foreground">
                  <th className="p-2">Location</th>
                  <th className="p-2">Stock</th>
                  <th className="p-2">Reserved</th>
                </tr>
              </thead>
              <tbody>
                {partsLocation.map((loc) => (
                  <LocationRow key={loc._id} location={loc} level={0} />
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>


    </div>
  )
  function LocationRow({ location, level }: { location: PartLocation; level: number }) {
    const [open, setOpen] = useState(false)
    const hasChildren = location.subLocations && location.subLocations.length > 0

    return (
      <>
        <tr className="border-t hover:bg-accent">
          <td className="p-2">
            <div className="flex items-center gap-1" style={{ paddingLeft: `${level * 16}px` }}>
              {hasChildren && (
                <button
                  onClick={() => setOpen(!open)}
                  className="p-1 hover:bg-muted rounded"
                >
                  {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>
              )}
              <span>{location.name}</span>
            </div>
          </td>
          <td className="p-2">{location.quantity}</td>
          <td className="p-2">{location.reserved}</td>
        </tr>

        {/* Render children as full rows, indented */}
        {open &&
          hasChildren &&
          location.subLocations!.map((sub) => (
            <LocationRow key={sub._id} location={sub} level={level + 1} />
          ))}
      </>
    )
  }
}
