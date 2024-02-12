export default function formatearHora(ticket) {
  const fechaCreacionTicket = new Date(ticket.fechaHoraRegistro.seconds);
  const fechaFormateada =
    fechaCreacionTicket.getDate() +
    "/" +
    (fechaCreacionTicket.getMonth() + 1) +
    "/" +
    fechaCreacionTicket.getFullYear() +
    " " +
    fechaCreacionTicket.getHours() +
    ":" +
    fechaCreacionTicket.getMinutes() +
    ":" +
    fechaCreacionTicket.getSeconds();
    return fechaFormateada
}
