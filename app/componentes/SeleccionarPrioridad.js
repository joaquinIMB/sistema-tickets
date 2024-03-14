import { prioridad } from "../data/prioridad";
import { useDesplegable } from "../contexts/desplegableContext";

export const SeleccionarPrioridad = ({ campos, cambiarCampos }) => {
  const { seleccionPrioridad, cambiarSeleccionPrioridad, cambiarUsuario, cambiarSeleccion } = useDesplegable();
  const handleClick = () => {
    cambiarSeleccionPrioridad(!seleccionPrioridad);
    cambiarUsuario(false)
    cambiarSeleccion(false)
  };
  const handleClickPrioridad = (e) => {
    cambiarCampos({
      ...campos,
      prioridad: e.currentTarget.dataset.valor,
    });
    cambiarSeleccionPrioridad(!seleccionPrioridad);
  };

  return (
    <>
      <div className="relative ">
        <div
          className={`flex flex-col ${
            campos.prioridad ? "text-black" : "text-gray-400"
          } relative border border-neutral-200 rounded-md cursor-pointer outline-none p-2 bg-white max-h-11 min-w-full`}
          id="prioridadTicket"
          onClick={handleClick}
        >
          {campos.prioridad ? campos.prioridad : "Prioridad"}
        </div>
        {seleccionPrioridad && (
          <div
            id="menuPrioridad"
            className="absolute top-12 min-w-20 cursor-pointer border border-neutral-200 rounded-md overflow-hidden shadow-2xl z-[999] left-0 max-h-72 backdrop-blur-sm bg-white w-full "
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
