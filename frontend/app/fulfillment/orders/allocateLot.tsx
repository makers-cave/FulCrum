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

import { Button } from "@/components/ui/button";
import { Lot, OrderLots } from "@/lib/types";
import { AlignHorizontalDistributeCenter, CircleX, Save} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

type AllocateLotDialogProps = {
  sku?: string;
  onUpdate: (lots: OrderLots[]) => void;
};

export default function AllocateLotDialog({
  sku,
  onUpdate,
}: AllocateLotDialogProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState(false);
  const handleUpdate = () => {
    setSelectedIds(new Set());
    setOpen(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <AlignHorizontalDistributeCenter className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Allocate Lots</DialogTitle>
        </DialogHeader>
        <Card>
          <CardHeader>
            <div className="flex flex-row justify-between items-center">
              <div className="text-lg font-medium">Requrired:</div>
              <div className="text-lg font-medium">Allocated:</div>
              </div>
          </CardHeader>
          <CardContent>
          <div className="grid gap-6">
          {/* Items Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className=""></TableHead>
                <TableHead className="w-1/2">Lot #</TableHead>
                <TableHead className="w-1/2">Available</TableHead>
                <TableHead className="w-1/2">Allocate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* {items.map((item) => ( */}
                <TableRow key={'abc'}>
                  <TableCell className="whitespace-nowrap">
                    <Checkbox checked={selectedIds.has('abc')} onCheckedChange={(checked) => {
                      const newSelectedIds = new Set(selectedIds);

                      if (checked) {
                        newSelectedIds.add('abc');
                      } else {
                        newSelectedIds.delete('abc');
                      }
                      setSelectedIds(newSelectedIds);
                    }} />
                  </TableCell>
                  <TableCell>
                    {"LOT-2024-002"}
                  </TableCell>
                  <TableCell>
                    {"25"}
                  </TableCell>
                  <TableCell>
                    <Input type="number" min={0} max={10} className="w-16 border rounded px-2 py-1" defaultValue={0} />
                  </TableCell>
                </TableRow>
              {/* ))} */}
            </TableBody>
          </Table>
          
          </div>
          </CardContent>
        </Card>
        <DialogFooter>
          <Button onClick={handleUpdate}><Save />Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
