import { authOptions } from "@/lib/authOptions";
import {
  getCasinoDetailsForUser
} from "@/lib/services";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import CasinoCardEditPage from "./casinoCardEditPage";

export default async function CasinoEditPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  const casinosForUser = await getCasinoDetailsForUser(session.user.id);
  return (
    <div className="py-8">
      <div className="flex justify-between">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl pb-6 lg:pb-12">
          Edit your casinos information
        </h1>
      </div>
      <div className="flex flex-row lg:grid lg:grid-cols-2 lg:gap-8">
        {casinosForUser.map((casino) => (
          <CasinoCardEditPage key={casino.id} casino={casino} />
        ))}
      </div>
    </div>
  );
}
