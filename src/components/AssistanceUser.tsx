import React, { useState, useEffect } from 'react';
import './AssistanceUser.css';
import { Employee } from '../models/Employee';

interface Asistencia {
  fecha: string;
  entrada: string;
  salida: string;
  horas: string;
}

export const Asistencias = () => {
  const employee: Employee = JSON.parse(localStorage.getItem("employee") || "{}");

  const [mesSeleccionado, setMesSeleccionado] = useState(0);
  const [asistencias, setAsistencias] = useState<Asistencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [semanaSeleccionada, setSemanaSeleccionada] = useState<number | null>(null);

  useEffect(() => {
    const fetchAsistencias = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://node-webrest-server-fin-seccion-production.up.railway.app/api/assist/get-by-id-user/${employee.userId}`
        );

        if (!response.ok) {
          throw new Error("Error al obtener las asistencias");
        }

        const data = await response.json();

        const asistenciasProcesadas = Object.values(
          data.reduce((acc: any, asistencia: any) => {
            const fecha = asistencia.fecha.split("T")[0];
            if (!acc[fecha]) {
              acc[fecha] = { fecha, entradas: [] };
            }
            acc[fecha].entradas.push(new Date(asistencia.fecha));
            return acc;
          }, {})
        ).map((asistencia: any) => {
          asistencia.entradas.sort((a: Date, b: Date) => a.getTime() - b.getTime());

          const entrada = asistencia.entradas[0];
          const salida = asistencia.entradas[asistencia.entradas.length - 1];
          const horasTrabajadas = (salida.getTime() - entrada.getTime()) / (1000 * 60 * 60);

          return {
            fecha: asistencia.fecha,
            entrada: entrada.toLocaleTimeString("es-MX", { hour12: false }),
            salida: salida.toLocaleTimeString("es-MX", { hour12: false }),
            horas: horasTrabajadas.toFixed(2),
          };
        });

        setAsistencias(asistenciasProcesadas);
      } catch (error) {
        console.error("Error al obtener las asistencias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAsistencias();
  }, [employee.userId]);

  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / (1000 * 60 * 60 * 24);
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const currentWeek = getWeekNumber(new Date());
  const last5Weeks = Array.from({ length: 5 }, (_, i) => currentWeek - i).reverse();

  const getAsistenciasPorSemana = (semana: number | null) => {
    if (semana === null) return asistencias;

    return asistencias.filter((asistencia) => {
      const fecha = new Date(asistencia.fecha);
      return getWeekNumber(fecha) === semana;
    });
  };

  const getAsistenciasPorMes = (mes: number) => {
    if (!mes || mes === 0) return asistencias;

    return asistencias.filter((asistencia) => {
      const fecha = new Date(asistencia.fecha);
      return fecha.getMonth() + 1 === mes;
    });
  };

  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const asistenciasFiltradas = semanaSeleccionada !== null
    ? getAsistenciasPorSemana(semanaSeleccionada)
    : getAsistenciasPorMes(mesSeleccionado);

  return (
    <div className="historial-container">
      <div className="historial-tarjeta">
        <h1 className="historial-titulo">Historial de Asistencias</h1>

        <div className="empleado-info">
          <p className="etiqueta"><span>No. Empleado:</span> {employee.userId}</p>
          <p className="etiqueta-nombre"><span>Nombre:</span> {employee.name} {employee.lastName}</p>
        </div>

        <div className="filtros-container">
          {/* <select
            className="filtro-semana"
            value={semanaSeleccionada || ""}
            onChange={(e) => setSemanaSeleccionada(e.target.value ? parseInt(e.target.value) : null)}
          >
            <option value="">Seleccionar semana</option>
            {last5Weeks.map((week) => (
              <option key={week} value={week}>Semana {week}</option>
            ))}
          </select> */}

          <select
            className="filtro-mes"
            value={mesSeleccionado}
            onChange={(e) => setMesSeleccionado(parseInt(e.target.value))}
          >
            <option value="0">Todos los meses</option>
            {meses.map((mes, index) => (
              <option key={index + 1} value={index + 1}>
                {mes}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="tabla-container">
        {loading ? (
          <p>Cargando asistencias...</p>
        ) : (
          <table className="tabla-asistencias">
            <thead>
              <tr>
                <th colSpan={4} className="tabla-titulo">
                  {semanaSeleccionada !== null
                    ? `Semana ${semanaSeleccionada}`
                    : mesSeleccionado !== 0
                      ? `Mes ${meses[mesSeleccionado - 1]}`
                      : "Todos los registros"}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="tabla-header">Fecha</td>
                <td className="tabla-header">Hora de entrada</td>
                <td className="tabla-header">Hora de salida</td>
                <td className="tabla-header">Total de horas</td>
              </tr>
              {asistenciasFiltradas.length > 0 ? (
                asistenciasFiltradas.map((asistencia, index) => (
                  <tr key={index}>
                    <td className="tabla-contenido">{asistencia.fecha}</td>
                    <td className="tabla-contenido">{asistencia.entrada || '--:--'}</td>
                    <td className="tabla-contenido">{asistencia.salida || '--:--'}</td>
                    <td className="tabla-contenido">{asistencia.horas || 0} hrs</td>
                  </tr>
                ))
              ) : (
                <tr className="sin-registros">
                  <td colSpan={4}>No hay registros de asistencia</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
