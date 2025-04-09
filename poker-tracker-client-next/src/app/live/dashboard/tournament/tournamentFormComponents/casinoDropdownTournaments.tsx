import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CasinoDropdownDto } from "@/lib/types";
import { tournamentSchema } from "@/lib/zod-schema";
import { FunctionComponent } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface CasinosDropdownTournamentsProps {
  form: UseFormReturn<z.infer<typeof tournamentSchema>>;
  casinos: CasinoDropdownDto[];
}

const CasinosDropdownTournaments: FunctionComponent<CasinosDropdownTournamentsProps> = ({
  form,
  casinos,
}) => {
  return (
    <FormField
      control={form.control}
      name="casinoId"
      render={({ field }) => (
        <FormItem>
          <input type="hidden" name={field.name} value={field.value} />
          <FormLabel className="font-extrabold">Casino:</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select a casino" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Casino</SelectLabel>
                  {casinos.map((casino) => (
                    <SelectItem key={casino.id} value={`${casino.id}`}>
                      {casino.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          {/* <FormDescription>Select the casino which hosts the poker game</FormDescription> */}
          <FormMessage className="font-bold" />
        </FormItem>
      )}
    />
  );
};

export default CasinosDropdownTournaments;
