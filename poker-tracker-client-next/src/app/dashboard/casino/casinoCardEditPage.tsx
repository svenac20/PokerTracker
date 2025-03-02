import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CasinoDropdownDto, CasinoDto } from "@/lib/types";
import { FunctionComponent } from "react";

interface CasinoCardEditPageProps {
  casino: CasinoDropdownDto;
}

const CasinoCardEditPage: FunctionComponent<CasinoCardEditPageProps> = ({casino}) => {
  return (
    <Card className="cursor-pointer hover:bg-sidebar-accent">
      <CardHeader>
        <CardTitle>{casino.name}</CardTitle>
      </CardHeader>
      <CardContent>

      </CardContent>
      <CardFooter>
        <p>Click on the card to edit infromation</p>
      </CardFooter>
    </Card>
  );
};

export default CasinoCardEditPage;
