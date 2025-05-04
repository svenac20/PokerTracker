"use client";

import { LoadingSpinner } from "@/components/custom/loading";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { CasinoDropdownDto, TournamentDto } from "@/lib/types";
import { tournamentSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CasinosDropdownTournaments from "./tournamentFormComponents/casinoDropdownTournaments";
import TournamentDateInput from "./tournamentFormComponents/tournamentDateInput";
import TournamentImageInput from "./tournamentFormComponents/tournamentImageInput";
import TournamentInformationInput from "./tournamentFormComponents/tournamentInformationInput";
import TournamentNameInput from "./tournamentFormComponents/tournamentNameInput";
import TournamentWeeklyCheckbox from "./tournamentFormComponents/tournamentWeeklyCheckbox";

interface TournamentAddEditFormProps {
  tournament?: TournamentDto;
  casinos: CasinoDropdownDto[];
}

const TournamentAddEditForm: FunctionComponent<TournamentAddEditFormProps> = ({
  tournament,
  casinos,
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof tournamentSchema>>({
    resolver: zodResolver(tournamentSchema),
    defaultValues: {
      id: tournament?.id,
      casinoId: tournament?.casinoId.toString() ?? "",
      startTime: tournament?.startTime ?? new Date(),
      information: tournament?.information ?? "",
      name: tournament?.name ?? "",
      weeklyTournament: tournament?.weeklyTournament ?? false,
    },
  });

  async function onSubmitAddTournament(data: z.infer<typeof tournamentSchema>) {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (data.image) {
      formData.append("image", data.image);
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tournament`,
      {
        method: "POST",
        body: formData,
      },
    );
    if (!response.ok) {
      toast({
        title: "Error",
        description: "An error occurred while adding new tournament",
        className: "bg-red-500 text-white",
      });
      return;
    }

    toast({
      title: "New Tournament Added",
      description: "Tournament has been added sucessfully",
    });
    router.push("/live/dashboard/tournament");
  }

  async function onSubmitEditTournament(
    data: z.infer<typeof tournamentSchema>
  ) {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (data.image) {
      formData.append("image", data.image);
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tournament/${data.id}`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) {
      toast({
        title: "Error",
        description: "An error occurred while editing tournament information",
        className: "bg-red-500 text-white",
      });
      return;
    }

    toast({
      title: "Tournament information updated",
      description: "Tournament information has been updated sucessfully",
    });
    router.push("/live/dashboard/tournament");
  }

  return (
    <>
      <Form {...form}>
        <form
          className=""
          onSubmit={
            tournament
              ? form.handleSubmit(onSubmitEditTournament)
              : form.handleSubmit(onSubmitAddTournament)
          }
        >
          <div className="grid grid-cols-1 gap-4 lg:gap-6 lg:w-2/5">
            <CasinosDropdownTournaments form={form} casinos={casinos} />
            <TournamentNameInput form={form} />
            <TournamentDateInput form={form} />
            <TournamentImageInput form={form} />
            <TournamentInformationInput form={form} />
            <TournamentWeeklyCheckbox form={form} />
            <Button
              className="w-full"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? <LoadingSpinner /> : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default TournamentAddEditForm;
