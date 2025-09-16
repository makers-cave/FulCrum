"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type Item = {
  id: string;
  name: string;
  sku: string;
};

type AddItemsDialogProps = {
  parts: Item[];
  products: Item[];
  onAdd: (selectedItems: Item[]) => void;
};

export default function AssBOMDialogue({
  parts,
  products,
  onAdd,
}: AddItemsDialogProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState(false);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const handleAdd = () => {
    const allItems = [...parts, ...products];
    const selectedItems = allItems.filter((i) => selectedIds.has(i.id));
    onAdd(selectedItems);
    setSelectedIds(new Set());
    setOpen(false);
  };

  const renderTable = (items: Item[]) => (
    <table className="w-full text-sm border">
      <thead>
        <tr className="border-b">
          <th className="p-2 text-left">Select</th>
          <th className="p-2 text-left">Name</th>
          <th className="p-2 text-left">SKU</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id} className="border-b">
            <td className="p-2">
              <Checkbox
                checked={selectedIds.has(item.id)}
                onCheckedChange={() => toggleSelection(item.id)}
              />
            </td>
            <td className="p-2">{item.name}</td>
            <td className="p-2">{item.sku}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Add Items</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Select Items to Add</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="parts">
          <TabsList>
            <TabsTrigger value="parts">Parts</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>
          <TabsContent value="parts">{renderTable(parts)}</TabsContent>
          <TabsContent value="products">{renderTable(products)}</TabsContent>
        </Tabs>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAdd}>Add Selected</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
