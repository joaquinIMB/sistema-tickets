import FormularioRegistroUsuario from "@/componentes/FormularioRegistroUsuario";

export const metadata = {
  title: "Registrarse - Helpdesk Unity - Sistema de tickets",
  description:
    "Página para registrar un usuario en sistema de tickets Helpdesk Unity",
};

export default async function RegistrarUsuario() {
  const API_URL =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL
      : process.env.URL_DEV;

  const dataSector = await fetch(`${API_URL}/sectores`, {
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return <FormularioRegistroUsuario dataSector={dataSector} />;
}
