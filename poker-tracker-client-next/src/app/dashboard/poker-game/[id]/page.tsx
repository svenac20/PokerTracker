import {
  checkIfUserIsOwner,
  fetchCasinosForUser,
  getPokerGameByIdForUser,
} from "@/lib/services";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AddPokerGameForm from "./addPokerGameForm";

export default async function EditPokerGame({ params } : {params: {id: string}}) {
  const { id } = await params;
  if (Number.isNaN(parseInt(id))) {
    redirect("/dashboard");
  }
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
  const casinoGame = await getPokerGameByIdForUser(parseInt(id), session.user.id);
  if (!casinoGame) {
    redirect("/dashboard");
  }
  const casinos = await fetchCasinosForUser(session.user.id);
  return (
    <div className="py-8">
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl pb-12">
        Edit poker games
      </h1>
      <div className="grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
        <AddPokerGameForm casinos={casinos} pokerGame={casinoGame} />
      </div>
    </div>
  );
}
