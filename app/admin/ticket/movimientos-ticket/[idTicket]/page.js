import { MovimientoTicketProvider } from "@/contexts/movimientosContext";
import { ContenedorSeccionMovimientoTicket } from "@/componentes/ContenedorSeccionMovimientoTicket";

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

  const dataSector = await fetch(`${API_URL}/sectores`)
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));

  return (
    <>
      <MovimientoTicketProvider>
        <ContenedorSeccionMovimientoTicket
          idTicket={idTicket}
          dataSector={dataSector}
        />
      </MovimientoTicketProvider>
    </>
  );
}
