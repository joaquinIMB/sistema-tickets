"use client";

import { useEffect, useState } from "react";
import { Ticket } from "@/componentes/Ticket";
import { useAuth } from "@/contexts/authContext";
import { useGetStateIdQuery } from "@/services/apiTicket";
import { Error } from "./Error";
import useInactivityTimeout from "@/hooks/useInactivityTimeout";

export const TraerTicketPorEstado = ({ idEstado, dataUsuario }) => {
  const { usuario } = useAuth();
  const [ticket, setTicket] = useState();
  const [usuarioActual, setUsuarioActual] = useState();
  const isRefetchActive = useInactivityTimeout(12000);

  const { data, error, refetch } = useGetStateIdQuery(idEstado);

  useEffect(() => {
    if (dataUsuario) {
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
    if (isRefetchActive) {
      const interval = setInterval(() => {
        refetch();
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [refetch, isRefetchActive]);

  if (error) return <Error error={error} refetch={refetch} />;
  return (
    <>
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
