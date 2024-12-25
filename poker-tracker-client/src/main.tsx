// filepath: /home/sscekic/RiderProjects/PokerTracker/poker-tracker-client/src/main.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import Login from "./components/auth/login";
import "./index.css";
import { AuthContext } from "./components/auth/context/auth.context";
import { UserType } from "./components/auth/context/user.type";

const queryClient = new QueryClient();

const [user, setUser] = useState<UserType | null>(null);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
