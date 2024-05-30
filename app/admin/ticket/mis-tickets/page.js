import { TraerTicketPorAsignado } from "@/componentes/TraerTicketPorAsignado";
import { apiUsuarios } from "@/routes/apiRoutes";

export const metadata = {
  title: "Mis tickets a resolver - Helpdesk Unity - Sistema de tickets",
  description:
    "Página para visualizar los tickets del usuario actual, en sistema de tickets Helpdesk Unity",
};

export default async function MisTickets() {
  const dataUsuario = await fetch(`${apiUsuarios()}`, {
    cache: "no-cache",
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));

  return <TraerTicketPorAsignado dataUsuario={dataUsuario} />;
}
