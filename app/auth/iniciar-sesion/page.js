import FormularioIniciarSesion from "@/componentes/FormularioInicioSesion";

export const metadata = {
  title: "Iniciar Sesión - Helpdesk Unity - Sistema de tickets",
  description: "Página para iniciar sesión a sistema de tickets Helpdesk Unity",
};

export default async function IniciarSesion() {
  return <FormularioIniciarSesion />;
}
