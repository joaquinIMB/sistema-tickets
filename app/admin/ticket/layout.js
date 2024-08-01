"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { useAuth } from "@/contexts/authContext";
import { DesplegableProvider } from "@/contexts/desplegableContext";
import { AperturaTicketProvider } from "@/contexts/aperturaTicketContext";
import Aside from "@/elementos/Aside";
import { Header } from "@/elementos/Header";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { NotificacionesProvider } from "@/contexts/notificacionesContext";
import NotificacionesContainer from "@/componentes/NotificacionesContainer";
import { ContenedorFormularioCrearTicket } from "@/componentes/ContenedorFomularioCrearTicket";
import { useModal } from "@/contexts/modalContext";

export default function RootLayout({ children }) {
  const { usuario } = useAuth();
  const router = useRouter();
  const { isModalOpen } = useModal();

  useMemo(() => {
    if (!usuario.logged) {
      router.push("/auth/iniciar-sesion");
    }
  }, [usuario.logged, router]);

  return (
    <Provider store={store}>
      {usuario.logged === true && (
        <DesplegableProvider>
          <div className="flex w-full relative overflow-hidden">
            <Aside />
            <NotificacionesProvider>
              <main className="flex flex-row min-h-screen bg-[#f9f9f9] justify-between w-full">
                <div className="flex flex-col w-full h-screen bg-[#f9f9f9]">
                  <Header
                    idSector={usuario.idSector}
                    idUsuario={usuario.legajo}
                  />
                  <div
                    className={`w-full m-auto relative my-0 flex flex-row flex-wrap justify-center h-fit overflow-auto`}
                  >
                    <AperturaTicketProvider>{children}</AperturaTicketProvider>
                  </div>
                  {isModalOpen && <ContenedorFormularioCrearTicket />}
                  <NotificacionesContainer />
                </div>
              </main>
            </NotificacionesProvider>
          </div>
        </DesplegableProvider>
      )}
    </Provider>
  );
}
