export const traerFechaHora = () => {
  const date = new Date();
  const fecha = date.toLocaleDateString();
  const hora = `${date.getHours() + ":" + date.getMinutes()}`;
  const fechaHora = `${fecha + " " + hora}`;
  return fechaHora;
};
