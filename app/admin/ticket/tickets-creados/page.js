import { TraerTicketPorEmisor } from "@/componentes/TraerTicketPorEmisor";
import { HeaderListaTickets } from "@/elementos/HeaderListaTickets";

export const metadata = {
  title: "Tickets emitidos por mí - Helpdesk Unity - Sistema de tickets",
  description:
    "Página en donde veremos los tickets creados por el usuario actual, en sistema de tickets Helpdesk Unity",
};

export default async function TicketsCreados() {
  const API_URL =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL
      : process.env.URL_DEV;

  const dataUsuario = await fetch(`${API_URL}/usuarios`, {
    cache: "no-cache",
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));
  return (
    <>
      <HeaderListaTickets />
      <TraerTicketPorEmisor dataUsuario={dataUsuario} />
    </>
  );
}
