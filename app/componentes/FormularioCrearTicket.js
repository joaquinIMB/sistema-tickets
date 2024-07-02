"use client";

import { useAuth } from "../contexts/authContext";
import { useEffect, useState, useMemo } from "react";
import { SeleccionarUsuarioReceptor } from "./SeleccionarUsuarioReceptor";
import { SeleccionarSector } from "./SeleccionarSector";
import { SeleccionarPrioridad } from "./SeleccionarPrioridad";
import {
  useCreateMovimientoTicketMutation,
  useGetTicketsQuery,
  useCreateTicketMutation,
} from "@/services/apiTicket";
import { traerFechaHora } from "@/funciones/traerFechaHora";
import Alerta from "./Alerta";
import { SkeletonFormularioCrearTicket } from "@/elementos/skeletons/SkeletonFormCrearTicket";

const FormularioCrearTicket = ({ dataUsuario, dataSector }) => {
  const { usuario } = useAuth();
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});
  const { data, error, isLoading, refetch } = useGetTicketsQuery();
  const [crearTicket] = useCreateTicketMutation();
  const [crearMovimientoTicket] = useCreateMovimientoTicketMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const usuarioEmisor = useMemo(() => {
    return dataUsuario.find((user) => user.correo.trim() === usuario.email);
  }, [dataUsuario, usuario.email]);

  const [campos, cambiarCampos] = useState({
    tituloTicket: "",
    descripcionTicket: "",
    prioridad: "",
    idEstado: "nuevo",
    idSector: "",
    nombreUsuarioAsignado: "",
    legajoAsignado: "",
    nombreEmisor: usuarioEmisor
      ? `${usuarioEmisor.nombreUsuario} ${usuarioEmisor.apellidoUsuario}`
      : "",
    legajoEmisor: usuarioEmisor ? usuarioEmisor.idUsuario : "",
    correoUsuarioEmisor: usuarioEmisor ? usuarioEmisor.correo.trim() : "",
  });

  const usuarioAsignado = useMemo(() => {
    return dataUsuario.find(
      (usuario) => usuario.idUsuario === campos.legajoAsignado
    );
  }, [dataUsuario, campos.legajoAsignado]);

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
    if (campos.legajoAsignado !== "Todos" && usuarioAsignado) {
      cambiarCampos((prevcampos) => ({
        ...prevcampos,
        idSector: usuarioAsignado.idSector,
        nombreUsuarioAsignado: `${usuarioAsignado.nombreUsuario} ${usuarioAsignado.apellidoUsuario}`,
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
    }
    setIsSubmitting(true);
    try {
      await refetch();
      const idTicket = data.length + 1;
      await crearTicket({
        ...campos,
        idTicket,
        fechaHoraRegistro: fechaHora,
      });
      await crearMovimientoTicket({
        idMovimientoTicket: 1,
        idTicket,
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
        nombreEmisor: `${usuarioEmisor.nombreUsuario} ${usuarioEmisor.apellidoUsuario}`,
        legajoEmisor: usuarioEmisor.idUsuario,
        correoUsuarioEmisor: usuarioEmisor.correo.trim(),
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
        className="w-full md:w-[80%] p-3 py-0 px-4 md:px-8 mt-4"
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
              className="p-2 px-4 w-full border border-neutral-200 h-72 max-md:h-40 rounded-lg outline-none resize-none"
            />
            <div className="mt-6 absolute bottom-0 right-0">
              <button
                type="submit"
                className="w-md px-4 py-2 m-2 bg-blue-700 rounded-md text-white font-semibold hover:shadow-4xl transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
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
