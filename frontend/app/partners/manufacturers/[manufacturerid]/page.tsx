"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { manufacturersData } from "@/lib/data";
import { Manufacturer } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Building2, DollarSign, Factory, ImageIcon, Info, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"
import { getManufacturer, getDefaultManufacturer } from "@/lib/services/manufacturerService";
export default function ManufacturerPage() {
  const params = useParams();
  const selectedCustId = params.manufacturerid as string;
  const [editingField, setEditingField] = useState<string | null>(null);
  
  const [manufacturer, setManufacturer] = useState<Manufacturer>(getDefaultManufacturer());
  useEffect(() => {
    async function loadManufacturer() {
      const c = await getManufacturer(selectedCustId);
      if (c) {
        setManufacturer(c)
      } else {
        setManufacturer(getDefaultManufacturer())
      }
    }
    if (selectedCustId) {
      loadManufacturer()
    }
  }, [selectedCustId]);
  const toggleField = (field: keyof Manufacturer) => {
    setManufacturer((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = (field: keyof Manufacturer, value: string) => {
    setManufacturer((prev) => ({ ...prev, [field]: value }));
    setEditingField(null);
  };
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      {editingField === "name" ? (
        <Input className='text-2xl font-bold'
          defaultValue={manufacturer?.name}
          onBlur={(e) => handleSave("name", e.target.value)}
          autoFocus
        />
      ) : (
        <div
          className="cursor-pointer text-2xl font-bold"
          onClick={() => setEditingField("name")}
        >
          <h1>{manufacturer?.name}</h1>
        </div>
      )}
      <div className="grid grid-cols-3 gap-4">
        {/* Left: Avatar */}
        <Card className="col-span-1 flex items-center justify-center h-48">
          {manufacturer?.avatar ? (
            <img
              src={manufacturer.avatar}
              alt="avatar"
              className="h-full w-full object-cover rounded-md"
            />
          ) : (
            <ImageIcon className="h-12 w-12 text-muted-foreground" />
          )}
        </Card>

        {/* Middle: Info fields */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Description */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Info className="h-4 w-4" />
                Description
              </div>
              {editingField === "description" ? (
                <Input
                  defaultValue={manufacturer?.description}
                  onBlur={(e) => handleSave("description", e.target.value)}
                  autoFocus
                />
              ) : (
                <div
                  className="cursor-pointer text-sm"
                  onClick={() => setEditingField("description")}
                >
                  {manufacturer?.description}
                </div>
              )}
            </div>

            {/* Manufacturer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Factory className="h-4 w-4" />
                Manufacturer
              </div>
              <Badge
                className={cn(
                  "cursor-pointer",
                  manufacturer.isAlsoManufacturer ? "bg-green-600" : "bg-red-600"
                )}
                onClick={() => toggleField("isAlsoManufacturer")}
              >
                {manufacturer.isAlsoManufacturer ? "Yes" : "No"}
              </Badge>
            </div>

            {/* Supplier */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Building2 className="h-4 w-4" />
                Supplier
              </div>
              <Badge
                className={cn(
                  "cursor-pointer",
                  manufacturer.isAlsoSupplier ? "bg-green-600" : "bg-red-600"
                )}
                onClick={() => toggleField("isAlsoSupplier")}
              >
                {manufacturer.isAlsoSupplier ? "Yes" : "No"}
              </Badge>
            </div>

            {/* Manufacturer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <User className="h-4 w-4" />
                Manufacturer
              </div>
              <Badge
                className={cn(
                  "cursor-pointer",
                  manufacturer.isAlsoCustomer ? "bg-green-600" : "bg-red-600"
                )}
                onClick={() => toggleField("isAlsoCustomer")}
              >
                {manufacturer.isAlsoCustomer ? "Yes" : "No"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Right: Currency */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Finance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <DollarSign className="h-4 w-4" />
                Currency
              </div>
              {editingField === "currency" ? (
                <Input
                  defaultValue={manufacturer.currency}
                  // onBlur={(e) => handleSave("currency", e.target.value)}
                  autoFocus
                />
              ) : (
                <div
                  className="cursor-pointer text-sm"
                  onClick={() => setEditingField("currency")}
                >
                  {manufacturer.currency}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 🔹 Additional editable fields below */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
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

  );
}