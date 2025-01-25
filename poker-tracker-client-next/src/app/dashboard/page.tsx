import { getServerSession } from "next-auth";
import { FunctionComponent } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Roles } from "@/lib/types";
import { redirect } from "next/navigation";
import { fetchCasinosForUser } from "@/lib/services";

interface DashboardPageProps {
    
}
 
const DashboardPage = async () => {
    const session = await getServerSession(authOptions);
    if (session?.user.roleId !== Roles.ADMIN) {
        redirect("/")
    }

    const casinos = await fetchCasinosForUser(session?.user.id!)
    return (  <p>This is dashboard</p>);
}

export default DashboardPage;