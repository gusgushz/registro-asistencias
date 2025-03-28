import React, { useEffect, useState } from "react";
import { Badge } from "./badge"; // Importa el componente Badge
import { Employee } from "../models/Employee"; // Asegúrate de tener el modelo Employee
import "./adminComp.css";

export const AdminComp = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(
        "https://node-webrest-server-fin-seccion-production.up.railway.app/api/auth/get-all",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div>
      <div className="badges-container">
        {employees.map((employee) => (
          <Badge key={employee.userId} employee={employee} />
        ))}
      </div>
    </div>
  );
};
