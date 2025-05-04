import { authOptions } from "@/lib/authOptions";
import {
  getCasinosDropdownForUser,
  getTournamentByIdForUser,
} from "@/lib/services";
import { Roles } from "@/lib/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import TournamentAddEditForm from "../../tournamentAddEditForm";

export default async function EditTournamentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session || session.user.roleId !== Roles.ADMIN) {
    redirect("/");
  }
  const casinosForUser = await getCasinosDropdownForUser(session.user.id);
  const tournament = await getTournamentByIdForUser(
    id,
    casinosForUser.map((casino) => casino.id),
  );
  if (!tournament) {
    redirect("/live/dashboard/tournament");
  }
  return (
    <>
      <div className="py-8 flex flex-col h-full">
        <div className="flex justify-between">
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl pb-6 lg:pb-12">
            Edit Tournament - {tournament.name}
          </h1>
        </div>
        <div>
          <TournamentAddEditForm
            casinos={casinosForUser}
            tournament={tournament}
          />
        </div>
      </div>
    </>
  );
}
