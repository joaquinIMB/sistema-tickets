"use client";

import { useEffect, useState } from "react";
import { SeleccionarSector } from "./SeleccionarSector";
import { SeleccionarUsuarioReceptor } from "./SeleccionarUsuarioReceptor";
import { useMovimientoTicket } from "@/contexts/movimientosContext";

export const DetalleResponsable = ({ ticket, dataUsuario, dataSector }) => {
  const [agente, cambiarAgente] = useState(false);
  const [sector, cambiarSector] = useState(false);
  const { campos, cambiarCampos } = useMovimientoTicket();

  const usuarioAsignado = dataUsuario.find(
    (usuario) => usuario.idUsuario === campos.legajoAsignado
  );

  useEffect(() => {
    if (agente && usuarioAsignado) {
      cambiarSector(true);
      cambiarCampos((prevcampos) => ({
        ...prevcampos,
        idSector: usuarioAsignado.idSector,
        nombreUsuarioAsignado:
          usuarioAsignado.nombreUsuario + " " + usuarioAsignado.apellidoUsuario,
      }));
    } else if (sector) {
      console.log('aca')
      cambiarCampos((prevcampos) => ({
        ...prevcampos,
        nombreUsuarioAsignado: "Todos",
        idSector: campos.idSector,
      }));
    } else {
      cambiarCampos((prevData) => ({
        ...prevData,
        idSector: ticket.idSector,
        legajoAsignado: ticket.legajoAsignado,
        nombreUsuarioAsignado: ticket.nombreUsuarioAsignado,
      }));
    }
  }, [
    usuarioAsignado,
    campos.idSector,
    sector,
    agente,
    cambiarCampos,
    ticket.idSector,
    ticket.legajoAsignado,
    ticket.nombreUsuarioAsignado,
  ]);

  const handleResetAgente = () => {
    cambiarAgente(!agente);
    cambiarSector(false);
    cambiarCampos((prevData) => ({
      ...prevData,
      idSector: ticket.idSector,
      legajoAsignado: ticket.legajoAsignado,
      nombreUsuarioAsignado: ticket.nombreUsuarioAsignado,
    }));
  };

  return (
    <div className="p-4 bg-white min-h-[250px] border-y border-opacity-5 shadow-sm rounded-sm w-full">
      <h2 className="font-semibold text-lg">Responsable</h2>
      <div className="flex flex-col pt-4">
        <div className="flex flex-row w-full justify-between">
          <span className="font-semibold pb-2">Sector</span>
          <span
            onClick={() => {
              cambiarSector(!sector);
              cambiarCampos((prevcampos) => ({
                ...prevcampos,
                idSector: ticket.idSector,
              }));
            }}
            className={`font-semibold ${
              sector ? "text-red-600" : "text-blue-600"
            }  cursor-pointer`}
          >
            {sector ? "Cancelar" : "Cambiar"}
          </span>
        </div>
        {sector ? (
          <SeleccionarSector
            campos={campos}
            cambiarCampos={cambiarCampos}
            dataSector={dataSector}
          />
        ) : (
          <span className="p-2">{ticket.idSector}</span>
        )}
        {sector &&
          campos.idSector != ticket.idSector &&
          campos.legajoAsignado === ticket.legajoAsignado && (
            <button className="bg-blue-600 text-white py-1 font-semibold ">
              Guardar cambios
            </button>
          )}
      </div>
      <div className="flex flex-col  pt-3">
        <div className="flex flex-row w-full justify-between">
          <span className="font-semibold pb-2">Agente</span>
          <span
            onClick={handleResetAgente}
            className={`font-semibold ${
              agente ? "text-red-600" : "text-blue-600"
            }  cursor-pointer`}
          >
            {agente ? "Cancelar" : "Cambiar"}
          </span>
        </div>
        {agente ? (
          <SeleccionarUsuarioReceptor
            campos={campos}
            cambiarCampos={cambiarCampos}
            dataUsuario={dataUsuario}
          />
        ) : (
          <span className="p-2">
            {ticket.legajoAsignado != "Todos"
              ? ticket.legajoAsignado + " " + ticket.nombreUsuarioAsignado
              : ticket.legajoAsignado}
          </span>
        )}
      </div>
    </div>
  );
};
