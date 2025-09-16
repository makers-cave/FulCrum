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
import { SelectData } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { PencilRuler } from "lucide-react";
import { SafeImage } from "./SafeImage";
import { Input } from "./ui/input";


type AddItemsDialogProps = {
  items: SelectData[];
  tabs: { filterKey: string, title: string }[]
  onAdd: (selectedItems: SelectData[]) => void;
};

export default function AddItemsDialog({
  items,
  tabs,
  onAdd,
}: AddItemsDialogProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const handleAdd = () => {
    const allItems = [...items];
    const selectedItems = allItems.filter((i) => selectedIds.has(i._id));
    onAdd(selectedItems);
    setSelectedIds(new Set());
    setOpen(false);
  };
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku?.toLowerCase().includes(search.toLowerCase())
    return matchesSearch
  })
  const renderTable = (items: SelectData[]) => (
    <div className="h-50 overflow-y-auto relative">
      <Table className="w-full text-sm border sticky top-0 shadow-sm">
        <TableHeader>
          <TableRow>
            <TableHead className="p-2 text-left">Select</TableHead>
            <TableHead className="p-2 text-left">Image</TableHead>
            <TableHead className="p-2 text-left">Name</TableHead>
            <TableHead className="p-2 text-left">SKU</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item._id} >
              <TableCell className="p-2">
                <Checkbox
                  checked={selectedIds.has(item._id)}
                  onCheckedChange={() => toggleSelection(item._id)}
                />
              </TableCell>
              <TableCell className="p-2">
                <SafeImage width={40} height={40} className="rounded" src={item.image} alt={item.name} />
              </TableCell>
              <TableCell className="p-2">{item.name}</TableCell>
              <TableCell className="p-2">{item.sku}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <PencilRuler />Add items
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Select Items to Add</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="parts">
          <div className="flex items-center justify-between">
            <TabsList >
              {tabs.map((tab) => (
                <TabsTrigger className="px-4 rounded-t-sm" key={tab.filterKey} value={tab.filterKey}>{tab.title}</TabsTrigger>
              ))}
            </TabsList>
            <Input
              type="text"
              placeholder="Search..."
              className="ml-auto w-48"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {tabs.map((tab) => (
            <TabsContent value={tab.filterKey}>{renderTable(filteredItems.filter(i => i.filterKey === tab.filterKey))}</TabsContent>
          ))}
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
