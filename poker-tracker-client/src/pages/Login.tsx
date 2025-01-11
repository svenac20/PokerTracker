import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router";
import { logInWithEmailAndPassword } from "../components/auth/firebase";
import { FirebaseError } from "firebase/app";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<FirebaseError | null>(null);

  const handleSubmit = async (values: {
    email: string;
    password: string;
  }) => {
    try {
      let user = null;
      user = await logInWithEmailAndPassword(values.email, values.password)
      if (user !== null) {
        const userData = {
          userId: user.uid || "",
          name: user.displayName || "",
          email: user.email || "",
        };

        login(userData);
        navigate("/");
      }
    } catch (err) {
      console.log(err)
      if (err instanceof FirebaseError) {
        setError(err);
      }
      return null; // Return null in case of error
    }
  };

  return (
    <div className="flex justify-center items-center h-[60%]">
      <LoginForm sumbitHandler={handleSubmit} error={error}/>
    </div>
  );
}

export default LoginPage;
