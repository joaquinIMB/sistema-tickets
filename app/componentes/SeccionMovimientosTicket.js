"use client";

import FormularioMovimientoTicket from "./FormularioMovimientoTicket";
import { MovimientoTicket } from "./MovimientoTicket";
import { TicketAbierto } from "@/elementos/TicketAbierto";
import { useGetTicketIdQuery } from "@/services/apiTicket";
import styles from "@/componentes/admin.module.css";
import { Loader } from "@/elementos/Loader";

export const SeccionMovimientoTicket = ({ idTicket, dataUsuario }) => {
  const { data, error, isLoading } = useGetTicketIdQuery(idTicket);

  if (isLoading) return <Loader />;
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
            <FormularioMovimientoTicket ticket={ticket} />
          </section>
        ))}
    </>
  );
};
