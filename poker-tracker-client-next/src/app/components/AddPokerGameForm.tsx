"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CasinoDto } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Limelight } from "next/font/google";
import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  casinoId: z.string({
    required_error: "Please select a casino",
  }),
  gameType: z.enum(["PLO", "NLO"], {
    required_error: "Please select game type",
  }),
  limit: z.string({ required_error: "Please add limit in format xx/yy" }),
  tables: z
    .number({ required_error: "Please add table" })
    .min(1, "Table must be at least 1"),
  playersWaiting: z.number({required_error: "Please add number of players waiting"}).nonnegative("Number of players waiting must be positive")
});

interface AddPokerGameFormProps {
  casinos: CasinoDto[];
}

const AddPokerGameForm: FunctionComponent<AddPokerGameFormProps> = ({
  casinos,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      casinoId: undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form className="flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 grid-rows-4 gap-12">
          <FormField
            control={form.control}
            name="casinoId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-extrabold">Casino:</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a casino" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Casino</SelectLabel>
                        {casinos.map((casino) => (
                          <SelectItem key={casino.id} value={`${casino.id}`}>
                            {casino.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="font-bold" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gameType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-extrabold">Game type:</FormLabel>
                <FormControl className="w-full">
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a game type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Game Type</SelectLabel>
                        <SelectItem value="PLO">PLO</SelectItem>
                        <SelectItem value="NLO">NLO</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="font-bold" />
              </FormItem>
            )}
          />
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
              </FormItem>
            )}
          />
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
                    onChange={(event) =>
                      field.onChange(parseInt(event.target.value))
                    }
                  ></Input>
                </FormControl>
                <FormMessage className="font-bold" />
              </FormItem>
            )}
          />
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
                    onChange={(event) =>
                      field.onChange(parseInt(event.target.value))
                    }
                  ></Input>
                </FormControl>
                <FormMessage className="font-bold" />
              </FormItem>
            )}
          />
          <div className="col-span-2 row-start-4 flex justify-center items-center">
            <Button className="w-full" type="submit">Submit</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default AddPokerGameForm;
