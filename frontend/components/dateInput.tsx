import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon, Delete } from "lucide-react";
import { format } from "date-fns";
type DateInputProps<T> = {
    value: Date | null;
    onChange: (val: Date | null) => void;
};

export function DateInput({
    value,
    onChange,
}: {
    value?: Date | null;
    onChange: (val: Date | null) => void;
}) {
    const [date, setDate] = useState<Date>()
    const handleDateChange = (selectedDate: Date) => {
        setDate(selectedDate);
        onChange(selectedDate);
    }
    function deleteDate(): void {
        onChange(null);
    }
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    data-empty={!date}
                    className="data-[empty=true]:text-muted-foreground justify-between font-normal"
                >
                    <span>{date ? format(date, "MM/dd/yyyy") : "Select date"}</span>
                    <CalendarIcon className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    required
                    selected={date || undefined}
                    onSelect={handleDateChange}
                />
            </PopoverContent>
        </Popover>
    );
}