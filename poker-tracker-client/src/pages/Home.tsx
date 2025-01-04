import Navbar from "@/components/ui/navbar";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router";

interface HomePageProps {}

const HomePage: FunctionComponent<HomePageProps> = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar/>
      <h1>Home page</h1>
      <button onClick={() => navigate("/login")}>Sign in</button>
    </div>
  );
};

export default HomePage;
