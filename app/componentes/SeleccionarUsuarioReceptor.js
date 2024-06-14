import { useDesplegable } from "../contexts/desplegableContext";
import { useState } from "react";

export const SeleccionarUsuarioReceptor = ({
  campos,
  cambiarCampos,
  dataUsuario,
}) => {
  const {
    seleccionUsuario,
    cambiarUsuario,
    cambiarSeleccion,
    cambiarSeleccionPrioridad,
  } = useDesplegable();

  const [searchTerm, setSearchTerm] = useState("");

  const handleClick = () => {
    cambiarUsuario(!seleccionUsuario);
    cambiarSeleccion(false);
    cambiarSeleccionPrioridad(false);
  };

  const handleClickUsuarioReceptor = (e) => {
    cambiarCampos({
      ...campos,
      legajoAsignado: e.currentTarget.dataset.valor,
    });
    cambiarUsuario(!seleccionUsuario);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtrar usuarios basados en el término de búsqueda
  const filteredUsuarios = dataUsuario.filter((usuario) =>
    `${usuario.nombreUsuario} ${usuario.apellidoUsuario}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="relative">
        <div className="relative">
          <div
            className={`flex flex-col relative border border-neutral-200 rounded-md cursor-pointer ${
              campos.legajoAsignado !== "" ? "text-black" : "text-gray-400"
            } bg-white outline-none min-w-full p-2 ${
              seleccionUsuario && "focus:border-blue-700"
            }`}
            id="legajoAsignado"
            onClick={handleClick}
          >
            {campos.legajoAsignado !== "" && campos.legajoAsignado !== "Todos"
              ? campos.legajoAsignado + " " + campos.nombreUsuarioAsignado
              : campos.legajoAsignado === "Todos"
              ? campos.legajoAsignado
              : "Selecciona un usuario"}
          </div>
        </div>

        {seleccionUsuario && (
          <div className="absolute overflow-auto top-12 border border-neutral-200 rounded-md shadow-2xl z-50 cursor-pointer left-0 max-h-72 backdrop-blur-sm bg-white w-full">
            <input
              type="text"
              placeholder="Buscar usuario..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-2 border-b border-neutral-200 outline-none pl-4"
            />
            <div
              data-valor={"Todos"}
              className={`p-2 bg-white flex flex-row justify-start hover:bg-gray-100 w-full shadow-xl`}
              onClick={handleClickUsuarioReceptor}
            >
              <p className="px-2 pointer-events-none">Todo el sector</p>
            </div>
            {filteredUsuarios &&
              filteredUsuarios.map((usuario) => (
                <div
                  key={usuario.idUsuario}
                  id="menuLegajoEmisor"
                  data-valor={usuario.idUsuario}
                  className={`p-2 bg-white flex flex-row justify-start hover:bg-gray-100 w-full shadow-xl`}
                  onClick={handleClickUsuarioReceptor}
                >
                  <p className="px-2 pointer-events-none">
                    {usuario.nombreUsuario + " " + usuario.apellidoUsuario}
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};
