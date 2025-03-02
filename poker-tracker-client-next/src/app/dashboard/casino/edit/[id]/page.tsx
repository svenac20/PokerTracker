import { authOptions } from "@/lib/authOptions";
import { getCasinoDetailsById } from "@/lib/services";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function EditCasinoInformationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (session?.user.id === undefined) {
    redirect("/");
  }
  const casino = await getCasinoDetailsById(id, session?.user.id);
  if (casino === null) {
    redirect("/dashboard/casino");
  }
  return (
    <div className="py-8">
      <div className="flex justify-between">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl pb-6 lg:pb-12">
          Edit Casino Information - {casino.name}
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">

      </div>
    </div>
  );
}
