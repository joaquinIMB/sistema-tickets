"use client";

import Link from "next/link";
import { lobster, poppins } from "@/elementos/fuentes";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

export default function Inicio() {
  const router = useRouter();
  useMemo(() => router.replace("/auth/iniciar-sesion"), [router]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between max-md:justify-center px-12 py-3 pt-4 border-b-2 border-black border-opacity-5 text-white">
        <Link className="flex items-center gap-2" href="/">
          <span
            className={`text-2xl font-semibold text-gray-800 ${lobster.className} tracking-wider`}
          >
            HelpdeskUnity
          </span>
        </Link>
        <div className={`flex items-center gap-6 max-md:hidden`}>
          <Link
            className="inline-flex h-8 items-center justify-center bg-blue-700 p-5 text-base font-medium shadow transition-colors border border-blue-600 hover:bg-blue-600 "
            href="/auth/iniciar-sesion"
          >
            Acceder
          </Link>
          <Link
            className="inline-flex h-8 items-center justify-center hover:border-gray-700 hover:text-gray-700 border border-black text-black p-5 text-base font-medium shadow transition-color"
            href="/auth/registrar-usuario"
          >
            Registrarse
          </Link>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center flex-1 px-4 py-12 text-center max-md:pb-10 max-md:leading-[1.1] max-sm:px-0">
        <h1
          className={`max-md:pb-2 text-6xl font-semibold sm:text-7xl md:text-[4.75rem] xl:text-8xl tracking-tight`}
        >
          Bienvenido a
          <span
            className={`text-6xl  font-semibold sm:text-7xl md:text-[4.75rem] xl:text-8xl tracking-tighter`}
          >
            {" "}
            Helpdesk Unity
          </span>
        </h1>
        <p
          className={` max-md:w-full max-md:pl-[5px] max-w-[1000px] text-gray-500 md:text-xl/9 lg:text-xl/10 xl:text-2xl/relaxed dark:text-gray-400 mt-3 ${poppins.className}`}
        >
          Tu plataforma centralizada para resolver problemas y recibir
          asistencia técnica.
        </p>
        <div
          className={`max-md:flex hidden items-center justify-center w-full gap-6 text-white pt-10`}
        >
          <Link
            className="inline-flex h-8 items-center justify-center bg-blue-700 p-5 text-base font-medium shadow transition-colors border border-blue-600 hover:bg-blue-600 "
            href="/auth/iniciar-sesion"
          >
            Acceder
          </Link>
          <Link
            className="inline-flex h-8 items-center justify-center hover:border-gray-700 hover:text-gray-700 border border-black text-black p-5 text-base font-medium shadow transition-color"
            href="/auth/registrar-usuario"
          >
            Registrarse
          </Link>
        </div>
      </main>
      <footer className="flex items-center justify-center py-4 border-t-2 border-black border-opacity-5 text-black">
        <p className="text-sm">
          © 2024 Sports Family S.A. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
