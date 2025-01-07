import CasinoCard from "@/components/casinoCard";
import { GetCasinosResponse } from "@/models/requests/types";
import { fetchCasinos } from "@/services/services";
import { useQuery } from "@tanstack/react-query";
import { FunctionComponent } from "react";
interface HomePageProps {}

const HomePage: FunctionComponent<HomePageProps> = () => {
  const { data, error, isLoading } = useQuery<GetCasinosResponse>({queryKey: ['casinos'], queryFn: fetchCasinos});
    
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading casinos</div>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Casinos</h1>
      <ul>
        {
          data?.casinos.map((casino) => {
            return <CasinoCard key={casino.id} casino={casino}/>
          })
        }
      </ul>
    </>
  );
};

export default HomePage;
