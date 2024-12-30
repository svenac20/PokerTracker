import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { AuthContext } from "./components/auth/context/auth.context";
import { UserType } from "./components/auth/context/user.type";
import Login from "./components/auth/login";

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
          <Routes>
            <Route path="/login" element={<Login type="login"/>} />
          </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </AuthContext.Provider>
  )
}

export default App
