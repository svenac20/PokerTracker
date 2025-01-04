import { FunctionComponent, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "./shadcn/button";
import { AuthContext } from "../auth/context/auth.context";
import { Avatar, AvatarImage, AvatarFallback } from "./shadcn/avatar";
import { getInitials } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./shadcn/dropdown-menu";
import { logoutFirebase } from "../auth/firebase";

const Navbar: FunctionComponent = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center h-[10%]">
      <Link to="/">
        <Button variant="default">Home</Button>
      </Link>
      <div className="pr-4">
        {!user && (
          <Link to="/login">
            <Button variant="default">Sign in</Button>
          </Link>
        )}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage />
                <AvatarFallback>
                  {getInitials(user.name) || "SS"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="cursor-pointer">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="px-2 cursor-pointer"
                onClick={() => {
                  logoutFirebase();
                  navigate("/login");
                }}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Navbar;
