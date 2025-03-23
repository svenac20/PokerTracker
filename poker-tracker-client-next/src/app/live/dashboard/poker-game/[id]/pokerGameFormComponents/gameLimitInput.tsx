import {
  FormControl,
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

interface GameLimitInputProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

const GameLimitInput: FunctionComponent<GameLimitInputProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="limit"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-extrabold">Game limit:</FormLabel>
          <FormControl>
            <Input placeholder="Game limit" {...field}></Input>
          </FormControl>
          <FormMessage className="font-bold" />
          {/* <FormDescription>Set game limit in form nn/nn</FormDescription> */}
        </FormItem>
      )}
    />
  );
};

export default GameLimitInput;
