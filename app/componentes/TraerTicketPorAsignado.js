"use client";

import { useEffect, useState } from "react";
import { HeaderListaTickets } from "@/elementos/HeaderListaTickets";
import { Ticket } from "@/componentes/Ticket";
import { useAuth } from "@/contexts/authContext";
import { useGetTicketsQuery } from "@/services/apiTicket";
import { SkeletonHeaderListaTicket } from "@/elementos/skeletons/SkeletonHeaderTicket";
import { Error } from "./Error";

export const TraerTicketPorAsignado = ({ dataUsuario }) => {
  const [ticket, setTicket] = useState();
  const [usuarioActual, setUsuarioActual] = useState();
  const { usuario } = useAuth();
  const { data, error, isLoading, refetch } = useGetTicketsQuery();

  useEffect(() => {
    if (dataUsuario && data) {
      const [usuarioActual] = dataUsuario.filter(
        (user) => user.correo.trim() === usuario.email
      );
      setUsuarioActual(usuarioActual);
      if (usuarioActual && data) {
        const ticketsDeUsuario = data.filter((ticket) => {
          if (ticket.legajoAsignado.trim() === usuarioActual.idUsuario.trim()) {
            return ticket;
          }
        });
        return setTicket(ticketsDeUsuario);
      }
    }
  }, [dataUsuario, usuario.email, data]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 10000);

    return () => clearInterval(interval);
  });

  if (isLoading) return <SkeletonHeaderListaTicket />;
  if (error) return <Error error={error} refetch={refetch}/>;
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
