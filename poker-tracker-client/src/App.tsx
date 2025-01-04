import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { AuthContext } from "./components/auth/context/auth.context";
import { UserType } from "./components/auth/context/user.type";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ProtectedRoute from "./components/auth/ProtectedRoutes";
import HomePage from "./pages/Home";
import Navbar from "./components/ui/navbar";

function App() {
  const queryClient = new QueryClient();

  const userFromStorage = sessionStorage.getItem("user");

  const [user, setUser] = useState<UserType | null>(
    userFromStorage ? JSON.parse(userFromStorage) : null
  );
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="px-12 py-10 h-screen">
            <Routes>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Navbar/>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}

export default App;
