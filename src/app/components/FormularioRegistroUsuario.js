"use client";

import { useState } from "react";

const FormularioRegistroUsuario = () => {
  const [nombre, cambiarNombre] = useState("");
  const [apellido, cambiarApellido] = useState("");
  const [contacto, cambiarContacto] = useState("");
  const [legajo, cambiarLegajo] = useState("");
  const [correo, cambiarCorreo] = useState("");
  const [contraseña, cambiarContraseña] = useState("");
  const [confirmarContraseña, cambiarConfirmarContraseña] = useState("");

  const handleChange = (e) => {
    switch (e.target.name) {
      case "nombre":
        cambiarNombre(e.target.value);
        break;
      case "apellido":
        cambiarApellido(e.target.value);
        break;
      case "contacto":
        cambiarContacto(e.target.value);
        break;
      case "legajo":
        cambiarLegajo(e.target.value);
        break;
      case "correo":
        cambiarCorreo(e.target.value);
        break;
      case "contraseña":
        cambiarContraseña(e.target.value);
        break;
      case "confirmarContraseña":
        cambiarConfirmarContraseña(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="max-w-md mx-auto p-4 bg-white rounded-md">
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
            name="nombre"
            value={nombre}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
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
            name="apellido"
            value={apellido}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
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
            name="legajo"
            value={legajo}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
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
            name="contacto"
            value={contacto}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
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
          value={correo}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
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
            value={contraseña}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
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
            value={confirmarContraseña}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700 py-2"
        >
          Rol del Usuario
        </label>
        <select
          id="role"
          name="role"
          value={""}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
        >
          <option value="usuario">Usuario</option>
          <option value="agente">Agente</option>
          <option value="administrador">Administrador</option>
        </select>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full px-4 py-3 bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-md hover:shadow-md transition"
        >
          Registrarse
        </button>
      </div>
    </form>
  );
};

export default FormularioRegistroUsuario;
