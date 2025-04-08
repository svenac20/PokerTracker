import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authOptions } from "@/lib/authOptions";
import {
  getCasinosDropdownForUser,
  getTournamentsForCasino,
} from "@/lib/services";
import { Roles } from "@/lib/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import TournamentGrid from "./tournament-grid";
import TournamentAddEditForm from "./tournament-add-edit-form";

export default async function AddEditTournamentsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.roleId !== Roles.ADMIN) {
    redirect("/");
  }
  const casinosForUser = await getCasinosDropdownForUser(session.user.id);
  const tournaments = await getTournamentsForCasino(
    casinosForUser.map((casino) => casino.id)
  );
  return (
    <>
      <div className="py-8 flex flex-col h-full">
        <div className="flex justify-between">
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl pb-6 lg:pb-12">
            Add or Edit Tournaments
          </h1>
        </div>
        <TournamentAddEditForm casinos={casinosForUser} tournaments={tournaments}/>
      </div>
    </>
  );
}
