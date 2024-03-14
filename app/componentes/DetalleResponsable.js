"use client";

import { useEffect, useState } from "react";
import { SeleccionarSector } from "./SeleccionarSector";
import { SeleccionarUsuarioReceptor } from "./SeleccionarUsuarioReceptor";
import { useAuth } from "../contexts/authContext";

export const DetalleResponsable = ({ ticket, dataUsuario, dataSector }) => {
  const [campos, cambiarCampos] = useState({
    idSector: ticket.idSector,
    legajoAsignado: ticket.legajoAsignado,
    nombreUsuarioAsignado: ticket.nombreUsuarioAsignado,
  });
  const { usuario } = useAuth();

  const usuarioEmisor = dataUsuario.find(
    (user) => user.correo === usuario.email && user
  );

  const usuarioAsignado = dataUsuario.find(
    (usuario) => usuario.idUsuario === campos.legajoAsignado
  );

  useEffect(() => {
    if (campos.legajoAsignado != "Todos" && usuarioAsignado) {
      cambiarCampos((prevcampos) => ({
        ...prevcampos,
        idSector: usuarioAsignado.idSector,
        nombreUsuarioAsignado:
          usuarioAsignado.nombreUsuario + " " + usuarioAsignado.apellidoUsuario,
      }));
    } else {
      cambiarCampos((prevcampos) => ({
        ...prevcampos,
        nombreUsuarioAsignado: "Todos",
        idSector: "",
      }));
    }
  }, [usuarioAsignado, campos.idSector, campos.legajoAsignado]);

  return (
    <div className="p-4 bg-white h-[250px] min-h-[250px] border-y border-opacity-5 shadow-sm rounded-sm w-full">
      <h2 className="font-semibold text-lg">Responsable</h2>
      <div className="flex flex-col gap-2 pt-4">
        <div className="flex flex-row w-full justify-between">
          <span className="font-semibold">Sector</span>
        </div>
        {dataSector && (
          <SeleccionarSector
            campos={campos}
            cambiarCampos={cambiarCampos}
            dataSector={dataSector}
          />
        )}
      </div>
      <div className="flex flex-col gap-2 py-4">
        <div className="flex flex-row w-full justify-between">
          <h3 className="font-semibold">Agente</h3>
        </div>
        <SeleccionarUsuarioReceptor
          campos={campos}
          cambiarCampos={cambiarCampos}
          dataUsuario={dataUsuario}
        />
      </div>
    </div>
  );
};
