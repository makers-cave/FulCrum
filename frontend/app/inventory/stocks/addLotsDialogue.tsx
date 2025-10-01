"use client";

import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
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
import { Lot, Order, SelectData } from "@/lib/types";
import { AlignHorizontalDistributeCenter, CircleX, PencilRuler, Save, Search, Settings } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SafeImage } from "@/components/SafeImage";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";



type AddLotDialogDialogProps = {
  order: Order;
  onUpdate: (updateOrder: Order) => void;
};

export default function AddLotDialog({
  order,
  onUpdate,
}: AddLotDialogDialogProps) {
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

  const handleUpdate = () => {
    setSelectedIds(new Set());
    setOpen(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <AlignHorizontalDistributeCenter className="h-4 w-4" />Allocate Lots
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Allocate Lots</DialogTitle>
        </DialogHeader>
        <Card>
          {/* Header */}
          <CardHeader className="flex flex-row items-center justify-end">
            <div className="flex items-center gap-2">
              {/* Warehouse Selector */}
              <Select >
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Select Warehouse" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Houston">Houston</SelectItem>
                  <SelectItem value="SanFrancisco">San Francisco</SelectItem>
                  <SelectItem value="NewYork">New York</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <div className="grid grid-cols-2 gap-6">
          {/* Items Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2">Item</TableHead>
                <TableHead className="w-1/2">Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* {items.map((item) => ( */}
                <TableRow key={'abc'}>
                  <TableCell>
                    <div className="font-medium">{"item.name"}</div>
                    <div className="text-sm text-muted-foreground">
                      Items: {"item.qty"}
                    </div>
                  </TableCell>
                  <TableCell>
                    {/* empty, just showing separation */}
                  </TableCell>
                </TableRow>
              {/* ))} */}
            </TableBody>
          </Table>
          {/* Lots Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2">Lot</TableHead>
                <TableHead className="w-1/2">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* {items.map((item) => ( */}
                <TableRow key={"item.id"}>
                  <TableCell>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Lot" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* {item.lots.map((lot) => ( */}
                          <SelectItem key={"lot"} value={"lot"}>
                            {"lot"}
                          </SelectItem>
                        {/* ))} */}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Allocate
                      </Button>
                      <Button size="sm">Auto</Button>
                    </div>
                  </TableCell>
                </TableRow>
              {/* ))} */}
            </TableBody>
          </Table>
          </div>
        </Card>
        <DialogFooter>
          <DialogClose asChild >
            <Button variant="outline">
              <CircleX />Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleUpdate}><Save />Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
