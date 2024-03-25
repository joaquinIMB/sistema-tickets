import { TicketSinAbrirPorSector } from "@/componentes/TicketSinAbrirPorSector";

export const metadata = {
  title: "Tickets asignados a mi sector - Helpdesk Unity - Sistema de tickets",
  description:
    "Página para abrir tickets, en sistema de tickets Helpdesk Unity",
};

export default async function TicketsSinAbrir() {
  const API_URL =
    process.env.NODE_ENV === "production"
      ? "https://helpdeskunity.netlify.app/api/ticket"
      : "http://127.0.0.1:3000/api/ticket";

  const dataSector = await fetch(`${API_URL}/sectores`)
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));

  const dataUsuario = await fetch(`${API_URL}/usuarios`, {
    cache: "no-cache",
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));
    
  return (
    <>
      <TicketSinAbrirPorSector
        dataSector={dataSector}
        dataUsuario={dataUsuario}
      />
    </>
  );
}
