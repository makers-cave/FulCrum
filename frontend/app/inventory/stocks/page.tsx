"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package } from "lucide-react";
import { useState } from "react"

const StockPage = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Parts Inventory
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Parts Tab */}
          <Tabs defaultValue="parts">
            <div className="flex items-center justify-between">
              <TabsList >
                <TabsTrigger key="parts" value="parts" className="px-4 rounded-t-sm">Parts</TabsTrigger>
                <TabsTrigger key="products" value="products" className="px-4 rounded-t-sm">Parts</TabsTrigger>
              </TabsList>
              <Input
                type="text"
                placeholder="Search..."
                className="ml-auto w-48"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <TabsContent value="parts">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Available Stock</TableHead>
                    <TableHead>Reserved Stock</TableHead>
                    <TableHead>Stock in transit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                </TableBody>
              </Table>
            </TabsContent>
            {/* Products Tab */}
            <TabsContent value="products">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Available Stock</TableHead>
                    <TableHead>Reserved Stock</TableHead>
                    <TableHead>In Production</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default StockPage