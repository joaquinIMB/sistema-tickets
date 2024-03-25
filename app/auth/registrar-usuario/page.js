import FormularioRegistroUsuario from "@/componentes/FormularioRegistroUsuario";

export const metadata = {
  title: "Registrarse - Helpdesk Unity - Sistema de tickets",
  description:
    "Página para registrar un usuario en sistema de tickets Helpdesk Unity",
};

export default async function RegistrarUsuario() {
  const API_URL =
    process.env.NODE_ENV === "production"
      ? "https://helpdeskunity.netlify.app/api/ticket"
      : "http://127.0.0.1:3000/api/ticket";

  const dataSector = await fetch(`${API_URL}/sectores`, {
    cache: "no-store",
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));

  return <FormularioRegistroUsuario dataSector={dataSector} />;
}
