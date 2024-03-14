"use client";

import { useState } from "react";
import { SeleccionarPrioridad } from "./SeleccionarPrioridad";

export const InformacionTicket = ({ ticket, dataMovimientos }) => {
  const [campos, cambiarCampos] = useState({
    prioridad: ticket.prioridad,
  });

  const ultimoMovimiento = dataMovimientos[dataMovimientos.length - 1];

  console.log(ultimoMovimiento);

  return (
    <div className="p-4 pb-0 bg-white min-h-[250px] border-y border-opacity-5 shadow-sm rounded-sm  w-full">
      <h2 className="font-semibold text-lg">Información de Ticket</h2>
      <ul
        key={ticket.idTicket}
        className="pt-3 pb-4 flex flex-col gap-3 text-gray-500"
      >
        <li>
          Ticket ID:
          <span className="text-neutral-600 pl-2 font-semibold">
            {ticket.idTicket}
          </span>
        </li>
        <li>
          Creación:
          <span className="text-neutral-600 pl-2 font-semibold">
            {ticket.fechaHoraRegistro}
          </span>
        </li>
        <li>
          Ult movimiento:
          <span className="text-neutral-600 pl-2 font-semibold">
            {ultimoMovimiento.fechaHoraRegistro}
          </span>
        </li>
        <li>
          Estado:
          <span className="text-neutral-600 pl-2 font-semibold capitalize">
            {ticket.idEstado}
          </span>
        </li>
        <li className="flex flex-row items-center gap-2">
          <span>Prioridad:</span>
          <SeleccionarPrioridad campos={campos} cambiarCampos={cambiarCampos} />
        </li>
      </ul>
    </div>
  );
};
