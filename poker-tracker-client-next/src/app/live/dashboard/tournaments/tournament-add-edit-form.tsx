"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CasinoDropdownDto, TournamentDto } from "@/lib/types";
import { editTournamentSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TournamentGrid from "./tournament-grid";

interface TournamentAddEditFormProps {
  casinos: CasinoDropdownDto[];
  tournaments: Record<number, TournamentDto[]>;
}

const TournamentAddEditForm: FunctionComponent<TournamentAddEditFormProps> = ({
  casinos,
  tournaments,
}) => {
  const form = useForm<z.infer<typeof editTournamentSchema>>({
    resolver: zodResolver(editTournamentSchema),
    defaultValues: {
      casinoId: "",
    },
  });

  const casinoId = form.watch("casinoId");
  return (
    <div className="h-full">
      <Form {...form}>
        <FormField
          control={form.control}
          name="casinoId"
          render={({ field }) => (
            <FormItem>
              <input type="hidden" name={field.name} value={field.value} />
              <FormLabel className="font-extrabold">Casino:</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="font-bold w-1/2">
                    <SelectValue placeholder="Select a casino" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Casino</SelectLabel>
                      {casinos.map((casino) => (
                        <SelectItem
                          key={casino.id}
                          value={`${casino.id}`}
                          className="cursor-pointer"
                        >
                          {casino.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              {/* <FormDescription>Select the casino which hosts the poker game</FormDescription> */}
            </FormItem>
          )}
        />
        {casinoId && (
          <div className="flex justify-center items-center p-6 h-2/3">
            <TournamentGrid
              tournaments={tournaments}
              casinoId={parseInt(casinoId)}
            />
          </div>
        )}
      </Form>
    </div>
  );
};

export default TournamentAddEditForm;
