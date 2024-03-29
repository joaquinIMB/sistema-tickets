"use client";

import { DetalleResponsable } from "./DetalleResponsable";
import { InformacionTicket } from "./InformacionTicket";
import useTraerTicket from "@/hooks/useTraerTicket";
import useTraerMovimientos from "@/hooks/useTraerMovimientos";

export const AsideDetalles = ({ idTicket, dataUsuario, dataSector }) => {
  const [ticket] = useTraerTicket(idTicket);
  const dataMovimientos = useTraerMovimientos(idTicket);
  return (
    <>
      {ticket && (
        <aside className="w-[20%] min-w-[300px] border-l border-opacity-5 relative flex flex-row gap-1 p-2 pb-3 overflow-auto flex-wrap justify-center h-[92vh]">
          <header className="border-y self-center border-opacity-5 w-full py-4 px-4 bg-white shadow-sm rounded-sm">
            <h2 className="text-center font-semibold text-lg">Detalles</h2>
          </header>
          <InformacionTicket
            ticket={ticket}
            dataMovimientos={dataMovimientos}
          />
          <DetalleResponsable
            ticket={ticket}
            dataSector={dataSector}
            dataUsuario={dataUsuario}
          />
          <div className="p-4 bg-white h-[200px] min-h-[200px] border-y border-opacity-5 shadow-sm rounded-sm w-full">
            <h2 className="font-semibold text-lg">Solicitante</h2>
            <div className="flex flex-col gap-2 py-4">
              <div className="flex flex-row w-full justify-between">
                <h3 className="font-semibold">Agente</h3>
              </div>
              <div>
                <h5 className=" pb-1 text-neutral-600">
                  Legajo:
                  <span className="text-neutral-600 font-semibold pl-2">
                    {ticket.legajoEmisor}
                  </span>
                </h5>
                <h5 className="text-neutral-600 font-semibold pb-1">
                  {ticket.nombreEmisor}
                </h5>
                <h6 className="text-neutral-600">
                  {ticket.correoUsuarioEmisor}
                </h6>
              </div>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};
