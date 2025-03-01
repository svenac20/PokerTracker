import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CasinoDropdownDto } from "@/lib/types";
import { formSchema } from "@/lib/zod-schema";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { FunctionComponent } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface GameTypeDropdownProps {
    form: UseFormReturn<z.infer<typeof formSchema>>;
}

const GameTypeDropdown: FunctionComponent<GameTypeDropdownProps> = ({form}) => {
  return (
    <FormField
      control={form.control}
      name="gameType"
      render={({ field }) => (
        <FormItem>
          <input type="hidden" name={field.name} value={field.value || ""} />
          <FormLabel className="font-extrabold">Game type:</FormLabel>
          <FormControl className="w-full">
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select a game type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Game Type</SelectLabel>
                  <SelectItem value="PLO">PLO</SelectItem>
                  <SelectItem value="NLH">NLH</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage className="font-bold" />
        </FormItem>
      )}
    />
  );
};

export default GameTypeDropdown;
