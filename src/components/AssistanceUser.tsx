import React, { useState, useEffect } from 'react';
import './AssistanceUser.css'; // Archivo CSS que crearemos

export const Asistencias = () => {
  // Datos del empleado
  const [empleado] = useState({
    numero: '12345',
    nombre: 'Juan Pérez López'
  });

  const getDayName = (fecha: string): string => {
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const date = new Date(fecha + 'T00:00:00');
    return diasSemana[date.getDay()];
  };

  // Estado para la semana seleccionada
  const [semanaSeleccionada, setSemanaSeleccionada] = useState(0);
  const [asistencias, setAsistencias] = useState([]);

  // Obtener la semana actual del año (1-52)
  const getCurrentWeek = () => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const diff = now.getTime() - startOfYear.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24 * 7));
  };

  const semanaActual = getCurrentWeek();
  const semanas = Array.from({ length: semanaActual }, (_, i) => i + 1);

  // Datos de ejemplo
  const datosEjemplo = {
    1: [
      { fecha: '2023-01-02', entrada: '09:00', salida: '18:00', horas: 9 },
      { fecha: '2023-01-03', entrada: '09:15', salida: '17:45', horas: 8.5 },
      { fecha: '2023-01-04', entrada: '08:45', salida: '18:30', horas: 9.75 },
    ],
    2: [
      { fecha: '2023-01-09', entrada: '09:00', salida: '18:00', horas: 9 },
      { fecha: '2023-01-10', entrada: '09:00', salida: '18:00', horas: 9 },
      { fecha: '2023-01-11', entrada: '09:00', salida: '18:00', horas: 9 },
    ],
    [semanaActual]: [
      { fecha: new Date().toISOString().split('T')[0], entrada: '08:30', salida: '17:30', horas: 9 },
    ]
  };

  useEffect(() => {
    const semana = semanaSeleccionada || semanaActual;
    setAsistencias(datosEjemplo[semana] || []);
  }, [semanaSeleccionada]);

  return (
    <div className="historial-container">

      <div className="historial-tarjeta">

        <h1 className="historial-titulo">Historial de Asistencias</h1>

        <div className="empleado-info-container">
          <div className="empleado-info">
            <p><span className="etiqueta">No. Empleado:</span> <span className="valor">{empleado.numero}</span></p>
            <p><span className="etiqueta">Nombre:</span> <span className="valor">{empleado.nombre}</span></p>
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
            <option value="0">Selecciona una semana</option>
            {semanas.map((semana) => (
              <option key={semana} value={semana}>
                Semana {semana}
              </option>
            ))}
          </select>
        </div>

      </div>

      <div className="tabla-container">
        <table className="tabla-asistencias">
          <thead>
            <tr>
              <th colSpan={4} className="tabla-titulo">{asistencias.length > 0 ? getDayName(asistencias[0].fecha): 'Sin dia'}</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Fecha</td>
              <td>Hora de entrada</td>
              <td>Hora de salida</td>
              <td>Total de horas</td>
            </tr>
            {asistencias.length > 0 ? (
              asistencias.map((asistencia, index) => (
                <tr key={index}>
                  <td>{asistencia.fecha}</td>
                  <td>{asistencia.entrada}</td>
                  <td>{asistencia.salida}</td>
                  <td>{asistencia.horas} hrs</td>
                </tr>
              ))
            ) : (
              <tr className="sin-registros">
                <td colSpan={4}>No hay registros de asistencia para esta semana</td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};
