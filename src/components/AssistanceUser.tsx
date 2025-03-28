import React, { useState, useEffect } from 'react';
import './AssistanceUser.css';
import { Employee } from '../models/Employee';

export const Asistencias = () => {
  const employee: Employee = JSON.parse(localStorage.getItem("employee") || "{}");
  const [semanaSeleccionada, setSemanaSeleccionada] = useState(0);
  const [asistencias, setAsistencias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAsistencias = async () => {
      try {
        setLoading(true);
        // Usar el endpoint que obtiene las asistencias por usuario ID
        const response = await fetch(`https://node-webrest-server-fin-seccion-production.up.railway.app/api/assist/get-all/assists?userId=${employee.userId}`);
        
        if (!response.ok) {
          throw new Error('Error al obtener las asistencias');
        }
        
        const data = await response.json();
        setAsistencias(data);
      } catch (error) {
        console.error('Error al obtener las asistencias:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAsistencias();
  }, [employee.userId]);

  // Función para filtrar asistencias por semana
  const getAsistenciasPorSemana = (semana: number) => {
    if (!semana || semana === 0) return asistencias;
    
    return asistencias.filter((asistencia: any) => {
      const fecha = new Date(asistencia.fecha);
      const semanaAsistencia = getWeekNumber(fecha);
      return semanaAsistencia === semana;
    });
  };

  // Función para obtener el número de semana de una fecha
  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const getDayName = (fecha: string): string => {
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const date = new Date(fecha + 'T00:00:00');
    return diasSemana[date.getDay()];
  };

  const getCurrentWeek = () => {
    const now = new Date();
    return getWeekNumber(now);
  };

  const semanaActual = getCurrentWeek();
  const semanas = Array.from({ length: semanaActual }, (_, i) => i + 1);
  const asistenciasFiltradas = getAsistenciasPorSemana(semanaSeleccionada || semanaActual);

  return (
    <div className="historial-container">
      <div className="historial-tarjeta">
        <h1 className="historial-titulo">Historial de Asistencias</h1>

        <div className="empleado-info-container">
          <div className="empleado-info">
            <p><span className="etiqueta">No. Empleado:</span> <span className="valor">{employee.userId}</span></p>
            <p><span className="etiqueta">Nombre:</span> <span className="valor">{employee.name} {employee.lastName}</span></p>
          </div>
          <div className="semana-actual">
            <p>Semana actual: {semanaActual}</p>
          </div>
        </div>

        <div className="filtro-container">
          <select
            id="semanas"
            className="filtro-select"
            value={semanaSeleccionada}
            onChange={(e) => setSemanaSeleccionada(parseInt(e.target.value))}
          >
            <option value="0">Todas las semanas</option>
            {semanas.map((semana) => (
              <option key={semana} value={semana}>
                Semana {semana}
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
                  {asistenciasFiltradas.length > 0 ? `Semana ${semanaSeleccionada || semanaActual}` : 'Sin registros'}
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
                asistenciasFiltradas.map((asistencia: any, index: number) => (
                  <tr key={index}>
                    <td className="tabla-contenido">{asistencia.fecha}</td>
                    <td className="tabla-contenido">{asistencia.entrada || '--:--'}</td>
                    <td className="tabla-contenido">{asistencia.salida || '--:--'}</td>
                    <td className="tabla-contenido">{asistencia.horas || 0} hrs</td>
                  </tr>
                ))
              ) : (
                <tr className="sin-registros">
                  <td colSpan={4}>No hay registros de asistencia para esta semana</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};