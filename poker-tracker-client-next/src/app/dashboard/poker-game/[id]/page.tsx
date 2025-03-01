import { Button } from "@/components/ui/button";
import { fetchCasinosForUser, getPokerGameByIdForUser } from "@/lib/services";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import AddPokerGameForm from "./addPokerGameForm";
import { authOptions } from "@/lib/authOptions";

export default async function EditPokerGame({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (Number.isNaN(parseInt(id))) {
    redirect("/dashboard");
  }
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  const casinoGame = await getPokerGameByIdForUser(
    parseInt(id),
    session.user.id,
  );
  if (!casinoGame) {
    redirect("/dashboard");
  }
  const casinos = await fetchCasinosForUser(session.user.id);
  return (
    <div className="py-8">
      <div className="flex justify-between">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl pb-2 lg:pb-12">
          Edit poker games
        </h1>
        <Link href="/dashboard">
          <Button variant={"default"}>Dashboard page </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
        <AddPokerGameForm casinos={casinos} pokerGame={casinoGame} />
      </div>
    </div>
  );
}
