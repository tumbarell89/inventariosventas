import Jornada from '../models/Jornada';

export async function fetchJornadas() {
  return await Jornada.findAll({
    order: [['fechaInicio', 'DESC']]
  });
}

export async function iniciarJornada(negocio_id:string) {
  return await Jornada.create({
    inicio: {},
    fechaInicio: new Date(),
    totalJornada: {},
    negocio_id
  });
}

export async function cerrarJornada(id:number) {
  const jornada = await Jornada.findByPk(id);
  if (jornada) {
    return await jornada.update({
      fechaFin: new Date()
    });
  }
  throw new Error('Jornada no encontrada');
}

