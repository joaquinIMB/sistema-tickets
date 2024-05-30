import { TicketSinAbrirPorSector } from "@/componentes/TicketSinAbrirPorSector";
import { apiSectores, apiUsuarios } from "@/routes/apiRoutes";

export const metadata = {
  title: "Tickets nuevos de mi sector - Helpdesk Unity - Sistema de tickets",
  description:
    "Tickets nuevos en sector asignado a usuario, en sistema de tickets Helpdesk Unity",
};

export default async function TicketsSinAbrir() {
  const dataSector = await fetch(`${apiSectores()}`)
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));

  const dataUsuario = await fetch(`${apiUsuarios()}`, {
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
