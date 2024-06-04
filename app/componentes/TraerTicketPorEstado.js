"use client";

import { useEffect, useState } from "react";
import { Loader } from "@/elementos/Loader";
import { HeaderListaTickets } from "@/elementos/HeaderListaTickets";
import { Ticket } from "@/componentes/Ticket";
import { useAuth } from "@/contexts/authContext";
import { useGetStateIdQuery } from "@/services/apiTicket";

export const TraerTicketPorEstado = ({ idEstado, dataUsuario }) => {
  const [ticket, setTicket] = useState();
  const [usuarioActual, setUsuarioActual] = useState();
  const { usuario } = useAuth();

  const { data, error, isLoading, refetch } = useGetStateIdQuery(idEstado);

  useEffect(() => {
    const usuarioActual = dataUsuario.find(
      (user) => user.correo === usuario.email
    );
    setUsuarioActual(usuarioActual);
    if (usuarioActual && data) {
      const ticketsDeUsuario = data.filter(
        (ticket) => ticket.legajoAsignado.trim() === usuarioActual.idUsuario && ticket
      );
      return setTicket(ticketsDeUsuario);
    }
  }, [dataUsuario, usuario.email, data]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);

    return () => clearInterval(interval);
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <HeaderListaTickets />
      {ticket &&
        ticket.map((ticket) => (
          <Ticket
            key={ticket.idTicket}
            ticket={ticket}
            usuarioActual={usuarioActual}
          />
        ))}
    </>
  );
};
