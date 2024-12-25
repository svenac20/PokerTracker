import { AuthContext } from "@/components/auth/context/auth.context";
import { UserType } from "@/components/auth/context/user.type";
import { useContext } from "react";

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);

  const addUser = (user: UserType) => {
    setUser(user);
  };

  const removeUser = () => {
    setUser(null);
  };

  return { user, addUser, removeUser };
};