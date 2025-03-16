import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.tsx";
import {
  Attendance,
  BarCodeScanner,
  Home,
  Login,
  Register,
} from "./screens/index.ts";
import { ProtectedRoute } from "./components/index.ts";

const isAuthenticated = !!localStorage.getItem("token");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="scanner" element={<BarCodeScanner />} />
        <Route element={<ProtectedRoute isAllowed={isAuthenticated} />}>
          <Route path=":empleyeeId/attendance" element={<Attendance />} />
          <Route path=":empleyeeId" />
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
