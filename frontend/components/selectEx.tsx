"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectData } from "@/lib/types";
import React from "react";

interface SelectExProps {
  data: SelectData[];
  value: SelectData | null;
  onDataChange: (data: SelectData | null) => void;
  placeholder?: string;
  className?: string;
}

function findSelectDataById(data: SelectData[], id: string): SelectData | null {
  const found = data.find((m) => m._id === id);
  if (found) return found;

  for (const item of data) {
    if (item.children && item.children.length > 0) {
      const found = findSelectDataById(item.children, id);
      if (found) {
        return found;
      }
    }
  }
  
  return null;
}
export function SelectEx({
  data: data,
  value: value,
  onDataChange: onSelectDataChange,
  placeholder = "Select item...",
  className,
}: SelectExProps) {
  const handleValueChange = (value: string) => {
    if (value === "null") {
      onSelectDataChange(null);
    } else {
      const selectedItem =findSelectDataById(data, value);// data.find((m) => m._id === value);
      onSelectDataChange(selectedItem || null);
    }
  };

  return (
    <Select
      value={value?._id || "null"}
      onValueChange={handleValueChange}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder}>
          {value?.name || placeholder}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="null">-</SelectItem>
        <SelectChildRow data ={data} level={0} />
      </SelectContent>
    </Select>
  );
}
function SelectChildRow({ data, level }: { data: SelectData[] | undefined; level: number }) {
  if (!data) return null;
  return data.map((child) => (
    <React.Fragment key={child._id}>
      <SelectItem value={child._id} style={{ paddingLeft: `${level * 16}px` }}>
        {child.name}
      </SelectItem>
      <SelectChildRow data={child.children} level={level + 1} />
    </React.Fragment>
  ));
}