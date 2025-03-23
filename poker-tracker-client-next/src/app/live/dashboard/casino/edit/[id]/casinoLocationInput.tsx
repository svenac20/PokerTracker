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

interface CasinoLocationInputProps {
  form: UseFormReturn<z.infer<typeof casinoDetailsSchema>>;
}

const CasinoLocationInput: FunctionComponent<CasinoLocationInputProps> = ({
  form,
}) => {
  return (
    <FormField
      control={form.control}
      name="location"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-extrabold">Location:</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Location of your casino"
              {...field}
              onChange={(event) => field.onChange(event.target.value)}
            />
          </FormControl>
          <FormMessage className="font-bold" />
          {/* <FormDescription>Set number of players waiting to join the game</FormDescription> */}
        </FormItem>
      )}
    />
  );
};

export default CasinoLocationInput;
