import { authOptions } from "@/lib/authOptions";
import {
  getCasinoDetailsForUser
} from "@/lib/services";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import CasinoCardEditPage from "./casinoCardEditPage";

export const metadata: Metadata = {
  title: "Casinos",
  description: "Edit your casinos information",
}

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
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8">
        {casinosForUser.map((casino) => (
          <CasinoCardEditPage key={casino.id} casino={casino} />
        ))}
      </div>
    </div>
  );
}
