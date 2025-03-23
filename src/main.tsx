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
  Unauthorized,
  Attendances,
} from "./screens/index.ts";
import { ProtectedRoute } from "./components/index.ts";
import { Employee } from "./models/Employee.ts";

let isAuthenticated: boolean;
let employee: Employee = {
  name: "",
  lastname: "",
  employeeId: 0,
  token: "",
  role: "",
};

if (localStorage.getItem("employee") === null) {
  isAuthenticated = false;
} else {
  isAuthenticated = true;
  employee = JSON.parse(localStorage.getItem("employee")!);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="login" element={<Login />} />
        <Route path="scanner" element={<BarCodeScanner />} />

        {/* Rutas protegidas para admin y employee */}
        <Route
          element={
            <ProtectedRoute
              isAllowed={isAuthenticated}
              requiredRoles={["admin", "employee"]} // Roles permitidos
              role={employee.role}
            />
          }
        >
          {/* Rutas comunes para admin y employee */}
          <Route path="home" element={<Home />} />

          {/* Rutas solo para admin */}
          {employee.role === "admin" && (
            <>
              <Route path="register" element={<Register />} />
              <Route path="attendances" element={<Attendances />} />
            </>
          )}

          {/* Rutas solo para employee */}
          {employee.role === "employee" && (
            <Route path=":employeeId/attendance" element={<Attendance />} />
          )}
        </Route>

        <Route path="unauthorized" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
