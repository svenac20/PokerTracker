import LoginRegisterForm from "@/components/auth/RegisterForm";
import Toast from "@/components/ui/toast";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router";
import { registerWithEmailAndPassword } from "../components/auth/firebase";
import RegisterForm from "@/components/auth/RegisterForm";

function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

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
      <RegisterForm sumbitHandler={handleSubmit}/>
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

export default RegisterPage;
