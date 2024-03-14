import { TicketSinAbrirPorSector } from "@/componentes/TicketSinAbrirPorSector";

export const metadata = {
  title: "Tickets asignados a mi sector - Helpdesk Unity - Sistema de tickets",
  description:
    "Página para abrir tickets, en sistema de tickets Helpdesk Unity",
};

export default async function TicketsSinAbrir() {
  const dataSector = await fetch(`https://helpdeskunity.netlify.app/api/ticket/sectores`, {
    cache: "no-cache",
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));
  const dataUsuario = await fetch(`https://helpdeskunity.netlify.app/api/ticket/usuarios`, {
    cache: "no-cache",
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));
  return (
    <>
      {dataSector && dataUsuario && (
        <TicketSinAbrirPorSector
          dataSector={dataSector}
          dataUsuario={dataUsuario}
        />
      )}
    </>
  );
}
