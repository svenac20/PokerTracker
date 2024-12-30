import { AuthContext } from "@/components/auth/context/auth.context";
import { UserType } from "@/components/auth/context/user.type";
import { useContext } from "react";
import { useSessionStorage } from "./useSessionStorage";

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setItemSession } = useSessionStorage();

  const addUser = (user: UserType) => {
    if (sessionStorage.getItem("user")) {
      setItemSession("user", "");
    } else {
      setItemSession("user", JSON.stringify(user));
    }
    setUser(user);
  };

  const removeUser = () => {
    if (sessionStorage.getItem("user")) {
      setItemSession("user", "");
    }
  };

  return { user, addUser, removeUser };
};