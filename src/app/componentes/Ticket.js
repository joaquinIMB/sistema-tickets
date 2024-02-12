import formatearHora from "../funciones/formatearHora";

export const Ticket = ({ ticket }) => {
  const fechaFormateada = formatearHora(ticket)
  return (
    <ul className="grid grid-cols-7 container shadow-6xl text-[#161616] list-none bg-[#fcfcfc] py-8 pr-8 pl-0 items-center text-center border-2 border-white">
      <li> {ticket.idTicket}</li>
      <li>{ticket.legajo}</li>
      <li>{ticket.tituloTicket}</li>
      <li>{ticket.idEstado}</li>
      <li>{ticket.descripcionTicket}</li>
      <li>{ticket.prioridad}</li>
      <li>{fechaFormateada}</li>
    </ul>
  );
};
