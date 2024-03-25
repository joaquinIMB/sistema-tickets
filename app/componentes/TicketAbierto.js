export const TicketAbierto = ({ticket}) => {
  return (
    <>
      {ticket && (
        <section
          key={ticket.idTicket}
          className="w-[80%] border relative border-black border-opacity-5 h-auto rounded-md overflow-hidden"
        >
          <header className="flex flex-row justify-between bg-neutral-800 min-h-[22%] py-1 px-4">
            <div className="flex flex-col w-[50%]">
              <h1 className=" text-base text-[#fcfcfc]">
                {ticket.nombreEmisor}
              </h1>
            </div>
            <div className="flex flex-col text-end text-base w-[25%]">
              <span className="text-[#fcfcfc]">{ticket.fechaHoraRegistro}</span>
            </div>
          </header>
          <main className="bg-white min-h-18">
            <p className="p-4 break-words">{ticket.descripcionTicket}</p>
          </main>
        </section>
      )}
    </>
  );
};
