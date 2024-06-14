import FormularioCrearTicket from "@/componentes/FormularioCrearTicket";
import { SkeletonFormularioCrearTicket } from "@/elementos/skeletons/SkeletonFormCrearTicket";
import { apiSectores, apiUsuarios } from "@/routes/apiRoutes";
import { Suspense } from "react";

export const metadata = {
  title: "Crear Ticket - Helpdesk Unity - Sistema de tickets",
  description:
    "Página para crear un ticket, en sistema de tickets Helpdesk Unity",
};

export default async function CrearTicket() {
  try {
    const [dataUsuarioResponse, dataSectorResponse] = await Promise.all([
      fetch(apiUsuarios(), { cache: "no-store" }),
      fetch(apiSectores()),
    ]);

    if (!dataUsuarioResponse.ok || !dataSectorResponse.ok) {
      throw new Error("Error fetching data");
    }

    const [dataUsuario, dataSector] = await Promise.all([
      dataUsuarioResponse.json(),
      dataSectorResponse.json(),
    ]);
    
    return (
      <Suspense fallback={<SkeletonFormularioCrearTicket />}>
        {dataUsuario && dataSector && (
          <FormularioCrearTicket dataUsuario={dataUsuario} dataSector={dataSector} />
        )}
      </Suspense>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading data</div>;
  }
}
