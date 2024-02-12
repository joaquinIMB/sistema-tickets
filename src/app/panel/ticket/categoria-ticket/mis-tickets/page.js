'use client'

import { BuscaRuta } from "@/app/componentes/BuscaRuta";
import { Suspense } from "react";
import { Loader } from "@/app/componentes/Loader";
import { HeaderListaTickets } from "@/app/componentes/HeaderListaTickets";
import useObtenerMisTickets from "@/app/hooks/useObtenerMisTickets";
import { Ticket } from "@/app/componentes/Ticket";

export default function Panel() {
  const [tickets] = useObtenerMisTickets()
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
