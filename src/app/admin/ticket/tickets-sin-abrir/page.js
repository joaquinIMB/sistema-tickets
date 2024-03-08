import { TicketSinAbrirPorSector } from "@/app/componentes/TicketSinAbrirPorSector";
import { revalidatePath } from "next/cache";

export const metadata = {
  title: "Tickets asignados a mi sector - Helpdesk Unity - Sistema de tickets",
  description:
    "Página para abrir tickets, en sistema de tickets Helpdesk Unity",
};

export default async function TicketsSinAbrir() {
  revalidatePath("/admin/ticket/tickets-sin-abrir");
  const dataTicket = await fetch(
    `https://unity-1bc4d.firebaseapp.com/api/ticket/tickets-sin-abrir`,
    { cache: "no-cache" }
  )
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));
  const dataSector = await fetch(`https://unity-1bc4d.firebaseapp.com/api/ticket/sectores`, {
    cache: "no-cache",
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));
  const dataUsuario = await fetch(`https://unity-1bc4d.firebaseapp.com/api/ticket/usuarios`, {
    cache: "no-cache",
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));
  return (
    <>
      {dataSector && dataTicket && dataUsuario && (
        <TicketSinAbrirPorSector
          dataTicket={dataTicket}
          dataSector={dataSector}
          dataUsuario={dataUsuario}
        />
      )}
    </>
  );
}
