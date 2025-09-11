// app/products/page.tsx
"use client";

import React, { useMemo, useState } from "react";
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
import { Package, DollarSign, Box, List, PlusCircle } from "lucide-react";
import { Product } from "@/lib/types";
import { productsData } from "@/lib/data";

/**
 * Types
 */


/**
 * Sample data - replace with API calls later
 * Note: images referenced from /public/assets/*
 */

/**
 * Page component
 */
export default function ProductsPage() {
  const [products] = useState<Product[]>(productsData);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(products[0]?.id ?? null);

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

  const selectedProduct = products.find((p) => p.id === selectedProductId) ?? null;

  return (
    <div className="p-6 space-y-6">
      {/* Header row: Title + Search + Filters + Add */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <Package className="h-5 w-5" /> Products
          </h1>
          <p className="text-sm text-muted-foreground">Manage sellable products and their linked parts (BOM).</p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Input
            placeholder="Search product name or SKU..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="max-w-lg"
          />

          <Select onValueChange={(v) => setCategoryFilter(v)} value={categoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="default" className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" /> Add Product
          </Button>
        </div>
      </div>

      {/* Main grid: left = list, right = detail */}
      <div className="grid grid-cols-1 gap-4">
        {/* Left: Products table */}
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
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
                    key={p.id}
                    className={`cursor-pointer ${selectedProductId === p.id ? "bg-muted" : ""}`}
                    onClick={() => setSelectedProductId(p.id)}
                  >
                    <TableCell>
                      <div className="w-10 h-10 relative rounded overflow-hidden bg-muted">
                        <Image src={p.image} alt={p.name} fill className="object-contain" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{p.name}</span>
                        <span className="text-xs text-muted-foreground">{p.description?.slice(0, 70)}</span>
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

        {/* Right: Product detail */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Box className="h-4 w-4" /> Product Details
              </CardTitle>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => alert("Edit product (navigate)")}>
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => alert("Archive product")}>
                  Archive
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              {!selectedProduct ? (
                <div className="text-sm text-muted-foreground">Select a product to view details</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 items-start">
                  <div className="w-28 h-28 border rounded-md bg-muted p-2">
                    <Image src={selectedProduct.image} alt={selectedProduct.name} width={120} height={120} className="object-contain" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold">{selectedProduct.name}</h2>
                        <p className="text-sm text-muted-foreground">{selectedProduct.sku}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">
                          {selectedProduct.currency} {selectedProduct.price.toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground">Lead time: {selectedProduct.leadTimeDays ?? "-"} days</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-1">
                        <div className="text-sm text-muted-foreground">Category</div>
                        <div className="font-medium">{selectedProduct.category}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Stock</div>
                        <div className="font-medium">{selectedProduct.availableQty}</div>
                        <div className="text-xs text-muted-foreground">Reserved {selectedProduct.reservedQty}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Dimensions</div>
                        <div className="font-medium">{selectedProduct.dimensions ?? "-"}</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-muted-foreground">Description</div>
                      <div className="text-sm">
                        <EllipsedText text={selectedProduct.description ?? ""} maxWidth="max-w-[480px]" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Linked parts (BOM) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <List className="h-4 w-4" /> Linked Parts (BOM)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {!selectedProduct || !selectedProduct.linkedParts || selectedProduct.linkedParts.length === 0 ? (
                <div className="p-4 text-sm text-muted-foreground">No linked parts for this product</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Part</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Qty / Product</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedProduct.linkedParts!.map((pl) => (
                      <TableRow key={pl.id}>
                        <TableCell className="font-medium">{pl.partName}</TableCell>
                        <TableCell>{pl.partSku}</TableCell>
                        <TableCell>{pl.qtyPerProduct}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" onClick={() => alert(`Open part ${pl.partSku}`)}>
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="ghost" onClick={() => alert("Add part to BOM")}>
                Add Part
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
