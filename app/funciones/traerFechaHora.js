export const traerFechaHora = () => {
  const fechaActual = new Date();

  // Obtener componentes de la fecha
  const dia = String(fechaActual.getDate()).padStart(2, '0');
  const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
  const anio = fechaActual.getFullYear();

  // Obtener componentes de la hora
  const horas = String(fechaActual.getHours()).padStart(2, '0');
  const minutos = String(fechaActual.getMinutes()).padStart(2, '0');
  const segundos = String(fechaActual.getSeconds()).padStart(2, '0');

  // Formatear fecha y hora completa
  const fecha = `${dia}/${mes}/${anio}`;
  const hora = `${horas}:${minutos}:${segundos}`;

  return `${fecha} ${hora}`;
};
