export const TicketAbierto = ({ticket}) => {
  return (
        <section
          className="w-[95%] border relative border-black border-opacity-5 h-auto rounded-md overflow-hidden"
        >
          <header className="flex flex-row justify-between bg-neutral-800 min-h-[22%] py-1 px-4">
            <div className="flex flex-col w-[30%]">
              <h1 className=" text-base text-[rgb(252,252,252)]">
                {ticket.legajoEmisor}
              </h1>
            </div>
            <div className="flex flex-col text-end text-base w-[20%]">
              <span className="text-[#ffffff]">{`Ticket ${ticket.idTicket}`}</span>
            </div>
            <div className="flex flex-col text-end text-base w-[40%]">
              <span className="text-[#fcfcfc]">{ticket.fechaHoraRegistro}</span>
            </div>
          </header>
          <main className="bg-white min-h-18">
            <p className="p-4 py-2 break-words">{ticket.descripcionTicket}</p>
          </main>
        </section>
  );
};
