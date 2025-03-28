import { useEffect, useState } from "react";
import { Employee } from "../models/Employee";
import { Assist } from "../models/Assist";
import "./adminComp.css";

export const Assists = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [assists, setAssists] = useState<Assist[]>([]);
  const [organizedAssists, setOrganizedAssists] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

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

  const fetchAssists = async () => {
    try {
      const response = await fetch(
        "https://node-webrest-server-fin-seccion-production.up.railway.app/api/assist/get-all/assists",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch assists");
      }
      const data = await response.json();
      setAssists(data);
      organizeAssists(data);
    } catch (error) {
      console.error("Error fetching assists:", error);
    } finally {
      setLoading(false);
    }
  };

  const obtenerHora = (fechaISO: string) => {
    const fecha = new Date(fechaISO);
    return fecha.toTimeString().split(" ")[0]; // Extraer HH:MM:SS
  };

  const organizeAssists = (assists: Assist[]) => {
    const organized: any = {};

    assists.forEach((assist) => {
      const date = new Date(assist.fecha);
      const month = date.toLocaleString("default", { month: "long" });
      const week = `Semana ${Math.ceil(date.getDate() / 7)}`;
      const day = date.toLocaleString("default", { weekday: "long" });

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

  if (loading) return <p>Loading...</p>;

  return (
    <div>
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
                        <th>Empleado</th>
                        <th>Fecha</th>
                        <th>Hora de entrada</th>
                        <th>Hora de salida</th>
                        <th>Total de horas</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(Object.entries(
                        organizedAssists[month][week][day].reduce((acc: any, assist: Assist) => {
                          const dateKey = assist.fecha;
                          if (!acc[dateKey]) acc[dateKey] = [];
                          acc[dateKey].push(assist);
                          return acc;
                        }, {})
                      ) as [string, Assist[]][]).map(([dateKey, assistsOnDate]) => {
                        const horaEntrada = obtenerHora(assistsOnDate[0].fecha);
                        const horaSalida = obtenerHora(assistsOnDate[assistsOnDate.length - 1].fecha);

                        const entrada = new Date(assistsOnDate[0].fecha);
                        const salida = new Date(assistsOnDate[assistsOnDate.length - 1].fecha);
                        const totalHoras = (salida.getTime() - entrada.getTime()) / (1000 * 60 * 60);

                        const employee = employees.find(
                          (emp) => emp.userId === assistsOnDate[0].userId
                        );

                        return (
                          <tr key={dateKey}>
                            <td>{employee?.userId}</td>
                            <td>{employee?.name}</td>
                            <td>{dateKey}</td>
                            <td>{horaEntrada}</td>
                            <td>{horaSalida}</td>
                            <td>{totalHoras.toFixed(2)} hrs</td>
                          </tr>
                        );
                      })}
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