"use client";

import Link from "next/link";
import { useState } from "react";
import Alerta from "./Alerta";
import { useAuth } from "./contexts/authContext";
import { useRouter } from "next/navigation";
import { Loader } from "./Loader";

const FormularioRegistroUsuario = () => {
  const [campos, cambiarCampos] = useState({
    idUsuario: "",
    nombreUsuario: "",
    apellidoUsuario: "",
    telefonoContacto: "",
    correo: "",
    contraseña: "",
    confirmarContraseña: "",
  });
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});
  const { registrarUsuario, usuario } = useAuth();
  const router = useRouter();

  if (usuario.logged === true) {
    router.replace("/panel");
  }

  const validarCampos = () => {
    const camposVacios = Object.values(campos).some((valor) => valor === "");
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
    cambiarCampos((prevCampos) => ({
      ...prevCampos,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    cambiarEstadoAlerta(false);
    cambiarAlerta({});
    const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    if (!expresionRegular.test(campos.correo)) {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "Por favor ingresa un correo válido",
      });
      return;
    }
    if (validarCampos()) {
      return;
    }
    if (campos.contraseña !== campos.confirmarContraseña) {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "Las contraseñas no coinciden",
      });
      return;
    }
    try {
      await registrarUsuario(campos);
      router.replace("/panel");
      cambiarCampos({
        idUsuario: "",
        nombreUsuario: "",
        apellidoUsuario: "",
        telefonoContacto: "",
        correo: "",
        contraseña: "",
        confirmarContraseña: "",
      });
    } catch (error) {
      switch (error.code) {
        case "auth/weak-password":
          cambiarEstadoAlerta(true);
          cambiarAlerta({
            tipo: "error",
            mensaje: "La contraseña tiene que ser de al menos 6 caracteres",
          });
          break;
        case "auth/email-already-in-use":
          cambiarEstadoAlerta(true);
          cambiarAlerta({
            tipo: "error",
            mensaje:
              "Ya existe una cuenta con el correo electrónico proporcionado",
          });
          break;
        case "auth/invalid-email":
          cambiarEstadoAlerta(true);
          cambiarAlerta({
            tipo: "error",
            mensaje: "El correo electrónico no es válido",
          });
          break;
        default:
          console.log(error);
          cambiarEstadoAlerta(true);
          cambiarAlerta({
            tipo: "error",
            mensaje: "Hubo un error al intentar crear la cuenta",
          });
          break;
      }
    }
  };

  return usuario ? (
    <Loader />
  ) : (
    <>
      <h1 className="text-base font-bold mb- w-full px-4">
        Registrate para comenzar.
      </h1>
      <form
        className="max-w-md mx-auto p-4 bg-white rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700 py-2"
            >
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombreUsuario"
              value={campos.nombreUsuario}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="apellido"
              className="block text-sm font-medium text-gray-700 py-2"
            >
              Apellido
            </label>
            <input
              type="text"
              id="apellido"
              name="apellidoUsuario"
              value={campos.apellidoUsuario}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="legajo"
              className="block text-sm font-medium text-gray-700 py-2"
            >
              Legajo
            </label>
            <input
              type="text"
              id="legajo"
              name="idUsuario"
              value={campos.idUsuario}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="contacto"
              className="block text-sm font-medium text-gray-700 py-2"
            >
              Contacto
            </label>
            <input
              type="number"
              id="contacto"
              name="telefonoContacto"
              value={campos.telefonoContacto}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="correo"
            className="block text-sm font-medium text-gray-700 py-2"
          >
            Email
          </label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={campos.correo}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="contraseña"
              className="block text-sm font-medium text-gray-700 py-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="contraseña"
              name="contraseña"
              value={campos.contraseña}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="confirmarContraseña"
              className="block text-sm font-medium text-gray-700 py-2"
            >
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirmarContraseña"
              name="confirmarContraseña"
              value={campos.confirmarContraseña}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            as={"button"}
            type="submit"
            className="w-full px-4 py-3 bg-blue-700  text-white font-semibold rounded-md hover:shadow-4xl transition"
          >
            Registrarse
          </button>
        </div>
        <div className="flex w-full justify-around p-6">
          <h2 className="font-semibold">¿Ya tenés una cuenta?</h2>
          <Link href={"/iniciar-sesion"} className="text-blue-600 font-bold">
            Inicia sesión
          </Link>
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

export default FormularioRegistroUsuario;
