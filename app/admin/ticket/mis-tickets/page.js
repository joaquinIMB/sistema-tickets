import { TraerTicketPorAsignado } from "@/componentes/TraerTicketPorAsignado";

export const metadata = {
  title: "Mis tickets a resolver - Helpdesk Unity - Sistema de tickets",
  description:
    "Página para visualizar los tickets del usuario actual, en sistema de tickets Helpdesk Unity",
};

export default async function MisTickets() {
  const API_URL =
    process.env.NODE_ENV === "production"
      ? "https://helpdeskunity.netlify.app/api/ticket"
      : "http://127.0.0.1:3000/api/ticket";

  const dataUsuario = await fetch(`${API_URL}/usuarios`, {
    cache: "no-cache",
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));

  return <TraerTicketPorAsignado dataUsuario={dataUsuario} />;
}
