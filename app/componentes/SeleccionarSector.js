import { sucursales } from "@/data/sucursales";
import { useDesplegable } from "@/contexts/desplegableContext";
import { usePathname } from "next/navigation";

export const SeleccionarSector = ({ dataSector, campos, cambiarCampos }) => {
  const pathname = usePathname();
  const {
    seleccion,
    cambiarSeleccion,
    cambiarSeleccionPrioridad,
    cambiarUsuario,
  } = useDesplegable();

  const handleSelect = (e) => {
    cambiarCampos({
      ...campos,
      idSector: e.currentTarget.dataset.valor,
      legajoAsignado: "Todos"
    });
    cambiarSeleccion(false);
  };

  const handleClick = () => {
    cambiarSeleccion(!seleccion);
    cambiarSeleccionPrioridad(false);
    cambiarUsuario(false);
  };

  return (
    <>
      <div className={`flex flex-col relative z-50`}>
        <div
          id="sectorUsuario"
          className={`p-2 cursor-pointer border ${
            pathname === "/auth/registrar-usuario"
              ? "border-black rounded-none"
              : "border-neutral-200"
          } bg-white rounded-md ${
            campos.idSector != "" ? "text-black" : "text-gray-400"
          }`}
          onClick={handleClick}
        >
          {campos.idSector === "" ? "Selecciona tu sector" : campos.idSector}
        </div>
        {seleccion && (
          <div className="absolute overflow-auto top-12 border border-neutral-200 rounded-md shadow-2xl left-0 max-h-72 backdrop-blur-sm bg-white w-full z-50">
            {dataSector &&
              dataSector.map(
                (sector) =>
                  sector.nombreSector != "Sucursal" && (
                    <div
                      key={sector.idSector}
                      data-valor={sector.nombreSector}
                      className={`p-2 cursor-pointer hover:bg-[#ececec] rounded-sm`}
                      onClick={handleSelect}
                    >
                      {sector.nombreSector}
                    </div>
                  )
              )}
            {sucursales.map((sucursal) => (
              <div
                key={sucursal.idSucursal}
                data-valor={`${sucursal.idSucursal}`}
                className={`p-2 cursor-pointer hover:bg-[#ececec] rounded-sm`}
                onClick={handleSelect}
              >
                {`Sucursal ${sucursal.idSucursal}`}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
