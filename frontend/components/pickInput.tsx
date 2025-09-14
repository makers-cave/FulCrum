"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pickaxe } from "lucide-react";

type PickInputProps<T> = {
  label?: string;
  value: string;
  valueID?: string;
  onChange: (val: string) => void;
  fetchOptions: () => Promise<T[]>;
  displayField: keyof T;
};

export function PickInput<T extends { _id: string }>({
  label,
  value,
  onChange,
  fetchOptions,
  displayField,
}: PickInputProps<T>) {
  const [options, setOptions] = useState<T[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setLoading(true);
      fetchOptions()
        .then((res) => setOptions(res))
        .finally(() => setLoading(false));
    }
  }, [open]);

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}

      <div className="relative">
        {/* Input field */}
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pr-20" // leave space for button
        />

        {/* Pick Button inside input (right aligned) */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7"
            >
              <Pickaxe />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select an option</DialogTitle>
            </DialogHeader>

            {loading ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : (
              <div className="max-h-60 overflow-y-auto divide-y">
                {options.map((item) => (
                  <div
                    key={item._id}
                    className="p-2 cursor-pointer hover:bg-accent"
                    onClick={() => {
                      onChange(String(item[displayField]));
                      setOpen(false);
                    }}
                  >
                    {String(item[displayField])}
                  </div>
                ))}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
