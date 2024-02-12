import ListaTicket from "@/app/componentes/ListaTicket";
import { Suspense } from "react";
import { BuscaRuta } from "@/app/componentes/BuscaRuta";
import { Loader } from "@/app/componentes/Loader";
import { HeaderListaTickets } from "@/app/componentes/HeaderListaTickets";

export default function tickets({ params }) {
  const { estado } = params;
  return (
    <>
      <div className="flex w-full gap-2 items-center py-6 px-8 ">
        <BuscaRuta estado={estado} />
      </div>
      <Suspense fallback={<Loader />}>
        <HeaderListaTickets/>
        <ListaTicket estado={estado} />
      </Suspense>
    </>
  );
}
