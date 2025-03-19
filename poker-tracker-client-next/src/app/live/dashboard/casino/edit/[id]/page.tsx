import { authOptions } from "@/lib/authOptions";
import { getCasinoById, getCasinoDetailsById, getCasinosIds } from "@/lib/services";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import EditCasinoDetailsForm from "./editCasinoDetailsForm";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const ids = await getCasinosIds();
  return ids.map((id) => ({ params: { id: id.toString() } }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const {id} = await params;
  const casinoId = await getCasinoById(id);
  return {
    title: `${casinoId?.name}`,
    description: `Edit Casino Information for ${casinoId?.name}`,
  };
}

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
      <EditCasinoDetailsForm casino={casino} />
    </div>
  );
}
