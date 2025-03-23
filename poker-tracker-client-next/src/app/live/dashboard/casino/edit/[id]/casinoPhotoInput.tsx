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

interface CasinoImageInputProps {
  form: UseFormReturn<z.infer<typeof casinoDetailsSchema>>;
}

const CasinoImageInput: FunctionComponent<CasinoImageInputProps> = ({
  form,
}) => {
  return (
    <FormField
      control={form.control}
      name="image"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-extrabold">Image:</FormLabel>
          <FormControl>
            <Input
              className="cursor-pointer"
              type="file"
              placeholder="Your casino image"
              accept="image/jpg, image/jpeg, image/png"
              onChange={(event) =>
                field.onChange(event.target.files && event.target.files[0])
              }
            />
          </FormControl>
          <FormMessage className="font-bold" />
          {/* <FormDescription>Set number of players waiting to join the game</FormDescription> */}
        </FormItem>
      )}
    />
  );
};

export default CasinoImageInput;
