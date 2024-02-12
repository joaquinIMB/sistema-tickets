'use client'

import { BuscaRuta } from "@/app/componentes/BuscaRuta";
import { Suspense } from "react";
import { Loader } from "@/app/componentes/Loader";
import { HeaderListaTickets } from "@/app/componentes/HeaderListaTickets";

export default function Panel() {
  return (
    <>
      <div className="flex w-full gap-2 items-center py-6 px-8 ">
        <BuscaRuta categoria="todos" />
      </div>
      <Suspense fallback={<Loader />}>
        <HeaderListaTickets />
        <h1>Aun no se encuentran categorizados por sector</h1>
      </Suspense>
    </>
  );
}
