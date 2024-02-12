import FormularioIniciarSesion from "@/app/componentes/FormularioInicioSesion";

export const metadata = {
  title: "Helpdesk Unity - Iniciar Sesion",
  description:
    "Helpdesk Unity es una aplicación web que le permite a su empresa gestionar tareas y realizar seguimiento de las mismas",
};

export default function IniciarSesion() {
  return (
    <div className="flex justify-center items-center h-screen">
      <main className="flex flex-col items-center w-[360px]">
        <FormularioIniciarSesion />
      </main>
    </div>
  );
}
