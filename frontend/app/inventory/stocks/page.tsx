"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePageHeader } from "@/contexts/PageHeaderContext";
import { Package, PencilRuler, PlusCircle, SquareParking } from "lucide-react";
import { useEffect, useState } from "react"
import { lotsData, partsStock } from "@/lib/data";
import { SafeImage } from "@/components/SafeImage";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AddLotDialog from "./addLotsDialogue";
import { Lot } from "@/lib/types";

const StockPage = () => {
  const { setHeader } = usePageHeader();
  const [selectedPart, setSelectedPart] = useState("");

  useEffect(() => {
    setHeader("Stock Management", "View part/product stock and add edit lots")
  }, [setHeader])
  const [search, setSearch] = useState("");
  const [hideStale, setHideStale] = useState(true);
  const handleLotUpdate = (updatedLot: Lot) => {
    console.log("Updated Lot:", updatedLot);

  }
  return (
    <div className="p-6 space-y-6">
      {/* Parts and Product List */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Parts Inventory
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Parts Tab */}
          <Tabs defaultValue="parts" onValueChange={() => setSelectedPart("")}>
            <div className="flex items-center justify-between">
              <TabsList >
                <TabsTrigger key="parts" value="parts" className="px-4 rounded-t-sm">Parts</TabsTrigger>
                <TabsTrigger key="products" value="products" className="px-4 rounded-t-sm">Products</TabsTrigger>
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
                onCheckedChange={(checked) => setHideStale(checked as boolean)} />
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
                  {partsStock.filter(i => i.type == "part").map((partStock) => (
                    <TableRow key={partStock._id}
                      className={`cursor-pointer ${selectedPart === partStock._id ? "bg-muted" : ""}`}
                      onClick={() => setSelectedPart(partStock._id)}>
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
                  {partsStock.filter(i => i.type == "product").map((productStock) => (
                    <TableRow key={productStock._id} className={`cursor-pointer ${selectedPart === productStock._id ? "bg-muted" : ""}`}
                      onClick={() => setSelectedPart(productStock._id)}>
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
      {/* Lots list */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <SquareParking className="h-5 w-5" />
            Lots

          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="default" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" /> Add
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lot #</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Received</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lotsData.filter(i => i.part == selectedPart || i.product == selectedPart).map((lot) => (
                <TableRow key={lot._id}>
                  <TableCell>
                    {lot._id}
                  </TableCell>
                  <TableCell>{lot.supplierBatchNumber}</TableCell>
                  <TableCell>{lot.location?.image}</TableCell>
                  <TableCell>{lot.quantity}</TableCell>
                  <TableCell>{lot.receivedDate?.toDateString()}</TableCell>
                  <TableCell>{lot.expiryDate?.toDateString()}</TableCell>
                  <TableCell>
                    <Button variant="outline" asChild size="sm">
                      <Link href={`/inventory/lots/lot-001`}>
                        <PencilRuler />Edit
                      </Link>
                    </Button>
                    {/* <AddLotDialog lot={lot} onUpdate={handleLotUpdate} /> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default StockPage