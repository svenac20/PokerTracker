import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { tournamentSchema } from "@/lib/zod-schema";
import { FunctionComponent } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface TournamentInformationInputProps {
  form: UseFormReturn<z.infer<typeof tournamentSchema>>;
}

const TournamentInformationInput: FunctionComponent<
  TournamentInformationInputProps
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
              className="resize-y h-32"
              placeholder="Add additional information about the tournament"
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

export default TournamentInformationInput;
