import { TraerTicketPorAsignado } from "@/componentes/TraerTicketPorAsignado";
import { HeaderListaTickets } from "@/elementos/HeaderListaTickets";

export const metadata = {
  title: "Mis tickets a resolver - Helpdesk Unity - Sistema de tickets",
  description:
    "Página para visualizar los tickets del usuario actual, en sistema de tickets Helpdesk Unity",
};

export default async function MisTickets() {
  const API_URL =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL
      : process.env.URL_DEV;

  const dataUsuario = await fetch(`${API_URL}/usuarios`, {
    cache: "no-store",
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));

  return (
    <>
      <HeaderListaTickets />
      <TraerTicketPorAsignado dataUsuario={dataUsuario} />
    </>
  );
}
