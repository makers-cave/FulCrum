// components/manufacturer-select.tsx
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectData } from "@/lib/types";
import { Check, ChevronDown, Delete } from "lucide-react";
import { Button } from "./ui/button";

interface SelectExProps {
  data: SelectData[];
  value: SelectData | null;
  onDataChange: (data: SelectData | null) => void;
  placeholder?: string;
  className?: string;
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
      const manufacturer = data.find((m) => m._id === value);
      onSelectDataChange(manufacturer || null);
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
        {data.map((dataItem) => (
          <SelectItem key={dataItem._id} value={dataItem._id}>
            <div className="flex items-center justify-between w-full">
              <span>{dataItem.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}