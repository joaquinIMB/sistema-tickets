export const SeleccionarUsuarioReceptor = ({
  seleccionUsuario,
  cambiarUsuario,
  campos,
  cambiarCampos,
  usuarios,
  cambiarSeleccionPrioridad,
}) => {
  const handleClick = () => {
    cambiarUsuario(!seleccionUsuario);
    cambiarSeleccionPrioridad(false);
  };
  const handleClickUsuarioReceptor = (e) => {
    cambiarCampos({
      ...campos,
      legajoAsignado: e.currentTarget.dataset.valor,
    });
  };

  return (
    <>
      <div className="relative">
        <div className="relative">
          <div
            className={`flex flex-col relative border border-black cursor-pointer ${
              campos.legajoAsignado != "" ? "text-black" : "text-gray-400"
            } bg-white outline-none min-w-full p-2 ${
              seleccionUsuario && "focus:border-blue-700"
            }`}
            id="legajoAsignado"
            onClick={handleClick}
          >
            {campos.legajoAsignado != "" && campos.legajoAsignado  != "Todos"
              ? campos.legajoAsignado + " " + campos.nombreUsuarioAsignado
              : campos.legajoAsignado === "Todos" ? campos.legajoAsignado : "Selecciona un usuario"}
          </div>
        </div>

        {seleccionUsuario && (
          <div className="absolute top-12 border border-black z-50 cursor-pointer left-0 max-h-72 backdrop-blur-sm bg-white w-full ">
            <div
              data-valor={"Todos"}
              className={`p-2 bg-white flex flex-row justify-start hover:bg-gray-100 w-full shadow-xl`}
              onClick={handleClickUsuarioReceptor}
            >
              <p className="px-2 pointer-events-none">Todo el sector</p>
            </div>
            {usuarios &&
              usuarios.map((usuario) => (
                <>
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
                </>
              ))}
          </div>
        )}
      </div>
    </>
  );
};
