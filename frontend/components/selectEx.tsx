"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectData } from "@/lib/types";

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
        <SelectChildRow data ={data} level={0} />
      </SelectContent>
    </Select>
  );
}
function SelectChildRow({ data, level }: { data: SelectData[] | undefined; level: number }) {
  if (!data) return null;
  return data.map((child) => (
    <>
      <SelectItem key={child._id} value={child._id} style={{ paddingLeft: `${level * 16}px` }}>
        {child.name}
      </SelectItem>
      <SelectChildRow data={child.children} level={level + 1} />
    </>
    ));
}