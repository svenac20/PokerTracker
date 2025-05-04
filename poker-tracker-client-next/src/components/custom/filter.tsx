"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ComboboxProps {
  data: { value: number; label: string }[]; // Array of objects with value and label
  placeholder?: string; // Optional placeholder for the input
  emptyText?: string; // Optional text when no options are found
  onSelect: (value: number | null) => void; // Callback when an item is selected
}

export const Filter: React.FC<ComboboxProps> = ({
  data,
  placeholder = "Select an option...",
  emptyText = "No options found.",
  onSelect,
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<number | null>();

  const handleSelect = (currentValue: number) => {
    const newValue = currentValue === value ? null : currentValue;
    setValue(newValue);
    setOpen(false);
    onSelect(newValue); 
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? data.find((item) => item.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${placeholder.toLowerCase()}`} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  className="cursor-pointer"
                  key={item.value}
                  value={item.label.toString()}
                  onSelect={() => handleSelect(item.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};