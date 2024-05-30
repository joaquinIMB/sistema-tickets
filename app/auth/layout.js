import { DesplegableProvider } from "@/contexts/desplegableContext";
import Link from 'next/link'
import { lobster, poppins } from "@/elementos/fuentes";


export default function LayoutAuth({ children }) {
  return (
    <>
      <DesplegableProvider>
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
                className="inline-flex h-8 items-center justify-center bg-blue-700 p-5 text-base font-medium shadow transition-colors border border-blue-600 hover:bg-blue-600 "
                href="/auth/iniciar-sesion"
              >
                Iniciar Sesion
              </Link>
              <Link
                className="inline-flex h-8 items-center justify-center hover:border-gray-700 hover:text-gray-700 border border-black text-black p-5 text-base font-medium shadow transition-color"
                href="/auth/registrar-usuario"
              >
                Registrarse
              </Link>
            </div>
          </header>
          <div className="flex justify-center items-center py-2 min-h-[90vh] bg-slate-500 bg-opacity-5">
            <main className={`flex flex-col items-center`}>{children}</main>
          </div>
        </div>
      </DesplegableProvider>
    </>
  );
}
