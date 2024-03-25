"use client";

import FormularioMovimientoTicket from "./FormularioMovimientoTicket";
import { MovimientoTicket } from "./MovimientoTicket";
import { TicketAbierto } from "./TicketAbierto";
import useTraerTicket from "@/hooks/useTraerTicket";
import useTraerMovimientos from "@/hooks/useTraerMovimientos";

const SeccionMovimientoTicket = ({ idTicket, dataUsuario }) => {
  const [ticket] = useTraerTicket(idTicket);
  const dataMovimientos = useTraerMovimientos(idTicket);
  return (
    <>
      {ticket && (
        <section className=" flex flex-col h-[92vh] pt-4 pb-6 w-[80%] justify-between items-center gap-3">
          <main className=" w-full flex flex-row items-center gap-4 flex-wrap overflow-auto justify-center max-h-[600px]">
            <TicketAbierto ticket={ticket} />
            {/* <div className="flex flex-row w-[80%] p-2">
              <span className="text-gray-500">{`${
                ticket.nombreEmisor
              } asignó el ticket ${ticket.idTicket} a ${
                ticket.nombreUsuarioAsignado != "Todos"
                  ? ticket.nombreUsuarioAsignado
                  : ticket.idSector
              }`}</span>
            </div> */}
            <MovimientoTicket
              dataMovimientos={dataMovimientos}
              dataUsuario={dataUsuario}
            />
          </main>
          <FormularioMovimientoTicket ticket={ticket} />
        </section>
      )}
    </>
  );
};

export default SeccionMovimientoTicket;
