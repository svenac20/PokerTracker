import { UserType } from "@/components/auth/context/user.type";
import { useUser } from "./useUser";

export const useAuth = () => {
  const { user, addUser, removeUser } = useUser();

  const login = (user: UserType) => {
    addUser(user);
  };

  const logout = () => {
    removeUser();
  };

  return { user, login, logout };
};
