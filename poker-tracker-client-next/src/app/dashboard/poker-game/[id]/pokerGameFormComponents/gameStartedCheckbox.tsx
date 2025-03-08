import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { formSchema } from "@/lib/zod-schema";
import { FunctionComponent } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface GameStartedCheckboxProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

const GameStartedCheckbox: FunctionComponent<GameStartedCheckboxProps> = ({
  form,
}) => {
  return (
    <FormField
      control={form.control}
      name="gameStarted"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow lg:col-span-2">
          <FormLabel className="font-bold pr-2">Game started: </FormLabel>
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>Set if the game is currently live.</FormLabel>
            <FormDescription>
              This will disable start time option
            </FormDescription>
          </div>
          <FormMessage className="font-bold" />
        </FormItem>
      )}
    />
  );
};

export default GameStartedCheckbox;
