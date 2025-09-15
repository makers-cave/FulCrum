// app/products/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { EllipsedText } from "@/components/EllipsedText"; // if you created it earlier
import { Package, DollarSign, Box, List, PlusCircle, Filter, PencilRuler, Trash2, Info, CalendarPlus, Grid, Edit } from "lucide-react";
import { Product } from "@/lib/types";
import { productsData } from "@/lib/data";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { SafeImage } from "@/components/SafeImage";
import { usePageHeader } from "@/contexts/PageHeaderContext";
import Link from "next/link";


export default function ProductsPage() {
  const { setHeader } = usePageHeader()

  useEffect(() => {
    setHeader("Products", "View your sellable items")
  }, [setHeader])

  const [products] = useState<Product[]>(productsData);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(products[0]?._id ?? null);

  const categories = useMemo(() => {
    const s = new Set<string>();
    products.forEach((p) => s.add(p.category));
    return ["All", ...Array.from(s)];
  }, [products]);

  const visible = products.filter((p) => {
    const matchesQuery =
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.sku.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;
    return matchesQuery && matchesCategory;
  });

  const selectedProduct = products.find((p) => p._id === selectedProductId) ?? null;

  return (
    <div className="p-6 space-y-6">
      {/* Header row: Search + Filters + Add */}
      <div className="flex items-center gap-2 justify-end">
        <Input
          placeholder="Search product name or SKU..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-lg"
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
                Narrow down your product list by category or stock status.
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

        <Button variant="default" className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" /> Add
        </Button>
      </div>
      {/* Products Table */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Products Inventory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Available</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.map((p) => (
                <TableRow
                  key={p._id}
                  className={`cursor-pointer ${selectedProductId === p._id ? "bg-muted" : ""}`}
                  onClick={() => setSelectedProductId(p._id)}
                >
                  <TableCell>
                    <div className="w-10 h-10 relative rounded overflow-hidden bg-muted">
                      <Image src={p.image} alt={p.name} fill className="object-contain" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{p.name}</span>
                      {/* <span className="text-xs text-muted-foreground">{p.description?.slice(0, 40)}</span> */}
                    </div>
                  </TableCell>
                  <TableCell>{p.sku}</TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell>{p.availableQty}</TableCell>
                  <TableCell>
                    {p.currency} {p.price.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={p.status === "Published" ? "secondary" : p.status === "Draft" ? "outline" : "destructive"}>
                      {p.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {/* Product details */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Box className="h-4 w-4" /> {selectedProduct ? selectedProduct.name : "Select a product"}
          </CardTitle>

          <div className="flex items-center gap-2">
            {selectedProduct != null && <div className="flex items-center gap-2">
            <Button variant="outline" asChild size="sm">
              <Link href={`/inventory/products/${selectedProduct?._id}`}>
              <PencilRuler />Edit
              </Link>
            </Button>
            </div>}
            <Button variant="destructive" size="sm" onClick={() => alert("Archive product")}>
              <Trash2 />Archive
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-4 grid gap-4">

          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_2fr] gap-4 w-full">
            {/* Section 1 - Image */}
            <div className="flex items-center justify-center border rounded-md bg-muted p-2  h-48">
              <SafeImage src={selectedProduct?.image} alt={selectedProduct?.name} width={120} height={120} className="object-contain" />
            </div>
            {/* Section 2 */}
            <div className="border rounded-md divide-y h-full">
              <div className="flex justify-between items-center p-2 text-sm">
                <div className="flex items-center gap-2">
                  <span>Category</span>
                </div>
                <Badge>
                  {selectedProduct?.category}
                </Badge>
              </div>
              <div className="flex justify-between items-center p-2 text-sm">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  <span>Price</span>
                </div>
                <span className="wrap-break-word pl-2">{selectedProduct?.currency} {selectedProduct?.price.toFixed(2)} </span>
              </div>
              <div className="flex justify-between items-center p-2 text-sm">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  <span>Shipping meta</span>
                </div>
                <span className="wrap-break-word pl-2">{selectedProduct?.dimensions || "-"} </span>
              </div>
              <div className="flex justify-between items-center p-2 text-sm">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  <span>Description</span>
                </div>
                <span className="wrap-break-word pl-2">{selectedProduct?.description || "-"} </span>
              </div>
            </div>
            {/* Section 3 */}
            <div className="border rounded-md divide-y h-full">
              <div className="flex justify-between items-center p-2 text-sm">
                <div className="flex items-center gap-2">
                  <List className="h-4 w-4" />
                  <span>Ready Qty</span>
                </div>
                <span>{selectedProduct?.availableQty}</span>
              </div>
              <div className="flex justify-between items-center p-2 text-sm">
                <div className="flex items-center gap-2">
                  <List className="h-4 w-4" />
                  <span>Reserved Qty</span>
                </div>
                <span>{selectedProduct?.reservedQty}</span>
              </div>
              <div className="flex justify-between items-center p-2 text-sm">
                <div className="flex items-center gap-2">
                  <CalendarPlus className="h-4 w-4" />
                  <span>Lead Time</span>
                </div>
                <span>{selectedProduct?.leadTimeDays} days per {selectedProduct?.bathchPerWeek} pcs</span>
              </div>
              <div className="flex justify-between items-center p-2 text-sm">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  <span>Status</span>
                </div>
                <Badge variant={selectedProduct?.status === "Published" ? "secondary" : selectedProduct?.status === "Draft" ? "outline" : "destructive"}>
                  {selectedProduct?.status}
                </Badge>
              </div>
            </div>
          </div>
          <div>Bill of Materials (BOM)</div>
          <div className="flex justify-between items-center border rounded-md p-3 md:col-span-[1fr,2fr,2fr]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Part</TableHead>
                  <TableHead>Qty/Product</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>LinkType</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedProduct?.linkedParts?.map((part) => (
                  <TableRow>
                    <TableCell>
                      <div className="w-10 h-10 relative rounded overflow-hidden bg-muted">
                        <SafeImage src={part.image} alt={part.image} fill className="object-contain" />
                      </div>
                    </TableCell>
                    <TableCell>{part.partName}</TableCell>
                    <TableCell>{part.qtyPerProduct}</TableCell>
                    <TableCell>{part.stock}</TableCell>
                    <TableCell>
                      <Badge className={part.linkType == "Content" || part.linkType == "Assembly" ? "bg-green-200" : part.linkType == "Packaging" ? "bg-amber-200" : "bg-gray-200"}>{part.linkType}</Badge>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div >

  );
}
