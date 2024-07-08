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

export default function RootLayout({ children }) {
  const { usuario } = useAuth();
  const router = useRouter();
  useMemo(() => {
    if (!usuario.logged) {
      router.push("/auth/iniciar-sesion");
    }
  }, [usuario.logged, router]);

  return (
    <Provider store={store}>
      <DesplegableProvider>
        {usuario.logged === true && (
            <div className="flex w-full relative overflow-hidden">
              <Aside />
              <main className="flex flex-row min-h-screen bg-[#f9f9f9] justify-between w-full">
                <div className="flex flex-col w-full h-screen bg-[#f9f9f9]">
                  <Header />
                  <div
                    className={`w-full m-auto relative my-0 flex flex-row flex-wrap justify-center h-fit overflow-auto`}
                  >
                    <AperturaTicketProvider>{children}</AperturaTicketProvider>
                  </div>
                </div>
              </main>
            </div>
        )}
      </DesplegableProvider>
    </Provider>
  );
}
