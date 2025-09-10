"use client"

import Image from "next/image"
import { useState } from "react"
import { Edit, Trash2, Package, Filter, ReceiptText  } from "lucide-react"
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

import { Part } from "@/lib/types"
import { sampleParts } from "@/lib/data"

// ---------------- Page ----------------
export default function PartsPage() {
  const [parts, setParts] = useState<Part[]>(sampleParts)
  const [search, setSearch] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("All")
  const [filterStatus, setFilterStatus] = useState<string>("All")

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
                <TableRow key={part.id}>
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
                        setParts(parts.filter((p) => p.id !== part.id))
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
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ReceiptText className="h-5 w-5"  />
            Part detials
          </CardTitle>
        </CardHeader>
        <CardContent>
          
        </CardContent>
      </Card>
    </div>
  )
}
