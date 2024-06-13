import { AsideDetalles } from "@/componentes/AsideDetalles";
import { SeccionMovimientoTicket } from "@/componentes/SeccionMovimientosTicket";
import { MovimientoTicketProvider } from "@/contexts/movimientosContext";
import styles from "@/componentes/admin.module.css";
import { apiSectores, apiUsuarios } from "@/routes/apiRoutes";

export function generateMetadata({ params, searchParams }, parent) {
  const { idTicket } = params;

  return {
    title: `Detalles - Ticket ${idTicket} - Helpdesk Unity - Sistema de tickets`,
    description: `Página de movimiento de tickets en sistema de tickets Helpdesk Unity`,
  };
}

export default async function MovimientosTicket({ params }) {
  const { idTicket } = params;

  const dataUsuario = await fetch(`${apiUsuarios()}`, {
    cache: "no-store",
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));

  const dataSector = await fetch(`${apiSectores()}`)
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
