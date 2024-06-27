"use client";

import { useEffect, useState, useMemo } from "react";
import { SeleccionarSector } from "./SeleccionarSector";
import { SeleccionarUsuarioReceptor } from "./SeleccionarUsuarioReceptor";
import { useMovimientoTicket } from "@/contexts/movimientosContext";

export const DetalleResponsable = ({ ticket, dataUsuario, dataSector }) => {
  const [editMode, setEditMode] = useState(false);
  const { campos, cambiarCampos } = useMovimientoTicket();

  const usuarioAsignado = useMemo(() => {
    return dataUsuario.find(
      (usuario) => usuario.idUsuario === campos.legajoAsignado
    );
  }, [dataUsuario, campos.legajoAsignado]);

  const handleEditToggle = () => {
    setEditMode((prevEditMode) => !prevEditMode);
    if (!editMode) {
      // Solo establecer campos cuando se activa el modo de edición
      cambiarCampos((prevCampos) => ({
        ...prevCampos,
        idSector: ticket.idSector,
        legajoAsignado: ticket.legajoAsignado.trim(),
        nombreUsuarioAsignado: ticket.nombreUsuarioAsignado,
      }));
    }
  };

  useEffect(() => {
    if (usuarioAsignado) {
      if (editMode && campos.legajoAsignado === "Todos") {
        cambiarCampos((prevCampos) => ({
          ...prevCampos,
          idSector: campos.idSector,
          nombreUsuarioAsignado: "",
        }));
      } else if (editMode && campos.legajoAsignado !== "Todos") {
        cambiarCampos((prevCampos) => ({
          ...prevCampos,
          idSector: usuarioAsignado.idSector,
          legajoAsignado: usuarioAsignado.idUsuario,
          nombreUsuarioAsignado:
            usuarioAsignado.nombreUsuario +
            " " +
            usuarioAsignado.apellidoUsuario,
        }));
      } else if (editMode && campos.idSector !== ticket.idSector) {
        cambiarCampos((prevCampos) => ({
          ...prevCampos,
          idSector: campos.idSector,
          legajoAsignado: "",
        }));
      }
    }
  }, [
    editMode,
    campos.legajoAsignado,
    cambiarCampos,
    usuarioAsignado,
    campos.idSector,
    ticket.idSector,
  ]);

  return (
    <section className="p-4 bg-white min-h-[100px] border-y border-opacity-5 shadow-sm rounded-sm w-full">
      <header className="flex flex-row justify-between">
        <h2 className="font-semibold text-lg">Responsable</h2>
        <span
          className={`font-semibold ${
            editMode ? "text-red-600" : "text-blue-600"
          } cursor-pointer`}
          onClick={handleEditToggle}
        >
          {editMode ? "Cancelar" : "Editar"}
        </span>
      </header>
      <div className="flex flex-col pt-4">
        <div className="flex flex-row w-full justify-between">
          <span className="font-semibold pb-2">Sector / Sucursal</span>
        </div>
        {editMode ? (
          <SeleccionarSector
            campos={campos}
            cambiarCampos={cambiarCampos}
            dataSector={dataSector}
          />
        ) : (
          <span className="p-2">{ticket.idSector}</span>
        )}
      </div>
      <div className="flex flex-col pt-3">
        <div className="flex flex-row w-full justify-between">
          <span className="font-semibold pb-2">Agente</span>
        </div>
        {editMode ? (
          <SeleccionarUsuarioReceptor
            campos={campos}
            cambiarCampos={cambiarCampos}
            dataUsuario={dataUsuario}
          />
        ) : (
          <span className="p-2">
            {ticket.legajoAsignado !== "Todos" ? ticket.legajoAsignado + " " + ticket.nombreUsuarioAsignado: "Todos"}
          </span>
        )}
      </div>
    </section>
  );
};
