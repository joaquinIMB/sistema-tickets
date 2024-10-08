"use client";

import FormularioMovimientoTicket from "./FormularioMovimientoTicket";
import { MovimientoTicket } from "./MovimientoTicket";
import { TicketAbierto } from "@/elementos/TicketAbierto";
import {
  useGetTicketIdQuery,
} from "@/services/apiTicket";
import styles from "@/componentes/admin.module.css";
import { useAuth } from "@/contexts/authContext";
import { SkeletonSeccionMovimientos } from "@/elementos/skeletons/SkeletonSeccionMovimientos";

export const SeccionMovimientoTicket = ({ idTicket, dataUsuario }) => {
  const { data, error, isLoading, refetch } = useGetTicketIdQuery(idTicket);
  const { usuario } = useAuth();

  if (isLoading) return <SkeletonSeccionMovimientos />;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      {data &&
        data.map((ticket) => (
          <section
            key={ticket.idTicket}
            className={`${styles.contenedorSeccionMovimientos}`}
          >
            <main className={`${styles.seccionMovimientos}`}>
              <TicketAbierto ticket={ticket} />
              <MovimientoTicket ticket={ticket} dataUsuario={dataUsuario} />
            </main>
            <FormularioMovimientoTicket
              ticket={ticket}
              usuario={usuario}
              refetch={refetch}
            />
          </section>
        ))}
    </>
  );
};
