import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { tournamentSchema } from "@/lib/zod-schema";
import { FunctionComponent } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface TournamentNameInputProps {
  form: UseFormReturn<z.infer<typeof tournamentSchema>>;
}

const TournamentNameInput: FunctionComponent<TournamentNameInputProps> = ({
  form,
}) => {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-extrabold">Name:</FormLabel>
          <FormControl>
            <Input placeholder="Tournament name" {...field}></Input>
          </FormControl>
          <FormMessage className="font-bold" />
          {/* <FormDescription>Set game limit in form nn/nn</FormDescription> */}
        </FormItem>
      )}
    />
  );
};

export default TournamentNameInput;
