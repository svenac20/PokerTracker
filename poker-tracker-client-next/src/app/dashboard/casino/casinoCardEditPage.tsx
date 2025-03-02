import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <Link href={`/dashboard/casino/edit/${casino.id}`}>
      <Card className="cursor-pointer hover:bg-sidebar-accent">
        <CardHeader>
          <CardTitle>{casino.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <span className="font-bold">Town: </span>
            {casino.town}
          </div>
          <div>
            <span className="font-bold">Rake: </span>
            {casino.rake}
          </div>
        </CardContent>
        <CardFooter>
          <p>Click on the card to edit infromation</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CasinoCardEditPage;
