"use client";

import { useMemo, useState } from "react";
import Alerta from "./Alerta";
import { useAuth } from "../contexts/authContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/modalContext";
import { useGetSectorPorIdUsuarioQuery } from "@/services/apiTicket";

const FormularioIniciarSesion = () => {
  const router = useRouter();
  const [campos, establecerCampos] = useState({
    idUsuario: "",
    contraseña: "",
  });
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});
  const { iniciarSesion, usuarioExistente } = useAuth();
  const { setIsModalOpen } = useModal();
  const {data} = useGetSectorPorIdUsuarioQuery("ST_usuarios");

  useMemo(() => {
    localStorage.removeItem("usuario");
  }, []);

  useMemo(() => {
    if (usuarioExistente) {
      const [usuarioActual] = data.filter(
        (user) => user.idUsuario.trim() === usuarioExistente.legajo.trim()
      );
      establecerCampos({
        idUsuario: usuarioActual.idUsuario.trim(),
      });
    }
  }, [usuarioExistente, data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    establecerCampos((prevCampos) => ({
      ...prevCampos,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    cambiarEstadoAlerta(false);
    cambiarAlerta({});
    const [usuarioActual] = data && data.filter(
      (user) => user.idUsuario.trim() === campos.idUsuario
    );
    if (campos.idUsuario === "" || campos.contraseña === "") {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "Por favor rellena todos los campos",
      });
      return;
    }
    if (usuarioActual.contraseña !== campos.contraseña) {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "La contraseña ingresada es incorrecta",
      });
      return;
    }
    if (!usuarioActual.idSector) {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "No existe el sector, comuniquese con sistemas",
      });
      return;
    }
    try {
      iniciarSesion({
        ...usuarioActual,
        correo: usuarioActual.correo.trim(),
        legajo: usuarioActual.idUsuario.trim(),
        idSector: usuarioActual.idSector,
      });
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "aceptado",
        mensaje: `¡Bienvenido/a de vuelta!`,
      });
      router.replace("/admin/ticket/tickets-de-sector");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container p-4 pb-2 pt-0">
      <h1 className="text-base font-bold w-full pt-4 pb-2 text-gray-600">
        Inicia sesión en tu cuenta de Helpdesk Unity
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto w-full bg-white rounded-md pt-2"
      >
        <div className="w-full">
          <label
            htmlFor="legajo"
            className="block text-base font-medium text-gray-700"
          >
            Legajo
          </label>
          <input
            type="text"
            id="legajo"
            name="idUsuario"
            placeholder="Ingresá tu legajo"
            value={campos.idUsuario}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-black outline-none"
            required
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="contraseña"
            className="block text-base font-medium text-gray-700"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="contraseña"
            name="contraseña"
            placeholder="Ingresá tu contraseña"
            value={campos.contraseña}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-black outline-none"
            required
          />
        </div>
        <div className="mt-6">
          <button
            as={"button"}
            type="submit"
            className="w-full py-2 px-4 bg-blue-700 hover:bg-blue-800 text-white font-bold shadow-sm transition"
          >
            Iniciar Sesión
          </button>
        </div>
        <div className="flex w-full justify-around py-6 pb-4">
          <h2 className="font-semibold">¿Todavía no te registraste?</h2>
          <Link
            href={"/auth/registrar-usuario"}
            className="text-blue-600 font-bold cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            Crea tu cuenta
          </Link>
        </div>
      </form>
      <Alerta
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        cambiarEstadoAlerta={cambiarEstadoAlerta}
      />
    </div>
  );
};

export default FormularioIniciarSesion;
