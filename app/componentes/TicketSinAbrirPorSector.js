"use client";

import { useEffect, useMemo, useState } from "react";
import { Ticket } from "@/componentes/Ticket";
import { useAuth } from "@/contexts/authContext";
import { Error } from "./Error";
import { useGetTicketIdSectorQuery } from "@/services/apiTicket";

export const TicketSinAbrirPorSector = ({ dataUsuario }) => {
  const { usuario } = useAuth();
  const [tickets, setTickets] = useState([]);
  const { data, error, refetch } = useGetTicketIdSectorQuery(usuario.idSector);
  const [usuarioActual, setUsuarioActual] = useState();

  useMemo(() => {
    if (dataUsuario) {
      const [usuarioActual] = dataUsuario.filter(
        (user) => user.correo.trim() === usuario.email
      );
      setUsuarioActual(usuarioActual);
    }
  }, [dataUsuario, usuario.email]);

  useEffect(() => {
    if (data) {
      setTickets(data);
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 3000);
    return () => clearInterval(interval);
  });

  if (error) return <Error error={error} refetch={refetch} />;

  return (
    <>
      {tickets.map((ticket) => (
        <Ticket
          key={ticket.idTicket}
          ticket={ticket}
          usuarioActual={usuarioActual}
        />
      ))}
    </>
  );
};
