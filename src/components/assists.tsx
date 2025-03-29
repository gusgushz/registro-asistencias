import { useEffect, useState } from "react";
import { Employee } from "../models/Employee";
import { Assist } from "../models/Assist";
import "./assists.css";

export const Assists = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [assists, setAssists] = useState<Assist[]>([]);
  const [organizedAssists, setOrganizedAssists] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");

  const fetchEmployees = async () => {
    try {
      const response = await fetch(
        "https://node-webrest-server-fin-seccion-production.up.railway.app/api/auth/get-all"
      );
      if (!response.ok) throw new Error("Failed to fetch employees");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchAssists = async () => {
    try {
      const response = await fetch(
        "https://node-webrest-server-fin-seccion-production.up.railway.app/api/assist/get-all/assists"
      );
      if (!response.ok) throw new Error("Failed to fetch assists");
      const data = await response.json();
      setAssists(data);
      organizeAssists(data);
    } catch (error) {
      console.error("Error fetching assists:", error);
    } finally {
      setLoading(false);
    }
  };

  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const organizeAssists = (assists: Assist[]) => {
    const organized: any = {};
    assists.forEach((assist) => {
      if (selectedEmployee && assist.userId !== parseInt(selectedEmployee))
        return;
      const date = new Date(assist.fecha);
      const month = capitalizeFirstLetter(
        date.toLocaleString("default", { month: "long" })
      );
      const week = capitalizeFirstLetter(
        `Semana ${Math.ceil(date.getDate() / 7)}`
      );
      const day = capitalizeFirstLetter(
        date.toLocaleString("default", { weekday: "long" })
      );
      if (!organized[month]) organized[month] = {};
      if (!organized[month][week]) organized[month][week] = {};
      if (!organized[month][week][day]) organized[month][week][day] = [];
      organized[month][week][day].push(assist);
    });
    setOrganizedAssists(organized);
  };

  useEffect(() => {
    fetchEmployees();
    fetchAssists();
  }, []);

  useEffect(() => {
    organizeAssists(assists);
  }, [selectedEmployee]);

  if (loading) return <p>Loading...</p>;

  function obtenerHora(fecha: string) {
    const date = new Date(fecha);
    return date.toLocaleTimeString("MX", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  return (
    <div className="body-assists">
      <select
        className="employee-filter"
        value={selectedEmployee}
        onChange={(e) => setSelectedEmployee(e.target.value)}
      >
        <option value="">Todos los empleados</option>
        {employees.map((employee) => (
          <option key={employee.userId} value={employee.userId}>
            {employee.name}
          </option>
        ))}
      </select>

      {Object.keys(organizedAssists).map((month) => (
        <div key={month}>
          <h2>{month}</h2>
          {Object.keys(organizedAssists[month]).map((week) => (
            <div key={week}>
              <h3>{week}</h3>
              {Object.keys(organizedAssists[month][week]).map((day) => (
                <div key={day}>
                  <h4>{day}</h4>
                  <table className="assist-table">
                    <thead>
                      <tr>
                        <th>No. empleado</th>
                        <th>Nombre</th>
                        <th>Appelido</th>
                        <th>Fecha</th>
                        <th>Hora de entrada</th>
                        <th>Hora de salida</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(
                        organizedAssists[month][week][day].reduce(
                          (acc: any, assist: Assist) => {
                            const dateKey = new Date(assist.fecha)
                              .toISOString()
                              .split("T")[0]; // Solo la fecha (YYYY-MM-DD)
                            const userId = assist.userId;

                            if (!acc[dateKey]) acc[dateKey] = {};
                            if (!acc[dateKey][userId])
                              acc[dateKey][userId] = [];

                            acc[dateKey][userId].push(assist);
                            return acc;
                          },
                          {}
                        )
                      ).map(([dateKey, usersAssists]) =>
                        Object.entries(
                          usersAssists as Record<string, Assist[]>
                        ).map(([userId, assistsOnDate]) => {
                          // Ordenar asistencias por fecha para garantizar la primera y la última del día
                          assistsOnDate.sort(
                            (a, b) =>
                              new Date(a.fecha).getTime() -
                              new Date(b.fecha).getTime()
                          );

                          const horaEntrada = obtenerHora(
                            assistsOnDate[0].fecha
                          );
                          const horaSalida = obtenerHora(
                            assistsOnDate[assistsOnDate.length - 1].fecha
                          );

                          const employee = employees.find(
                            (emp) => emp.userId === parseInt(userId)
                          );

                          return (
                            <tr key={`${dateKey}-${userId}`}>
                              <td>{employee?.userId}</td>
                              <td>{employee?.name}</td>
                              <td>{employee?.lastName}</td>
                              <td>{dateKey}</td>
                              <td>{horaEntrada}</td>
                              <td>{horaSalida}</td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
