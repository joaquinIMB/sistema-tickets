import FormularioCrearTicket from "@/componentes/FormularioCrearTicket";
import { Loader } from "@/elementos/Loader";
import { apiSectores, apiUsuarios } from "@/routes/apiRoutes";
import { Suspense } from "react";

export const metadata = {
  title: "Crear Ticket - Helpdesk Unity - Sistema de tickets",
  description:
    "Página para crear un ticket, en sistema de tickets Helpdesk Unity",
};

export default async function CrearTicket() {
  const dataUsuario = await fetch(`${apiUsuarios()}`, {
    cache: "no-store",
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));

  const dataSector = await fetch(`${apiSectores()}`)
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));

  return (
    <Suspense fallback={<Loader />}>
      {dataUsuario && dataSector && (
        <FormularioCrearTicket
          dataUsuario={dataUsuario}
          dataSector={dataSector}
        />
      )}
    </Suspense>
  );
}
