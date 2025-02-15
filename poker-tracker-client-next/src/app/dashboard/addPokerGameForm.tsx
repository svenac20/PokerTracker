"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import axios from "@/lib/axios";
import { CasinoDto, PokerGame } from "@/lib/types";
import { formSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { FunctionComponent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface AddPokerGameFormProps {
  casinos: CasinoDto[];
}

const AddPokerGameForm: FunctionComponent<AddPokerGameFormProps> = ({
  casinos,
}) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      casinoId: "",
      gameType: "PLO",
      limit: "",
      tables: 0,
      playersWaiting: 0,
    },
  });

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl(`${process.env.NEXT_PUBLIC_SIGNAL_R_URL}`)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();
    setConnection(connect);
    connect
      .start()
      .then(() => {})
      .catch((err) =>
        console.error("Error while connecting to SignalR Hub:", err)
      );

    return () => {
      if (connection) {
        connection.off("ReceiveMessage");
      }
    };
  }, []);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post<PokerGame>("/api/pokerGame", data);
      await connection?.send("NewPokerGame", response.data);
      toast({
        title: "Poker game added",
        description: "Poker game has been added sucessfully",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while adding poker game",
        className: "bg-red-500 text-white",
      });
    }
  }

  return (
    <>
      {form.formState.isSubmitting ? (
        <div className="flex justify-center items-center">
          <LoadingSpinner size={58}></LoadingSpinner>
        </div>
      ) : (
        <Form {...form}>
          <form
            className=""
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-2 grid-rows-4 gap-6">
              <FormField
                control={form.control}
                name="casinoId"
                render={({ field }) => (
                  <FormItem>
                    <input
                      type="hidden"
                      name={field.name}
                      value={field.value}
                    />
                    <FormLabel className="font-extrabold">Casino:</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a casino" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Casino</SelectLabel>
                            {casinos.map((casino) => (
                              <SelectItem
                                key={casino.id}
                                value={`${casino.id}`}
                              >
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
                    <input
                      type="hidden"
                      name={field.name}
                      value={field.value || ""}
                    />
                    <FormLabel className="font-extrabold">Game type:</FormLabel>
                    <FormControl className="w-full">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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
                    <FormLabel className="font-extrabold">
                      Game limit:
                    </FormLabel>
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
                    <FormLabel className="font-extrabold">
                      Players waiting:
                    </FormLabel>
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
                <Button
                  className="w-full"
                  type="submit"
                  disabled={form.formState.isSubmitting}
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </Form>
      )}
    </>
  );
};

export default AddPokerGameForm;
