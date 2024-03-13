import FormularioMovimientoTicket from "./FormularioMovimientoTicket";
import { MovimientoTicket } from "./MovimientoTicket";
import { TicketAbierto } from "./TicketAbierto";

const SeccionMovimientoTicket = async ({ ticket, dataMovimientos }) => {
  return (
    <section className=" flex flex-col h-[92vh] pt-6 pb-8 w-[80%] justify-between items-center">
      <main className=" w-full flex flex-row items-center gap-4 flex-wrap overflow-auto justify-center">
        <TicketAbierto ticket={ticket} />
        <div className="flex flex-row w-[80%] py-4">
          <span className="text-gray-500">{`${ticket.nombreEmisor} asignó el ticket ${ticket.idTicket} a ${ticket.nombreUsuarioAsignado}`}</span>
        </div>
        {dataMovimientos && (
          <MovimientoTicket dataMovimientos={dataMovimientos} />
        )}
      </main>
      {ticket && <FormularioMovimientoTicket ticket={ticket} />}
    </section>
  );
};

export default SeccionMovimientoTicket;
