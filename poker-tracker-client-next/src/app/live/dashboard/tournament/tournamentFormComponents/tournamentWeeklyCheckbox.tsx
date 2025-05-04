import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { formSchema, tournamentSchema } from "@/lib/zod-schema";
import { FunctionComponent } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface GameStartedCheckboxProps {
  form: UseFormReturn<z.infer<typeof tournamentSchema>>;
}

const TournamentWeeklyCheckbox: FunctionComponent<GameStartedCheckboxProps> = ({
  form,
}) => {
  return (
    <FormField
      control={form.control}
      name="weeklyTournament"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
          <FormLabel className="font-bold pr-2">Weekly Tournament: </FormLabel>
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>Set if the tournament is available every week.</FormLabel>
            <FormDescription>
              This will automatically set the start time to the next available time.
            </FormDescription>
          </div>
          <FormMessage className="font-bold" />
        </FormItem>
      )}
    />
  );
};

export default TournamentWeeklyCheckbox;