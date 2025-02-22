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
import { LoadingSpinner } from "@/components/custom/loading";
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
import { CasinoDropdownDto, GameTypes, PokerGameDto } from "@/lib/types";
import { formSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { useRouter } from "next/navigation";
import { FunctionComponent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useHubConnection from "@/hooks/useHubConnection";

interface AddPokerGameFormProps {
  casinos: CasinoDropdownDto[];
  pokerGame?: PokerGameDto;
}

const AddPokerGameForm: FunctionComponent<AddPokerGameFormProps> = ({
  casinos,
  pokerGame,
}) => {
  const {connection} = useHubConnection();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      casinoId: pokerGame?.casinoId.toString() ?? "",
      gameType: pokerGame
        ? pokerGame?.gameTypeId == GameTypes.NLO
          ? "PLO"
          : "PLO"
        : "PLO",
      limit: pokerGame?.limit ?? "",
      tables: pokerGame?.tablesNumber ?? 0,
      playersWaiting: pokerGame?.playerWaiting ?? 0,
    },
  });

  async function onSubmitAddPokerGame(data: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post<PokerGameDto>("/api/pokerGame", data);
      await connection?.send("NewPokerGame", response.data);
      toast({
        title: "Poker game added",
        description: "Poker game has been added sucessfully",
      });
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while adding poker game",
        className: "bg-red-500 text-white",
      });
    }
  }

  async function onSubmitEditPokerGame(data: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post<PokerGameDto>(
        `/api/pokerGame/${pokerGame?.id}`,
        data
      );
      await connection?.send("UpdatePokerGame", response.data);
      toast({
        title: "Poker game added",
        description: "Poker game has been added sucessfully",
      });
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
      <Form {...form}>
        <form
          className=""
          onSubmit={
            pokerGame
              ? form.handleSubmit(onSubmitEditPokerGame)
              : form.handleSubmit(onSubmitAddPokerGame)
          }
        >
          <div className="grid grid-cols-1 grid-rows-8 lg:grid-cols-2 lg:grid-rows-4 gap-6">
            <FormField
              control={form.control}
              name="casinoId"
              render={({ field }) => (
                <FormItem>
                  <input type="hidden" name={field.name} value={field.value} />
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
                  <input
                    type="hidden"
                    name={field.name}
                    value={field.value || ""}
                  />
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
            <div className="sm:row-start-8 lg:col-span-2 lg:row-start-4 flex justify-center items-center">
              <Button
                className="w-full"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (<LoadingSpinner/>) : "Submit"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AddPokerGameForm;
