"use client";

import { Header } from "../../componentes/Header";
import Aside from "../../componentes/Aside";
import { useAuth } from "../../contexts/authContext";
import { DesplegableProvider } from "../../contexts/desplegableContext";
import { AperturaTicketProvider } from "../../contexts/aperturaTicketContext";

export default function RootLayout({ children }) {
  const { usuario } = useAuth();
  return (
    usuario.logged === true && (
      <DesplegableProvider>
        <div className="flex w-full relative overflow-hidden">
          <Aside />
          <main className="flex flex-row min-h-screen bg-[#f9f9f9] justify-between w-full">
            <div className="flex flex-col w-full h-screen bg-[#f9f9f9]">
              <Header />
              <div className="w-full m-auto relative my-0 flex flex-row flex-wrap justify-center h-fit overflow-auto">
                <AperturaTicketProvider>{children}</AperturaTicketProvider>
              </div>
            </div>
          </main>
        </div>
      </DesplegableProvider>
    )
  );
}
