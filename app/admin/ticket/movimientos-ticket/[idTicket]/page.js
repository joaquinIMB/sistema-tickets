import { AsideDetalles } from "@/componentes/AsideDetalles";
import SeccionMovimientoTicket from "@/componentes/SeccionMovimientosTicket";

export function generateMetadata({ params, searchParams }, parent) {
  const { idTicket } = params;

  return {
    title: `Detalles - Ticket ${idTicket} - Helpdesk Unity - Sistema de tickets`,
    description: `Página de movimiento de tickets en sistema de tickets Helpdesk Unity`,
  };
}

export default async function MovimientosTicket({ params }) {
  const { idTicket } = params;
  const ticket = await fetch(
    `https://helpdeskunity.netlify.app/ticket/movimientos-ticket/${idTicket}`,
    { cache: "no-cache", next:{tags:"numeroTicket" }}
  )
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));

  const dataMovimientos = await fetch(
    `https://helpdeskunity.netlify.app/ticket/movimientos-ticket/movimientos/${idTicket}`,
    {
      cache: "no-cache",next:{tags:"movimientos"}
    }
  )
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));

  const dataSector = await fetch(`https://helpdeskunity.netlify.app/ticket/sectores`, {
    cache: "no-cache",
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));

  return (
    <>
      {ticket &&
        dataMovimientos && 
        ticket.map((ticket) => (
          <div
            key={ticket.idTicket}
            className="flex justify-between flex-row w-full relative"
          >
            <SeccionMovimientoTicket
              ticket={ticket}
              dataMovimientos={dataMovimientos}
            />
            <AsideDetalles
              ticket={ticket}
              dataMovimientos={dataMovimientos}
              dataSector={dataSector}
            />
          </div>
        ))}
    </>
  );
}
