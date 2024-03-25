import FormularioCrearTicket from "@/componentes/FormularioCrearTicket";
import { Loader } from "@/componentes/Loader";
import { Suspense } from "react";

export const metadata = {
  title: "Crear Ticket - Helpdesk Unity - Sistema de tickets",
  description:
    "Página para crear un ticket, en sistema de tickets Helpdesk Unity",
};

export default async function CrearTicket() {
  const API_URL =
    process.env.NODE_ENV === "production"
      ? "https://helpdeskunity.netlify.app/api/ticket"
      : "http://127.0.0.1:3000/api/ticket";

  const dataUsuario = await fetch(`${API_URL}/usuarios`, {
    cache: "no-store",
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));

  const dataSector = await fetch(`${API_URL}/sectores`)
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
