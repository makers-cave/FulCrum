"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { customersData } from "@/lib/data";
import { Customer } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Building2, DollarSign, Factory, ImageIcon, Info, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"
import { getCustomer, getDefaultCustomer } from "@/lib/services/customerService";
import { usePageHeader } from "@/contexts/PageHeaderContext";
export default function CustomerPage() {
  const { setHeader } = usePageHeader()

  useEffect(() => {
    setHeader("Edit Customer", "Edit the Selected Customer.")
  }, [setHeader])
  const params = useParams();
  const selectedCustId = params.custid as string;
  const [editingField, setEditingField] = useState<string | null>(null);

  const [customer, setCustomer] = useState<Customer>(getDefaultCustomer());
  useEffect(() => {
    async function loadCustomer() {
      const c = await getCustomer(selectedCustId);
      if (c) {
        setCustomer(c)
      } else {
        setCustomer(getDefaultCustomer())
      }
    }
    if (selectedCustId) {
      loadCustomer()
    }
  }, [selectedCustId]);
  const toggleField = (field: keyof Customer) => {
    setCustomer((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = (field: keyof Customer, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
    setEditingField(null);
  };
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      {editingField === "name" ? (
        <Input className='text-2xl font-bold'
          defaultValue={customer?.name}
          onBlur={(e) => handleSave("name", e.target.value)}
          autoFocus
        />
      ) : (
        <div
          className="cursor-pointer text-2xl font-bold"
          onClick={() => setEditingField("name")}
        >
          <h1>{customer?.name}</h1>
        </div>
      )}
      <div className="grid grid-cols-3 gap-4">
        {/* Left: Avatar */}
        <Card className="col-span-1 flex items-center justify-center h-48">
          {customer?.avatar ? (
            <img
              src={customer.avatar}
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
                  defaultValue={customer?.description}
                  onBlur={(e) => handleSave("description", e.target.value)}
                  autoFocus
                />
              ) : (
                <div
                  className="cursor-pointer text-sm"
                  onClick={() => setEditingField("description")}
                >
                  {customer?.description}
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
                  customer.isAlsoManufacturer ? "bg-green-600" : "bg-red-600"
                )}
                onClick={() => toggleField("isAlsoManufacturer")}
              >
                {customer.isAlsoManufacturer ? "Yes" : "No"}
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
                  customer.isAlsoSupplier ? "bg-green-600" : "bg-red-600"
                )}
                onClick={() => toggleField("isAlsoSupplier")}
              >
                {customer.isAlsoSupplier ? "Yes" : "No"}
              </Badge>
            </div>

            {/* Customer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <User className="h-4 w-4" />
                Customer
              </div>
              <Badge
                className={cn(
                  "cursor-pointer",
                  customer.isAlsoCustomer ? "bg-green-600" : "bg-red-600"
                )}
                onClick={() => toggleField("isAlsoCustomer")}
              >
                {customer.isAlsoCustomer ? "Yes" : "No"}
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
                  defaultValue={customer.currency}
                  // onBlur={(e) => handleSave("currency", e.target.value)}
                  autoFocus
                />
              ) : (
                <div
                  className="cursor-pointer text-sm"
                  onClick={() => setEditingField("currency")}
                >
                  {customer.currency}
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