import { FunctionComponent } from "react";
import { Button } from "./shadcn/button";
import { Link, useNavigate } from "react-router";

const Navbar: FunctionComponent = () => {
  
  return (
    <div className="flex justify-between h-[10%]">
      <Link to="/">
        <Button variant="default">Home</Button>
      </Link>
      <Link to="/login">
        <Button variant="default">
            Sign in
        </Button>
      </Link>
    </div>
  );
};

export default Navbar;
