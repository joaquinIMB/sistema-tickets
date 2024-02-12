"use client";

import Link from "next/link";
import { lobster, poppins } from "./componentes/fuentes";
import { useAuth } from "./componentes/contexts/authContext";
import { Loader } from "./componentes/Loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Inicio() {
  const { usuario } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (usuario.logged === true) {
      router.replace("/panel");
    }
  },[router, usuario]);
  return usuario ? (
    <Loader />
  ) : (
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
              href="/iniciar-sesion"
            >
              Acceder
            </Link>
            <Link
              className="inline-flex h-8 items-center justify-center rounded-md border-gray-200 bg-blue-700 px-4 py-2 text-base font-medium shadow-sm transition-colors hover:bg-blue-600 "
              href="/registrar-usuario"
            >
              Registrarse
            </Link>
          </div>
        </header>
        <main className="flex flex-col items-center justify-center flex-1 px-4 py-12 text-center">
          <h1
            className={`text-6xl font-semibold sm:text-7xl md:text-[4.75rem] xl:text-8xl tracking-tight`}
          >
            Bienvenido a
            <span
              className={`text-6xl font-semibold sm:text-7xl md:text-[4.75rem] xl:text-8xl tracking-tighter `}
            >
              {" "}
              Helpdesk Unity
            </span>
          </h1>
          <p
            className={`max-w-[1000px] text-gray-500 md:text-xl/9 lg:text-xl/10 xl:text-2xl/relaxed dark:text-gray-400 mt-3 ${poppins.className}`}
          >
            Tu plataforma centralizada para resolver problemas y recibir
            asistencia técnica.
          </p>
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
