import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { casinoDetailsSchema } from "@/lib/zod-schema";
import { FunctionComponent } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface CasinoRakeInputProps {
  form: UseFormReturn<z.infer<typeof casinoDetailsSchema>>;
}

const CasinoRakeInput: FunctionComponent<CasinoRakeInputProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="rake"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-extrabold">Rake:</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Enter rake information"
              {...field}
              onChange={(event) => field.onChange(event.target.value)}
            ></Input>
          </FormControl>
          <FormMessage className="font-bold" />
          {/* <FormDescription>Set number of players waiting to join the game</FormDescription> */}
        </FormItem>
      )}
    />
  );
};

export default CasinoRakeInput;
