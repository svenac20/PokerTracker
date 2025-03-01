import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "@/lib/zod-schema";
import { FunctionComponent } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface TablesInputProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

const TablesInput: FunctionComponent<TablesInputProps> = ({form}) => {
  return (
    <FormField
      control={form.control}
      name="tables"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-extrabold">Tables:</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="Tables"
              {...field}
              onChange={(event) => field.onChange(parseInt(event.target.value))}
            ></Input>
          </FormControl>
          <FormMessage className="font-bold" />
          {/* <FormDescription>Set a number of active tables</FormDescription> */}
        </FormItem>
      )}
    />
  );
};

export default TablesInput;
