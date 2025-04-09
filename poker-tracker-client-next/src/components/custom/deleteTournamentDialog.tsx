"use client";

import { TournamentDto } from "@/lib/types";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { FunctionComponent, useState } from "react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "../ui/dialog";
import TournamentCard from "./tournamentCard";

type DeleteTournamentDialogProps = {
  tournament: TournamentDto;
};

const DeleteTournamentDialog: FunctionComponent<DeleteTournamentDialogProps> = ({
  tournament
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const deleteTournament = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tournament/${tournament.id}`,
      {
        method: "DELETE",
      },
    );
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger>
        <Trash className="cursor-pointer" />
      </DialogTrigger >
      <DialogContent className="min-w-full md:min-w-[800px]">
        <DialogHeader className="font-bold text-lg">
          <DialogTitle>Do you want to delete this tournament?</DialogTitle>
        </DialogHeader>
        <TournamentCard tournament={tournament}/>
        <DialogDescription className="hidden">
          Delete tournament dialog
        </DialogDescription>
        <DialogFooter>
          <Button
            type="submit"
            className="bg-red-700"
            onClick={() => deleteTournament()}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTournamentDialog;
