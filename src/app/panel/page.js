'use client'

import { BuscaRuta } from "../componentes/BuscaRuta";
import { Suspense } from "react";
import { Loader } from "../componentes/Loader";
import { HeaderListaTickets } from "../componentes/HeaderListaTickets";
import useObtenerTickets from "../hooks/useObtenerTickets";
import { Ticket } from "../componentes/Ticket";

export default function Panel() {
  const [tickets] = useObtenerTickets()
  return (
    <>
      <div className="flex w-full gap-2 items-center py-6 px-8 ">
        <BuscaRuta categoria="todos" />
      </div>
      <Suspense fallback={<Loader />}>
        <HeaderListaTickets />
        {tickets && tickets.map(ticket => <Ticket key={ticket.idTicket} ticket={ticket}/>)}
      </Suspense>
    </>
  );
}
