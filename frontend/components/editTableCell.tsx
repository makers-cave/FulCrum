import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

type EditableCellProps<T> = {
  row: T
  field: keyof T
  type: "input" | "select"
  options?: string[]
  onChange: (updatedRow: T) => void
}

export function EditableCell<T extends { _id: string }>({
  row,
  field,
  type,
  options,
  onChange,
}: EditableCellProps<T>) {
  const [isEditing, setIsEditing] = useState(false)

  const handleValueChange = (value: any) => {
    const updatedRow = { ...row, [field]: value }
    onChange(updatedRow)
  }

  return (
    <td
      onClick={() => setIsEditing(true)}
      onFocus={() => setIsEditing(true)}
      tabIndex={0}
    >
      {isEditing ? (
        type === "input" ? (
          <Input
            type="number"
            value={row[field] as any}
            onChange={(e) => handleValueChange(Number(e.target.value))}
            onBlur={() => setIsEditing(false)}
            autoFocus
            className="w-20"
          />
        ) : (
          <Select
            value={row[field] as any}
            onValueChange={(val) => {
              handleValueChange(val)
              setIsEditing(false)
            }}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {options?.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      ) : type === "input" ? (
        row[field] as any
      ) : (
        <Badge>{row[field] as any}</Badge>
      )}
    </td>
  )
}
