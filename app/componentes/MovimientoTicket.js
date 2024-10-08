"use client";

import { useEffect } from "react";
import { useGetMovimientoTicketQuery } from "@/services/apiTicket";

export const MovimientoTicket = ({ ticket, dataUsuario }) => {
  const { data, error, refetch } = useGetMovimientoTicketQuery(ticket.idTicket);
  // let ultimoMovimiento = null;
  // let emisorMovimiento = null;
  // let usuarioEmisor = null;

  // if (data && data.length > 0) {
  //   ultimoMovimiento = data[data.length - 1];
  //   emisorMovimiento = ultimoMovimiento.legajoEmisor;
  //   // Buscar el usuario emisor en la lista de usuarios
  //   if (dataUsuario) {
  //     usuarioEmisor = dataUsuario.find(
  //       (user) => Number(user.idUsuario) === emisorMovimiento
  //     );
  //   }
  // }

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 3000);
    return () => clearInterval(interval);
  });

  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      {data &&
        data.map((movimiento) => {
          if (movimiento.idEstado != "nuevo") {
            return (
              <section
                key={movimiento.idMovimientoTicket}
                className="w-[95%] h-auto rounded-md overflow-hidden relative"
              >
                <header className="flex flex-row justify-between bg-neutral-800 min-h-[22%] py-1 px-4">
                  <div className="flex flex-col w-[40%]">
                    <h1 className=" text-base text-[#fcfcfc] capitalize">
                      {movimiento.legajoEmisor}
                    </h1>
                  </div>
                  <div className="flex flex-col text-end text-base w-[50%]">
                    <span className="text-[#fcfcfc]">
                      {movimiento.fechaHoraRegistro}
                    </span>
                  </div>
                </header>

                <main className="bg-white min-h-18">
                  <p className="p-4 py-2 break-words">
                    {movimiento.descripcionMovimiento !== ""
                      ? movimiento.descripcionMovimiento
                      : `Cambió el estado a ${movimiento.idEstado}`}
                  </p>
                </main>
              </section>
            );
          }
        })}
    </>
  );
};
