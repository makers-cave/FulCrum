"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePageHeader } from "@/contexts/PageHeaderContext";
import { Package } from "lucide-react";
import { useEffect, useState } from "react"
import { partsStock, productsStock } from "@/lib/data";
import { SafeImage } from "@/components/SafeImage";

const StockPage = () => {
    const { setHeader } = usePageHeader()
  
    useEffect(() => {
      setHeader("Stock Management", "View part/product stock and add edit lots")
    }, [setHeader])
  const [search, setSearch] = useState("");
  const [hideStale, setHideStale] = useState(true);
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
              <Checkbox className="ml-2"
              id="hideStale"
              checked={hideStale}
              onCheckedChange={(checked) => setHideStale(checked as boolean)}/>
              <label htmlFor="hideStale" className="ml-1" title="Hide the products or part which are 0 stocks and not in transit.">Hide stale</label>
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
                  {partsStock.map((partStock) => (
                    <TableRow>
                      <TableCell>
                        <div className="w-10 h-10 relative rounded overflow-hidden bg-muted">
                          <SafeImage src={partStock.image} alt={partStock.image} fill className="object-contain" />
                        </div>
                      </TableCell>
                      <TableCell>{partStock.name}</TableCell>
                      <TableCell>{partStock.sku}</TableCell>
                      <TableCell>{partStock.category}</TableCell>
                      <TableCell>{partStock.available}</TableCell>
                      <TableCell>{partStock.reserved ?? 0}</TableCell>
                      <TableCell>{partStock.intransit ?? 0}</TableCell>
                    </TableRow>
                  ))}
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
                    <TableHead>In Transit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productsStock.map((productStock) => (
                    <TableRow>
                      <TableCell>
                        <div className="w-10 h-10 relative rounded overflow-hidden bg-muted">
                          <SafeImage src={productStock.image} alt={productStock.image} fill className="object-contain" />
                        </div>
                      </TableCell>
                      <TableCell>{productStock.name}</TableCell>
                      <TableCell>{productStock.sku}</TableCell>
                      <TableCell>{productStock.category}</TableCell>
                      <TableCell>{productStock.available}</TableCell>
                      <TableCell>{productStock.reserved ?? 0}</TableCell>
                      <TableCell>{productStock.inproduction ?? 0}</TableCell>
                      <TableCell>{productStock.intransit ?? 0}</TableCell>
                    </TableRow>
                  ))}
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