"use client";

import { useMemo, useState } from "react";
import Alerta from "./Alerta";
import { useAuth } from "../contexts/authContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/modalContext";
import { traerUsuario } from "@/funciones/traerUsuario";

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

  useMemo(() => {
    localStorage.removeItem("usuario");
    if (usuarioExistente) {
      establecerCampos({
        idUsuario: usuarioExistente.legajo,
      });
    }
  }, [usuarioExistente]);

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
    const usuario = await traerUsuario(campos.idUsuario);
    if (campos.idUsuario === "" || campos.contraseña === "") {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "Por favor rellena todos los campos.",
      });
      return;
    }
    if (!usuario.length > 0) {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "El legajo ingresado es incorrecto.",
      });
      return;
    }
    if (usuario[0]?.contraseña !== campos.contraseña) {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "La contraseña ingresada es incorrecta.",
      });
      return;
    }
    try {
      iniciarSesion(usuario[0]);
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "aceptado",
        mensaje: `¡Bienvenido/a de vuelta!`,
      });
      router.replace("/admin/ticket/tickets-de-sector");
    } catch (error) {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "Ocurrió un error inesperado, vuelva a intentarlo.",
      });
      return;
    } finally {
      cambiarEstadoAlerta(false);
      cambiarAlerta({});
    }
  };

  return (
    <div className="container p-4 pb-2 pt-0">
      <h1 className="text-lg text-left font-bold w-full pt-2 pb-2 text-gray-600">
        Accede a tu cuenta
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
        <div className="flex w-full justify-around py-6 pb-4 gap-2">
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
