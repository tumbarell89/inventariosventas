import { useState, useEffect } from 'react';
// import { fetchJornadas, iniciarJornada, cerrarJornada } from '../lib/jornadaQueries';

export default function InicioyCierreJornada() {
  const [jornadas, setJornadas] = useState([]);
  const [jornadaActiva, setJornadaActiva] = useState(null);

  useEffect(() => {
    // fetchJornadas().then(data => {
    //   setJornadas(data);
    //   setJornadaActiva(data.find(jornada => !jornada.fechaFin));
    // });
  }, []);

  const handleIniciarJornada = async () => {
    // const nuevaJornada = await iniciarJornada();
    // setJornadas([...jornadas, nuevaJornada]);
    // setJornadaActiva(nuevaJornada);
  };

  const handleCerrarJornada = async () => {
    // if (jornadaActiva) {
    //   const jornadaCerrada = await cerrarJornada(jornadaActiva.id);
    //   setJornadas(jornadas.map(j => j.id === jornadaCerrada.id ? jornadaCerrada : j));
    //   setJornadaActiva(null);
    // }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Control de Jornadas</h2>
      <div className="mb-4">
        {jornadaActiva ? (
          <button onClick={handleCerrarJornada} className="p-2 bg-red-500 text-white rounded">Cerrar Jornada</button>
        ) : (
          <button onClick={handleIniciarJornada} className="p-2 bg-green-500 text-white rounded">Iniciar Jornada</button>
        )}
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Inicio</th>
            <th className="py-2 px-4 border-b">Fin</th>
            <th className="py-2 px-4 border-b">Total</th>
          </tr>
        </thead>
        <tbody>
          {/* {jornadas.map((jornada) => (
            <tr key={jornada.id}>
              <td className="py-2 px-4 border-b">{jornada.id}</td>
              <td className="py-2 px-4 border-b">{new Date(jornada.fechaInicio).toLocaleString()}</td>
              <td className="py-2 px-4 border-b">{jornada.fechaFin ? new Date(jornada.fechaFin).toLocaleString() : 'En curso'}</td>
              <td className="py-2 px-4 border-b">{JSON.stringify(jornada.totalJornada)}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
}

