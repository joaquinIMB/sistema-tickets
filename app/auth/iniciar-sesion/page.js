import FormularioIniciarSesion from "@/componentes/FormularioInicioSesion";

export const metadata = {
  title: "Iniciar Sesión - Helpdesk Unity - Sistema de tickets",
  description: "Página para iniciar sesión a sistema de tickets Helpdesk Unity",
};

export default async function IniciarSesion() {
  const API_URL =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL
      : process.env.URL_DEV;

  const dataUsuarios = await fetch(`${API_URL}/usuarios`, {
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return <FormularioIniciarSesion dataUsuarios={dataUsuarios} />;
}
