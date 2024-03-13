import { prioridad } from "../data/prioridad";

export const SeleccionarPrioridad = ({
  seleccionPrioridad,
  cambiarSeleccionPrioridad,
  campos,
  cambiarCampos,
  cambiarUsuario,
}) => {
  const handleClickPrioridad = (e) => {
    cambiarCampos({
      ...campos,
      prioridad: e.currentTarget.dataset.valor,
    });
  };
  const handleClick = () => {
    cambiarSeleccionPrioridad(!seleccionPrioridad);
    cambiarUsuario(false);
  };

  return (
    <>
      <div className="relative w-full">
        <div
          className={`flex flex-col ${campos.prioridad ? "text-black" : "text-gray-400"} relative border border-black cursor-pointer outline-none p-2 bg-white max-h-11 min-w-full`}
          id="prioridadTicket"
          onClick={handleClick}
        >
          {campos.prioridad ? campos.prioridad : "Prioridad"}
        </div>
        {seleccionPrioridad && (
          <div
            id="menuPrioridad"
            className="absolute top-12 cursor-pointer border border-black z-50 left-0 max-h-72 backdrop-blur-sm bg-white w-full "
          >
            {prioridad.map((e, index) => (
              <div
                key={index}
                data-valor={e}
                className={`p-2 px-4 bg-white flex flex-row justify-start hover:bg-gray-100 w-full shadow-xl`}
                onClick={handleClickPrioridad}
              >
                {e}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
