import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formSchema } from "@/lib/zod-schema";
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
          {/* <FormDescription>Select type of poker game. Can be NLH (No Limit Hold’Em) or PLO (Pot Limit Omaha)</FormDescription> */}
          <FormMessage className="font-bold" />
        </FormItem>
      )}
    />
  );
};

export default GameTypeDropdown;
