import CasinoDetailsCard from "@/components/custom/casinoDetailsCard";
import { CasinoCardData } from "@/lib/types";
import Link from "next/link";
import { FunctionComponent } from "react";

interface CasinoCardEditPageProps {
  casino: CasinoCardData;
}

const CasinoCardEditPage: FunctionComponent<CasinoCardEditPageProps> = ({
  casino,
}) => {
  return (
    <Link href={`/live/dashboard/casino/edit/${casino.id}`}>
      <CasinoDetailsCard casino={casino} />
    </Link>
  );
};

export default CasinoCardEditPage;
