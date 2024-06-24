import { MovimientoTicketProvider } from "@/contexts/movimientosContext";
import { SeccionMovimientoTicket } from "@/componentes/SeccionMovimientosTicket";
import styles from "@/componentes/admin.module.css";
import { AsideDetalles } from "@/componentes/AsideDetalles";

export function generateMetadata({ params, searchParams }, parent) {
  const { idTicket } = params;

  return {
    title: `Detalles - Ticket ${idTicket} - Helpdesk Unity - Sistema de tickets`,
    description: `Página de movimiento de tickets en sistema de tickets Helpdesk Unity`,
  };
}

export default async function MovimientosTicket({ params }) {
  const { idTicket } = params;

  const API_URL =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL
      : process.env.URL_DEV;

  const dataUsuario = await fetch(`${API_URL}/usuarios`, {
    cache: "no-store",
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));

  const dataSector = await fetch(`${API_URL}/sectores`)
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));

  return (
    <MovimientoTicketProvider>
      <div className={`${styles.contenedorMovTickets}`}>
        <SeccionMovimientoTicket
          idTicket={idTicket}
          dataUsuario={dataUsuario}
        />
        <AsideDetalles
          idTicket={idTicket}
          dataUsuario={dataUsuario}
          dataSector={dataSector}
        />
      </div>
    </MovimientoTicketProvider>
  );
}
