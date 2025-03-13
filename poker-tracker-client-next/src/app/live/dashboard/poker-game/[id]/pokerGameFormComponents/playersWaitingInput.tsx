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

interface PlayersWaitingInputProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

const PlayersWaitingInput: FunctionComponent<PlayersWaitingInputProps> = ({
  form,
}) => {
  return (
    <FormField
      control={form.control}
      name="playersWaiting"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-extrabold">Players waiting:</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="Players waiting"
              {...field}
              onChange={(event) => field.onChange(parseInt(event.target.value))}
            ></Input>
          </FormControl>
          <FormMessage className="font-bold" />
          {/* <FormDescription>Set number of players waiting to join the game</FormDescription> */}
        </FormItem>
      )}
    />
  );
};

export default PlayersWaitingInput;
