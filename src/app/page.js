import Image from "next/image";
import Link from "next/link";
import { lobster, poppins } from "./components/ui/fuentes";

export const metadata = {
  title: "Helpdesk Unity - Administración y Soporte",
  description:
    "Helpdesk Unity es una aplicación web que le permite a su empresa gestionar tareas y realizar seguimiento de las mismas",
};

export default function Inicio() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="flex items-center justify-between px-12 py-3 pt-4 border-b-2 border-black border-opacity-5 text-white">
          <Link className="flex items-center gap-2" href="/">
            <span
              className={`text-2xl font-semibold text-gray-800 ${lobster.className} tracking-wider`}
            >
              HelpdeskUnity
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              className="inline-flex h-8 items-center justify-center rounded-md bg-blue-700 px-4 py-2 text-base font-medium shadow transition-colors hover:bg-blue-600 "
              href="/auth/iniciar-sesion"
            >
              Acceder
            </Link>
            <Link
              className="inline-flex h-8 items-center justify-center rounded-md border-gray-200 bg-blue-700 px-4 py-2 text-base font-medium shadow-sm transition-colors hover:bg-blue-600 "
              href="/auth/registrar-usuario"
            >
              Registrarse
            </Link>
          </div>
        </header>
        <main className="flex flex-col items-center justify-center flex-1 px-4 py-12 text-center">
          <h1 className={`text-9xl font-semibold sm:text-6xl tracking-tight`}>
            Bienvenido a 
            <span
              className={`text-9xl font-semibold sm:text-6xl tracking-tighter `}
            >
              {" "}
              Helpdesk Unity
            </span>
          </h1>
          <p
            className={`max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mt-3 ${poppins.className}`}
          >
            Administre y gestione tickets mediante 3 roles de usuario
          </p>
          <div className="grid w-[90%] grid-cols-3 gap-4 mt-10">
            <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-md w-[90%] m-auto">
              <Image
                src={"/usuarioInicio.png"}
                alt="Logo representativo de usuario en modo cliente"
                width={100}
                height={100}
                className="w-20 p-2 object-contain"
              />
              <h3 className="text-xl font-semibold">Usuario</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Cree, solucione tickets, y realice un seguimiento de su estado.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-md w-[90%] m-auto">
              <Image
                src={"/agente.png"}
                alt="Logo representativo de usuario en modo agente"
                width={100}
                height={100}
                className="w-20 p-2 object-contain"
              />
              <h3 className="text-xl font-semibold">Agente</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Derive los tickets a su equipo o usuarios y brinde soporte.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-md w-[90%] m-auto">
              <Image
                src={"/ajustes.png"}
                alt="Logo representativo de usuario en modo administrador"
                width={100}
                height={100}
                className="w-20 p-2 object-contain"
              />
              <h3 className="text-xl font-semibold">Administrador</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Administre los tickets, usuarios y la configuración de la plataforma.
              </p>
            </div>
          </div>
        </main>
        <footer className="flex items-center justify-center py-4 border-t-2 border-black border-opacity-5 text-black">
          <p className="text-sm">
            © 2024 Helpdesk Unity. Todos los derechos reservados.
          </p>
        </footer>
      </div>
    </>
  );
}
