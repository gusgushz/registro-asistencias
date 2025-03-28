import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.tsx";
import {
  BarCodeScanner,
  Home,
  Login,
  Register,
  Unauthorized,
} from "./screens/index.ts";
import { ProtectedRoute } from "./components/index.ts";
import { Employee } from "./models/Employee.ts";

let isAuthenticated: boolean;
let employee: Employee = {
  name: "",
  lastName: "",
  employeeId: 0,
  token: "",
  rol: "",
  department: "",
  email: "",
  password: "",
  assists: [],
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
              requiredRoles={["ADMIN", "EMPLEADO"]} // Roles permitidos
              rol={employee.rol}
            />
          }
        >
          {/* Rutas comunes para admin y employee */}
          <Route path="home" element={<Home />} />

          {/* Rutas solo para admin */}
          {employee.rol === "ADMIN" && (
            <>
              <Route path="register" element={<Register />} />
            </>
          )}

          {/* Rutas solo para employee */}
          {employee.rol === "EMPLEADO" && <></>}
        </Route>

        <Route path="unauthorized" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
