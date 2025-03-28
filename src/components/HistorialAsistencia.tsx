import React, { useEffect, useState } from 'react';

interface Assist {
    id: string;
    employeeName: string;
    date: string;
    time: string;
}

const HistorialAsistencia: React.FC = () => {
    const [assists, setAssists] = useState<Assist[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAssists = async () => {
            try {
                const response = await fetch(
                    'https://node-webrest-server-fin-seccion-production.up.railway.app/api/assist/get-all/assists'
                );
                if (!response.ok) {
                    throw new Error('Error fetching assists');
                }
                const data = await response.json();
                const today = new Date().toISOString().split('T')[0];
                const todayAssists = data.filter((assist: Assist) => assist.date === today);
                setAssists(todayAssists);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAssists();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Asistencias de Hoy</h1>
            {assists.length === 0 ? (
                <p>No hay asistencias registradas para hoy.</p>
            ) : (
                <ul>
                    {assists.map((assist) => (
                        <li key={assist.id}>
                            {assist.employeeName} - {assist.time}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default HistorialAsistencia;