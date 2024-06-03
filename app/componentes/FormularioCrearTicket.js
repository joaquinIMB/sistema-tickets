"use client";

import { useAuth } from "../contexts/authContext";
import { useEffect, useState } from "react";
import { SeleccionarUsuarioReceptor } from "./SeleccionarUsuarioReceptor";
import { SeleccionarSector } from "./SeleccionarSector";
import { SeleccionarPrioridad } from "./SeleccionarPrioridad";
import { Loader } from "@/elementos/Loader";
import {
  useCreateMovimientoTicketMutation,
  useGetTicketsQuery,
} from "@/services/apiTicket";
import { useCreateTicketMutation } from "@/services/apiTicket";
import { traerFechaHora } from "@/funciones/traerFechaHora";
import Alerta from "./Alerta";

const FormularioCrearTicket = ({ dataUsuario, dataSector }) => {
  const { usuario } = useAuth();
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});
  const { data, error, isLoading, refetch } = useGetTicketsQuery();
  const [crearTicket] = useCreateTicketMutation();
  const [crearMovimientoTicket] = useCreateMovimientoTicketMutation();

  const usuarioEmisor = dataUsuario.find(
    (user) => user.correo === usuario.email && user
  );

  const [campos, cambiarCampos] = useState({
    tituloTicket: "",
    descripcionTicket: "",
    prioridad: "",
    idEstado: "nuevo",
    idSector: "",
    nombreUsuarioAsignado: "",
    legajoAsignado: "",
    nombreEmisor:
      usuarioEmisor.nombreUsuario + " " + usuarioEmisor.apellidoUsuario,
    legajoEmisor: usuarioEmisor.idUsuario,
    correoUsuarioEmisor: usuarioEmisor.correo,
  });

  const usuarioAsignado = dataUsuario.find(
    (usuario) => usuario.idUsuario === campos.legajoAsignado
  );

  const validarCampos = () => {
    const camposVacios = Object.values(campos).some(
      (valor) => valor === "" || valor === null
    );
    if (camposVacios) {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "Por favor rellena todos los campos",
      });
      return true;
    }
    return false;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    cambiarCampos((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //Si tengo un usuario seleccionado recupero el legajo y obtengo el sector donde esta ubicado

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
        idSector: campos.idSector,
      }));
    }
  }, [usuarioAsignado, campos.idSector, campos.legajoAsignado]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fechaHora = traerFechaHora();
    cambiarEstadoAlerta(false);
    if (validarCampos()) {
      return;
    } else {
      try {
        await refetch();
        const idTicket = data.length + 1;
        await crearTicket({
          ...campos,
          idTicket: idTicket,
          fechaHoraRegistro: fechaHora,
        });
        await crearMovimientoTicket({
          idMovimientoTicket: 1,
          idTicket: idTicket,
          idSector: campos.idSector,
          idEstado: campos.idEstado,
          prioridad: campos.prioridad,
          legajoEmisor: campos.legajoEmisor,
          legajoAsignado: campos.legajoAsignado,
          fechaHoraRegistro: fechaHora,
          descripcionMovimiento: `Creación de ticket ${idTicket}`,
        });
        cambiarEstadoAlerta(true);
        cambiarAlerta({
          tipo: "aceptado",
          mensaje: `¡El ticket se creó correctamente!`,
        });
        cambiarCampos({
          tituloTicket: "",
          descripcionTicket: "",
          prioridad: "",
          idEstado: "nuevo",
          idSector: "",
          nombreUsuarioAsignado: "",
          legajoAsignado: "",
          nombreEmisor:
            usuarioEmisor.nombreUsuario + " " + usuarioEmisor.apellidoUsuario,
          legajoEmisor: usuarioEmisor.idUsuario,
          correoUsuarioEmisor: usuarioEmisor.correo,
        });
        console.log(data);
      } catch (error) {
        console.log(error);
        cambiarEstadoAlerta(true);
        cambiarAlerta({
          tipo: "error",
          mensaje: error,
        });
      }
    }
  };
  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <form className="w-[60%] p-3 py-0 px-8 mt-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="pb-2 text-lg font-medium text-gray-700">
              Asunto
            </label>
            <input
              type="text"
              id="asunto"
              name="tituloTicket"
              placeholder="Asunto..."
              value={campos.tituloTicket}
              onChange={handleChange}
              className="p-2 w-full border border-neutral-200 rounded-md outline-none"
            />
          </div>
          <div className="flex flex-row justify-between gap-4">
            <div className="w-[40%]">
              <span className="block text-lg font-medium text-gray-700 py-2">
                Asignar a
              </span>
              <SeleccionarUsuarioReceptor
                campos={campos}
                cambiarCampos={cambiarCampos}
                dataUsuario={dataUsuario}
              />
            </div>
            <div className="w-[30%]">
              <span className="block text-lg font-medium text-gray-700 py-2">
                Sector
              </span>
              <SeleccionarSector
                dataSector={dataSector}
                campos={campos}
                cambiarCampos={cambiarCampos}
              />
            </div>
            <div className="w-[30%]">
              <span className="block text-lg font-medium text-gray-700 py-2">
                Prioridad
              </span>
              <SeleccionarPrioridad
                campos={campos}
                cambiarCampos={cambiarCampos}
              />
            </div>
          </div>

          <div className="relative flex flex-col">
            <label className="block relative z-10 text-lg font-medium text-gray-700 py-2">
              Descripción
            </label>
            <textarea
              type="text"
              id="descripcionTicket"
              name="descripcionTicket"
              value={campos.descripcionTicket}
              onChange={handleChange}
              className="p-2 px-4 w-full border border-neutral-200 h-72 rounded-lg outline-none resize-none"
            />
            <div className="mt-6 absolute bottom-0 right-0">
              <button
                as={"button"}
                type="submit"
                className="w-md px-4 py-2 m-2 bg-blue-700 rounded-md text-white font-semibold hover:shadow-4xl transition"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </form>
      <Alerta
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        cambiarEstadoAlerta={cambiarEstadoAlerta}
      />
    </>
  );
};

export default FormularioCrearTicket;
