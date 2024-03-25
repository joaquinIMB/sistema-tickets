"use client";

import { useEffect, useState } from "react";
import { SeleccionarPrioridad } from "./SeleccionarPrioridad";
import { useMovimientoTicket } from "@/contexts/movimientosContext";

export const InformacionTicket = ({ ticket, dataMovimientos }) => {
  const { campos, cambiarCampos } = useMovimientoTicket();

  const [prioridad, cambiarPrioridad] = useState(false);

  useEffect(() => {
    if (ticket) {
      cambiarCampos((prevData) => ({
        ...prevData,
        prioridad: ticket.prioridad,
      }));
    }
  }, [ticket, cambiarCampos, ticket.prioridad]);

  const ultimoMovimiento = dataMovimientos[dataMovimientos.length - 1];

  const handleResetPrioridad = () => {
    cambiarPrioridad(!prioridad);
    cambiarCampos((prevData) => ({
      ...prevData,
      prioridad: ticket.prioridad,
    }));
  };

  return (
    <div className="p-4 pb-0 bg-white min-h-[250px] border-y border-opacity-5 shadow-sm rounded-sm  w-full">
      <h2 className="font-semibold text-lg">Información de Ticket</h2>
      <ul className="py-3 flex flex-col gap-3 text-gray-500">
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
        <li className="flex flex-row w-full gap-2 relative items-center">
          <span>Prioridad:</span>
          {prioridad ? (
            <SeleccionarPrioridad
              campos={campos}
              cambiarCampos={cambiarCampos}
            />
          ) : (
            <span className="px-2">{ticket.prioridad}</span>
          )}
          <span
            onClick={handleResetPrioridad}
            className={`font-semibold absolute bottom-4 right-0 ${
              prioridad ? "text-red-600" : "text-blue-600"
            }  cursor-pointer`}
          >
            {prioridad ? "Cancelar" : "Cambiar"}
          </span>
        </li>
      </ul>
    </div>
  );
};
