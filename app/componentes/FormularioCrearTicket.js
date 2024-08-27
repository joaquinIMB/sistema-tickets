"use client";

import { useAuth } from "../contexts/authContext";
import { useEffect, useState } from "react";
import { SeleccionarSector } from "./SeleccionarSector";
import { SeleccionarPrioridad } from "./SeleccionarPrioridad";
import {
  useCreateMovimientoTicketMutation,
  useCreateTicketMutation,
  useGetNextIdTicketQuery,
  useCreateNotificacionTicketMutation,
} from "@/services/apiTicket";
import { traerFechaHora } from "@/funciones/traerFechaHora";
import Alerta from "./Alerta";
import { SkeletonFormularioCrearTicket } from "@/elementos/skeletons/SkeletonFormCrearTicket";

const FormularioCrearTicket = ({ dataSector }) => {
  const { usuario } = useAuth();
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});
  const { data, error, isLoading, refetch } = useGetNextIdTicketQuery(1);
  const [crearTicket] = useCreateTicketMutation();
  const [crearMovimientoTicket] = useCreateMovimientoTicketMutation();
  const [crearNotificacion] = useCreateNotificacionTicketMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const usuarioEmisor = usuario;

  const [campos, cambiarCampos] = useState({
    tituloTicket: "",
    descripcionTicket: "",
    prioridad: "",
    idEstado: "nuevo",
    idSector: "",
    nombreUsuarioAsignado: "Todos",
    legajoAsignado: "Todos",
    nombreEmisor: usuarioEmisor ? usuarioEmisor.nombreUsuario : "",
    legajoEmisor: usuarioEmisor ? usuarioEmisor.legajo : "",
    correoUsuarioEmisor: usuarioEmisor ? usuarioEmisor.email.trim() : "",
  });

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

  useEffect(() => {
    cambiarCampos((prevcampos) => ({
      ...prevcampos,
      nombreUsuarioAsignado: "Todos",
      idSector: campos.idSector,
    }));
  }, [campos.idSector]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fechaHora = traerFechaHora();
    cambiarEstadoAlerta(false);
    if (validarCampos()) {
      return;
    }
    if (campos.descripcionTicket.length > 300) {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: `La descripción supera la cantidad de caracteres permitidos (300)`,
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const [ticket] = data;
      const idTicket = ticket.idTicket || 1;
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
      await crearNotificacion({
        ...campos,
        idUsuario: campos.legajoAsignado,
        idSector: campos.idSector,
        mensaje: `${campos.nombreEmisor} creó el ticket ${idTicket} para tu sector`,
        fechaHoraRegistro: fechaHora,
        idTicket: idTicket,
      });
      await refetch();
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
        nombreUsuarioAsignado: "Todos",
        legajoAsignado: "Todos",
        nombreEmisor: usuarioEmisor ? usuarioEmisor.nombreUsuario : "",
        legajoEmisor: usuarioEmisor ? usuarioEmisor.legajo : "",
        correoUsuarioEmisor: usuarioEmisor ? usuarioEmisor.email.trim() : "",
      });
    } catch (error) {
      console.error("Error creating ticket:", error);
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "Hubo un error al crear el ticket",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <SkeletonFormularioCrearTicket />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <form
        className="p-4 pb-2 pt-6 max-md:px-2 bg-[#f7f7f7] shadow-2xl w-[700px] rounded-lg max-md:w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between gap-4 items-end">
            <div className="flex flex-col w-[50%] max-[768px]:w-full">
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
            {/* <div className="w-full md:w-[40%]">
              <span className="block text-lg font-medium text-gray-700 py-2">Asignar a</span>
              <SeleccionarUsuarioReceptor campos={campos} cambiarCampos={cambiarCampos} dataUsuario={dataUsuario} />
            </div> */}
            <div className="w-full md:w-[30%]">
              <span className="block text-lg font-medium text-gray-700 pb-2">
                Sector
              </span>
              <SeleccionarSector
                dataSector={dataSector}
                campos={campos}
                cambiarCampos={cambiarCampos}
              />
            </div>
            <div className="w-full md:w-[30%]">
              <span className="block text-lg font-medium text-gray-700 pb-2">
                Prioridad
              </span>
              <SeleccionarPrioridad
                campos={campos}
                cambiarCampos={cambiarCampos}
              />
            </div>
          </div>
          <div className="relative flex flex-col">
            <label className="block relative z-10 text-lg font-medium text-gray-700 pb-2">
              Descripción
            </label>
            <textarea
              id="descripcionTicket"
              name="descripcionTicket"
              value={campos.descripcionTicket}
              onChange={handleChange}
              placeholder="Escribe un mensaje"
              className="w-full bg-white h-44 py-2 px-4 m-auto outline-none resize-none border rounded-md rounded-b-none border-opacity-5 "
            />
            <label
              htmlFor="descripcionTicket"
              className="absolute flex justify-end items-center rounded-b-md bg-neutral-800 bottom-0 right-0 p-2 w-[100%] min-h-11 h-[20%]  z-[99]"
            >
              <button
                type="submit"
                className="w-md px-4 py-1 bg-blue-700 rounded-md text-white font-semibold hover:shadow-4xl transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </button>
            </label>
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
