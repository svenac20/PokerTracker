"use client";

import { LoadingSpinner } from "@/components/custom/loading";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import useHubConnection from "@/hooks/useHubConnection";
import { CasinoDropdownDto, PokerGameDto } from "@/lib/types";
import { formSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CasinosDropdown from "./pokerGameFormComponents/casinoDropdown";
import DateTimePicker from "./pokerGameFormComponents/dateTimePicker";
import GameLimitInput from "./pokerGameFormComponents/gameLimitInput";
import GameStartedCheckbox from "./pokerGameFormComponents/gameStartedCheckbox";
import GameTypeDropdown from "./pokerGameFormComponents/gameTypeDropdown";
import PlayersWaitingInput from "./pokerGameFormComponents/playersWaitingInput";
import TablesInput from "./pokerGameFormComponents/tablesInput";

interface AddPokerGameFormProps {
  casinos: CasinoDropdownDto[];
  pokerGame?: PokerGameDto;
}

const AddEditPokerGameForm: FunctionComponent<AddPokerGameFormProps> = ({
  casinos,
  pokerGame,
}) => {
  const { connection } = useHubConnection();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      casinoId: pokerGame?.casinoId.toString() ?? "",
      startTime: pokerGame?.startTime ?? new Date(),
      gameType: pokerGame ? (pokerGame.gameType as "PLO" | "NLH") : "PLO",
      limit: pokerGame?.limit ?? "",
      tables: pokerGame?.tablesNumber ?? 0,
      playersWaiting: pokerGame?.playerWaiting ?? 0,
      gameStarted: pokerGame?.gameStarted,
    },
  });

  async function onSubmitAddPokerGame(data: z.infer<typeof formSchema>) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/pokerGame`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      console.error(await response.text());
      toast({
        title: "Error",
        description: "An error occurred while adding poker game",
        className: "bg-red-500 text-white",
      });
    }
    const pokerGame: PokerGameDto = await response.json();
    await connection?.send("NewPokerGame", pokerGame);
    toast({
      title: "Poker game added",
      description: "Poker game has been added sucessfully",
    });
    router.push("/live/dashboard");
  }

  async function onSubmitEditPokerGame(data: z.infer<typeof formSchema>) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/pokerGame/${pokerGame?.id}`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      console.error(await response.text());
      toast({
        title: "Error",
        description: "An error occurred while adding poker game",
        className: "bg-red-500 text-white",
      });
    }
    const updatedPokerGame: PokerGameDto = await response.json();
    await connection?.send("UpdatePokerGame", updatedPokerGame);
    toast({
      title: "Poker game added",
      description: "Poker game has been added sucessfully",
    });
    router.push("/live/dashboard");
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
          <div className="grid grid-cols-1 grid-rows-9 lg:grid-cols-2 lg:grid-rows-4 lg:gap-6">
            <CasinosDropdown form={form} casinos={casinos} />
            <DateTimePicker form={form} />
            <GameTypeDropdown form={form} />
            <GameLimitInput form={form} />
            <TablesInput form={form} />
            <PlayersWaitingInput form={form} />
            <GameStartedCheckbox form={form} />
            <div className="sm:row-start-9 lg:col-span-2 lg:row-start-5 flex justify-center items-center">
              <Button
                className="w-full"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? <LoadingSpinner /> : "Submit"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AddEditPokerGameForm;
