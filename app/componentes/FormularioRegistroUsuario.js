"use client";

import { useEffect, useState } from "react";
import Alerta from "./Alerta";
import Link from "next/link";
import { SeleccionarSector } from "./SeleccionarSector";
import ModalLegajo from "./ModalLegajo";
import { useModal } from "@/contexts/modalContext";
import { useAuth } from "@/contexts/authContext";
import { useUpdateDataUsuarioMutation } from "@/services/apiTicket";
import { useRouter } from "next/navigation";

const FormularioRegistroUsuario = ({ dataSector, dataUsuarios }) => {
  const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();
  const { setUsuarioExistente } = useAuth();
  const [actualizarDatosUser] = useUpdateDataUsuarioMutation();
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});
  const [legajo, setLegajo] = useState("");
  const [dataUser, setDataUser] = useState();
  const router = useRouter();

  const [campos, cambiarCampos] = useState({
    idUsuario: "",
    idSector: "",
    nombreUsuario: "",
    apellidoUsuario: "",
    correo: "",
    contraseña: "",
    confirmarContraseña: "",
  });

  useEffect(() => {
    if (dataUser) {
      if (dataUser.length > 0) {
        const user = dataUser[0];

        const allFieldsFilled = Object.values(user).every(
          (value) => value !== "" && value !== null && value !== undefined
        );

        if (allFieldsFilled) {
          cambiarEstadoAlerta(true);
          cambiarAlerta({
            tipo: "correcto",
            mensaje: "¡Ya se encuentra registrado!",
          });
          setUsuarioExistente({
            legajo: user.idUsuario,
          });
          setTimeout(() => {
            router.push("/auth/iniciar-sesion");
          }, 2000);
          return;
        }

        cambiarCampos((prevCampos) => ({
          ...prevCampos,
          idUsuario: user ? user.idUsuario : "",
          nombreUsuario: user.nombreUsuario || "",
          apellidoUsuario: user.apellidoUsuario || "",
          correo: user.correo || "",
          idSector: user.idSector || "",
          contraseña: user.contraseña || "",
          confirmarContraseña: user.contraseña || "",
        }));
        handleCloseModal();
      } else {
        cambiarEstadoAlerta(true);
        cambiarAlerta({
          tipo: "error",
          mensaje: "El legajo no existe, o es incorrecto",
        });
      }
    }
  }, [dataUser, handleCloseModal, router, setUsuarioExistente]);

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
    if (validarCampos()) {
      return;
    }
    if (!expresionRegular.test(campos.correo)) {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "Por favor ingresa un correo válido",
      });
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
      await actualizarDatosUser({
        idSector: campos.idSector,
        idUsuario: campos.idUsuario,
      });
      setUsuarioExistente({
        legajo: campos.idUsuario,
      });
      setTimeout(() => {
        router.replace("/auth/iniciar-sesion");
      }, 2000);
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "aceptado",
        mensaje: `¡Sector registrado correctamente!`,
      });
      handleOpenModal();
    } catch (error) {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: `Hubo un error al intentar crear la cuenta: ${error}`,
      });
    }
  };

  return (
    <div className="container p-0 pb-2">
      <h1 className="text-base font-bold mb- w-full px-4 pt-4 pb-2 text-gray-600">
        Registrate para comenzar.
      </h1>
      <form
        className="max-w-md mx-auto py-0 p-4 bg-white "
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="nombre"
              className="block text-base font-medium text-gray-700 py-3 pb-2"
            >
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombreUsuario"
              placeholder="Nombre completo"
              value={campos.nombreUsuario}
              onChange={handleChange}
              className="bg-white p-2 w-full border border-black outline-none capitalize"
            />
          </div>
          <div>
            <label
              htmlFor="apellido"
              className="block text-base font-medium text-gray-700 py-3 pb-2"
            >
              Apellido
            </label>
            <input
              type="text"
              id="apellido"
              name="apellidoUsuario"
              placeholder="Apellido"
              value={campos.apellidoUsuario}
              onChange={handleChange}
              className="bg-white p-2 w-full border border-black outline-none "
            />
          </div>
        </div>
        <div>
          {campos.idSector ? (
            <div>
              <label
                htmlFor="legajo"
                className="block text-base font-medium text-gray-700 py-3 pb-2"
              >
                Sector
              </label>
              <input
                type="text"
                id="sector"
                name="idSector"
                placeholder="Sector actual"
                value={campos.idSector}
                onChange={handleChange}
                className="bg-white p-2 w-full border border-black outline-none "
              />
            </div>
          ) : (
            <div className="w-[100%]">
              <span className="block text-lg font-medium text-gray-700 py-2">
                Sector
              </span>
              <SeleccionarSector
                dataSector={dataSector}
                campos={campos}
                cambiarCampos={cambiarCampos}
              />
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="legajo"
              className="block text-base font-medium text-gray-700 py-3 pb-2"
            >
              Legajo
            </label>
            <input
              type="text"
              id="legajo"
              name="idUsuario"
              placeholder="Legajo asignado"
              value={campos.idUsuario}
              onChange={handleChange}
              className="bg-white p-2 w-full border border-black outline-none "
            />
          </div>
          {/* <div>
            <label
              htmlFor="contacto"
              className="block text-base font-medium text-gray-700 py-3 pb-2"
            >
              Contacto
            </label>
            <input
              type="text"
              id="contacto"
              name="telefonoContacto"
              placeholder="Número celular"
              value={campos.telefonoContacto}
              onChange={handleChange}
              className="bg-white p-2 w-full border border-black outline-none "
            />
          </div> */}
        </div>

        <div>
          <label
            htmlFor="correo"
            className="block text-base font-medium text-gray-700 py-3 pb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="correo"
            name="correo"
            placeholder="Correo electrónico"
            value={campos.correo}
            onChange={handleChange}
            className="bg-white p-2 w-full border border-black outline-none "
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="contraseña"
              className="block text-base font-medium text-gray-700 py-3 pb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="contraseña"
              name="contraseña"
              placeholder="Creá tu contraseña"
              value={campos.contraseña}
              onChange={handleChange}
              className="bg-white p-2 w-full border border-black outline-none "
            />
          </div>
          <div>
            <label
              htmlFor="confirmarContraseña"
              className="block text-base font-medium text-gray-700 py-3 pb-2"
            >
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirmarContraseña"
              name="confirmarContraseña"
              value={campos.confirmarContraseña}
              placeholder="Repetí tu contraseña"
              onChange={handleChange}
              className="bg-white p-2 w-full border border-black outline-none "
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            as={"button"}
            type="submit"
            className="w-full py-2 px-4 bg-blue-700 hover:bg-blue-800 text-white font-bold shadow-sm transition"
          >
            Registrarse
          </button>
        </div>
        <div className="flex w-full justify-around p-6 py-3">
          <h2 className="font-semibold">¿Ya tenés una cuenta?</h2>
          <Link
            href={"/auth/iniciar-sesion"}
            className="text-blue-600 font-bold cursor-pointer"
          >
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
      {isModalOpen && (
        <ModalLegajo
          dataUsuarios={dataUsuarios}
          legajo={legajo}
          setLegajo={setLegajo}
          setDataUser={setDataUser}
          cambiarEstadoAlerta={cambiarEstadoAlerta}
          cambiarAlerta={cambiarAlerta}
        />
      )}
    </div>
  );
};

export default FormularioRegistroUsuario;
