"use client";

import { useEffect, useState } from "react";
import { SeleccionarPrioridad } from "./SeleccionarPrioridad";
import { useMovimientoTicket } from "@/contexts/movimientosContext";
import { useGetMovimientoTicketQuery } from "@/services/apiTicket";

export const InformacionTicket = ({ ticket }) => {
  const { campos, cambiarCampos } = useMovimientoTicket();
  const { data, error } = useGetMovimientoTicketQuery(
    ticket.idTicket
  );
  const [prioridad, cambiarPrioridad] = useState(false);


  useEffect(() => {
    cambiarCampos((prevData) => ({
      ...prevData,
      prioridad: ticket.prioridad,
    }));
  }, [cambiarCampos, ticket.prioridad]);

  const handleResetPrioridad = () => {
    cambiarPrioridad(!prioridad);
    cambiarCampos((prevData) => ({
      ...prevData,
      prioridad: ticket.prioridad,
    }));
  };

  if (error) return <div>Error: {error.message}</div>;

  const ultimoMovimiento = data ? data[data.length - 1] : null;

  return (
    <div className="p-4 pb-0 bg-white min-h-[100px] border-y border-opacity-5 shadow-sm rounded-sm  w-full">
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
            {ultimoMovimiento ? ultimoMovimiento.fechaHoraRegistro : "N/A"}
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
            className={`font-semibold absolute top-0 right-0 ${
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
