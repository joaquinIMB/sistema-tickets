"use client";

import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { Ticket } from "./Ticket";
import { useGetTicketIdSectorQuery } from "@/services/apiTicket";
import { Error } from "./Error";

export const TicketSinAbrirPorSector = ({ dataUsuario }) => {
  const { usuario } = useAuth();
  const [tickets, setTicket] = useState([]);
  const { data, error, isLoading, refetch } = useGetTicketIdSectorQuery(
    usuario.idSector
  );
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
      setTicket(data);
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 10000);
    return () => clearInterval(interval);
  }, [refetch]);

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
