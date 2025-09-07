"use client";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {sampleTenant} from '@/lib/data'
import { Tenant, TenantPageProps } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Building2, DollarSign, Factory, ImageIcon, Info, User } from 'lucide-react';
import { useState } from 'react';

export default async function TenantPage ({ params }: TenantPageProps) {
    // const tenant = await getTenant(params.tenantId);
    const [editingField, setEditingField] = useState<string | null>(null);
    const tenant = {
        _id: "1",
        name: "DelightLoop INC",
        description: "This is description",
        isAlsoManufacturer: false,
        isAlsoSupplier: true,
        isAlsoCustomer: true,
        currency: "USD",
        avatar: "",
      }
    // const toggleField = (field: keyof Tenant) => {
    //   setTenant((prev) => ({ ...prev, [field]: !prev[field] }));
    // };
  
    // const handleSave = (field: keyof Tenant, value: string) => {
    //   setTenant((prev) => ({ ...prev, [field]: value }));
    //   setEditingField(null);
    // };
  return (
    <div className="p-6 space-y-6">
    {/* Header */}
    <h1 className="text-2xl font-bold">
      Company: <span className="text-primary">{tenant.name}</span>
    </h1>

    <div className="grid grid-cols-3 gap-4">
      {/* Left: Avatar */}
      <Card className="col-span-1 flex items-center justify-center h-48">
        {tenant?.avatar ? (
          <img
            src={tenant.avatar}
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
                defaultValue={tenant?.description}
                // onBlur={(e) => handleSave("description", e.target.value)}
                autoFocus
              />
            ) : (
              <div
                className="cursor-pointer text-sm"
                onClick={() => setEditingField("description")}
              >
                {tenant?.description}
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
                tenant.isAlsoManufacturer ? "bg-green-600" : "bg-red-600"
              )}
            //   onClick={() => toggleField("manufacturer")}
            >
              {tenant.isAlsoManufacturer ? "Yes" : "No"}
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
                tenant.isAlsoSupplier ? "bg-green-600" : "bg-red-600"
              )}
            //   onClick={() => toggleField("supplier")}
            >
              {tenant.isAlsoSupplier ? "Yes" : "No"}
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
                tenant.isAlsoCustomer ? "bg-green-600" : "bg-red-600"
              )}
            //   onClick={() => toggleField("customer")}
            >
              {tenant.isAlsoCustomer ? "Yes" : "No"}
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
                defaultValue={tenant.currency}
                // onBlur={(e) => handleSave("currency", e.target.value)}
                autoFocus
              />
            ) : (
              <div
                className="cursor-pointer text-sm"
                onClick={() => setEditingField("currency")}
              >
                {tenant.currency}
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
