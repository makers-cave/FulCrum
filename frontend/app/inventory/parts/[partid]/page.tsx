"use client"
import { SafeImage } from "@/components/SafeImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { usePageHeader } from "@/contexts/PageHeaderContext";
import { partsData } from "@/lib/data";
import { getDefaultPart, getPart } from "@/lib/services/partsService";
import { Part } from "@/lib/types";
import { Box, Calendar, CalendarPlus, DollarSign, Grid, Info, List, MapPin, PencilRuler, ReceiptText, Table, Trash2, User } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const PartPage = () => {
  const { setHeader } = usePageHeader()
  useEffect(() => {
    setHeader("Edit Part", "Edit the Part.");
  }, [setHeader])
  const params = useParams();
  const selectedPartId = params.partid as string;
 
  const [part, setPart] = useState<Part>(getDefaultPart());
  useEffect(() => {
    async function loadParts() {
      const t = await getPart(selectedPartId);
      if (t) {
        setPart(t)
      } else {
        setPart(getDefaultPart())
      }
    }
    if (selectedPartId) {
      loadParts()
    }
  }, [selectedPartId]);
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ReceiptText className="h-5 w-5" />
            {part ? part.name : "Select a part to view details"}
          </CardTitle>

        </CardHeader>
        <CardContent className="p-4 grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_2fr] gap-4 w-full">
            {/* Section 1 - Image */}
            <div className="flex items-center justify-center border rounded-md bg-muted p-2  h-48 ">
              <SafeImage
                src={part?.image}
                alt="Part"
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
                    className="w-full h-32" // optional: h-24 to give it more height like a textarea
                  />
                </div>
              </div>

            </div>
            {/* Section 3 */}
            <div className="border rounded-md divide-y h-full">
            <div className="flex justify-between items-center p-2 text-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  <span>Assembly part</span>
                </div>
                <Badge>
                  {part?.isAssemblable ? "Yes" : "No"}
                </Badge>
              </div>
              <div className="flex justify-between items-center p-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Sellable</span>
                </div>
                <Badge variant="secondary">{part?.isSellable ? "Yes" : "No"}</Badge>
              </div>
              <div className="flex justify-between items-center p-2 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Purchasable</span>
                </div>
                <Badge variant="outline">{part?.isPurchasable ? "Yes" : "No"}</Badge>
              </div>
            </div>
          </div>

        </CardContent>
      </Card>

      {/* 🔹 Additional editable fields below */}
      <Card>
        <CardHeader>
          <CardTitle>Identification & Classification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">

          {/* 
SKU

Unique identifier for the part.

Part Name / Description — Readable name and a longer description.

Category / Subcategory — For grouping parts (e.g., Electronics > Resistors).

Brand / Manufacturer

Manufacturer Part Number (MPN) — Supplier-side part number.

Barcode / QR code / RFID tag

Image(s) — For visual identification.

Model / Version / Revision — Especially for technical parts. */}
          <div>
            <label className="text-sm font-medium">Website</label>
            <Input placeholder="https://example.com" />
          </div>
          <div>
            <label className="text-sm font-medium">Contact Person</label>
            <Input placeholder="John Doe" />
          </div>
          <div>
            <label className="text-sm font-medium">Notes</label>
            <Input placeholder="Internal notes..." />
          </div>
          <Button className="mt-4">Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default PartPage