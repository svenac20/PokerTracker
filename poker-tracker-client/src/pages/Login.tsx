import RegisterForm from "@/components/auth/RegisterForm";
import Toast from "@/components/ui/toast";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router";
import { logInWithEmailAndPassword } from "../components/auth/firebase";
import LoginForm from "@/components/auth/LoginForm";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

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
      if (err instanceof Error) {
        setToast({ message: err.message, type: "error" });
      }
      return null; // Return null in case of error
    }
  };

  return (
    <div className="flex justify-center items-center h-[60%]">
      <LoginForm sumbitHandler={handleSubmit}/>
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

export default LoginPage;
