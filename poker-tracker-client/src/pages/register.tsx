import RegisterForm from "@/components/auth/RegisterForm";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router";
import { registerWithEmailAndPassword } from "../components/auth/firebase";

function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values: {
    email: string;
    password: string;
    username: string;
  }) => {
    // handle user logIn / register
    try {
      let user = null;
      user = await registerWithEmailAndPassword(
        values.username,
        values.email,
        values.password
      );

      if (user !== null) {
        const userData = {
          userId: user.id || "",
          name: user.name || "",
          email: user.email || "",
        };

        login(userData);
        navigate("/");
      }
    } catch (err) {
      console.log(err)
      if (err instanceof Error) {
        // TODO add error handling
        // set
      }
      return null; // Return null in case of error
    }
  };

  return (
    <div className="flex justify-center items-center h-[60%]">
      <RegisterForm sumbitHandler={handleSubmit}/>
    </div>
  );
}

export default RegisterPage;
