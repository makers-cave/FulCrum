"use client";
import { NotFound } from "@/components/notFound";
import { SafeImage } from "@/components/SafeImage";
import { SelectEx } from "@/components/selectEx";
import { Spinner } from "@/components/spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { usePageHeader } from "@/contexts/PageHeaderContext";
import { getManufacturersshort } from "@/lib/services/manufacturerService";
import { getProduct, getProductCategories, getProductTypes } from "@/lib/services/productService";
import { Part, Product, SelectData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Atom, Cog, Container, DiamondPercent, DollarSign, FileCog, FolderCog, MapPin, PencilRuler, ReceiptText, ScanEye, User } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddItemsDialog from "@/components/addBOMDialogue";
import { bomItems } from "@/lib/data";

const ProductPage = () => {
  const { setHeader } = usePageHeader()

  useEffect(() => {
    setHeader("Edit Product", "Edit product details.")
  }, [setHeader])
  const params = useParams();
  const selectedProductId = params.productid as string;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const toggleField = (field: keyof Product) => {
    if (!product) return;
    setProduct((prev) => prev ? { ...prev, [field]: !prev[field] } : prev);
  };
  const handleChange = (field: keyof Product, value: string) => {
    setProduct((prev) => prev ? { ...prev, [field]: !prev[field] } : prev);
  };
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  // Handle selection from dialog
  const handleSelectItem = (items:SelectData[]) => {
    // setBom((prev) => [
    //   ...prev,
    //   {
    //     ...item,
    //     qty: 1, // default qty
    //     linkType: "Assembly", // default link type
    //   },
    // ]);
  };
const dialogTabs = [{ filterKey: "part", title: "Parts" }, { filterKey: "product", title: "Products" }]

  useEffect(() => {
    async function loadProducts() {
      try {
        const t = await getProduct(selectedProductId);
        if (t) {
          setProduct(t)
        } else {
          setError(true);
        }
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadProducts()
  }, [selectedProductId]);
  if (loading) {
    return <Spinner text="Loading product..." />
  }
  else if (error || !product) {
    return <NotFound entityName="Product" backHref="/inventory/products" backLabel="Go back to Products List" />
  } else {
    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ReceiptText className="h-5 w-5" />
              <Input className='text-2xl font-bold'
                defaultValue={product.name}
                autoFocus
              />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_2fr] gap-4 w-full">
              {/* Section 1 - Image */}
              <div className="flex items-center justify-center border rounded-md bg-muted p-2  h-48 ">
                <SafeImage
                  src={product?.image}
                  alt="product"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>

              {/* Section 2 */}
              <div className="border rounded-md divide-y h-full">
                <div className="flex justify-between items-center p-2 text-sm">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-sm font-medium">Description</label>
                    <Input
                      placeholder="This is a longer description"
                      className="w-full h-32"
                    />
                  </div>
                </div>

              </div>
              {/* Section 3 */}
              <div className="border rounded-md divide-y h-full">
                <div className="flex justify-between items-center p-2 text-sm" title={product.isAssembled
                  ? "This product is assembled in-house."
                  : "This product is bought assmebled/packed."}>
                  <div className="flex items-center gap-2">
                    <FolderCog className="h-4 w-4" />
                    <span>Is Assembled</span>
                  </div>
                  <Badge variant="outline"
                    className={cn(
                      "cursor-pointer",
                      product?.isAssembled ? "bg-gray-100 text-primary-foreground" : "bg-gray-600 text-secondary-foreground"
                    )}
                    onClick={() => toggleField("isAssembled")}>{product?.isAssembled ? "Yes" : "No"}</Badge>
                </div>
                <div className="flex justify-between items-center p-2 text-sm" title={product.isInidividualShip
                  ? "This product should be shipped individually, one in a shipping mailer."
                  : "This product can be combined with other products or can be shipped multiple in one shipping box."}>
                  <div className="flex items-center gap-2">
                    <Container className="h-4 w-4" />
                    <span>Should Ship individually</span>
                  </div>
                  <Badge variant="outline"
                    className={cn(
                      "cursor-pointer",
                      product.isInidividualShip ? "bg-gray-100 text-primary-foreground" : "bg-gray-600 text-secondary-foreground"
                    )}
                    onClick={() => toggleField("isInidividualShip")}>{product.isInidividualShip ? "Yes" : "No"}</Badge>
                </div>
                <div className="flex justify-between items-center p-2 text-sm" title={product.canBeAssembled
                  ? "This product can used as a part in making other product."
                  : "This product cannot be used into other product."}>
                  <div className="flex items-center gap-2">
                    <FileCog className="h-4 w-4" />
                    <span>Can be assembled into other product</span>
                  </div>
                  <Badge variant="outline"
                    className={cn(
                      "cursor-pointer",
                      product.canBeAssembled ? "bg-gray-100 text-primary-foreground" : "bg-gray-600 text-secondary-foreground"
                    )}
                    onClick={() => toggleField("canBeAssembled")}>{product.canBeAssembled ? "Yes" : "No"}</Badge>
                </div>
                <div className="flex justify-between items-center p-2 text-sm">
                  <div className="flex items-center gap-2">
                    <DiamondPercent className="h-4 w-4" />
                    <span>Product Type</span>
                  </div>
                  <SelectEx
                    data={getProductTypes()}
                    value={product.productType || null}
                    onDataChange={(value) => setProduct({ ...product, productType: value || undefined })}
                    placeholder="Product Type..."

                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Attributes Section */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ScanEye className="h-5 w-5" /> Identification & Classification
            </CardTitle>
          </CardHeader>
          {/* Identification Section */}
          <CardContent >
            <div className="py-1">
              <label className="text-sm font-medium">Model/Version</label>
              <Input value={product.model} onChange={(e) =>
                setProduct({ ...product, model: e.target.value }) // ✅ updates object on change
              }
                placeholder="Enter Model, version or revision" />
            </div>
            <div className="py-1">
              <label className="text-sm font-medium">SKU</label>
              <Input value={product.sku} onChange={(e) =>
                setProduct({ ...product, sku: e.target.value }) // ✅ updates object on change
              }
                placeholder="Enter SKU" />
            </div>
            <div className="py-1">
              <label className="text-sm font-medium">MPN (Manufacturer product Number)</label>
              <Input value={product.mpn} onChange={(e) =>
                setProduct({ ...product, mpn: e.target.value }) // ✅ updates object on change
              }
                placeholder="Enter MPN" />
            </div>
            <div className="py-1">
              <label className="text-sm font-medium">UPC (Universal Product Code)</label>
              <Input value={product.upc} onChange={(e) =>
                setProduct({ ...product, upc: e.target.value }) // ✅ updates object on change
              }
                placeholder="Enter UPC" />
            </div>
            <div className="py-1">
              <label className="text-sm font-medium">Manufacturer</label>
              <SelectEx
                data={getManufacturersshort()}
                value={product.manufacturer || null}
                onDataChange={(value) => setProduct({ ...product, manufacturer: value || undefined })}
                placeholder="Select manufacturer..."
                className="w-full"
              />
            </div>
            <div className="py-1">
              <label className="text-sm font-medium">Category</label>
              <SelectEx
                data={getProductCategories()}
                value={product.category || null}
                onDataChange={(value) => setProduct({ ...product, category: value || undefined })}
                placeholder="Select Category..."
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>
        {/* BOM Section */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ReceiptText className="h-4 w-4" />
              Bill of Material (BOM)
            </CardTitle>
            <div className="flex items-center gap-2">
              {/* <Button variant="outline" size="sm" onClick={() => setOpenDialog(true)}>
                <PencilRuler />Add items
              </Button> */}
              <AddItemsDialog items={bomItems} onAdd={handleSelectItem} tabs={dialogTabs} />
            </div>
          </CardHeader>
          <CardContent>

          </CardContent>
        </Card>
        {/* <AddItemsDialog items={bomItems} onAdd={handleSelectItem} tabs={dialogTabs} /> */}
        </div>
    )
  }
}

export default ProductPage