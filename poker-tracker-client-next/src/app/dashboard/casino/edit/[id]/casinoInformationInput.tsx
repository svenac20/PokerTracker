import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { casinoDetailsSchema } from "@/lib/zod-schema";
import { FunctionComponent } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface CasinoInformationInputProps {
  form: UseFormReturn<z.infer<typeof casinoDetailsSchema>>;
}

const CasinoInformationInput: FunctionComponent<
  CasinoInformationInputProps
> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="information"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-extrabold">Information:</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Add additional information about the casino"
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

export default CasinoInformationInput;
