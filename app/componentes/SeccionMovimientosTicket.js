"use client";

import FormularioMovimientoTicket from "./FormularioMovimientoTicket";
import { MovimientoTicket } from "./MovimientoTicket";
import { TicketAbierto } from "@/elementos/TicketAbierto";
// import useTraerTicket from "@/hooks/useTraerTicket";
import { useGetTicketIdQuery } from "@/services/apiTicket";
import useTraerMovimientos from "@/hooks/useTraerMovimientos";
import styles from "@/componentes/admin.module.css";
import { Loader } from "@/elementos/Loader";

const SeccionMovimientoTicket = ({ idTicket, dataUsuario }) => {
  // const [ticket] = useTraerTicket(idTicket);
  const { data, error, isLoading } = useGetTicketIdQuery();
  const ticket = data;
  const dataMovimientos = useTraerMovimientos(idTicket);
  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      {ticket && (
        <section className={`${styles.contenedorSeccionMovimientos}`}>
          <main className={`${styles.seccionMovimientos}`}>
            <TicketAbierto ticket={ticket} />
            <MovimientoTicket
              dataMovimientos={dataMovimientos}
              dataUsuario={dataUsuario}
            />
          </main>
          <FormularioMovimientoTicket ticket={ticket} />
        </section>
      )}
    </>
  );
};

export default SeccionMovimientoTicket;
