import { sucursales } from "../data/sucursales";
import { useDesplegable } from "../contexts/desplegableContext";
import { usePathname } from "next/navigation";

export const SeleccionarSector = ({ dataSector, campos, cambiarCampos }) => {
  const pathname = usePathname()
  const {
    seleccion,
    cambiarSeleccion,
    cambiarSeleccionPrioridad,
    cambiarUsuario,
  } = useDesplegable();
  const handleClick = (e) => {
    cambiarCampos({
      ...campos,
      idSector: e.currentTarget.dataset.valor,
    });
    cambiarSeleccion(false);
  };
  return (
    <>
      <div className={`flex flex-col relative z-50`}>
        <div
          id="sectorUsuario"
          className={`p-2 cursor-pointer border ${pathname === "/auth/registrar-usuario" ? "border-black rounded-none" : "border-neutral-200"} bg-white rounded-md ${
            campos.idSector != "" ? "text-black" : "text-gray-400"
          }`}
          onClick={() => {
            cambiarSeleccion(!seleccion);
            cambiarSeleccionPrioridad(false);
            cambiarUsuario(false);
          }}
        >
          {campos.idSector === "" ? "Sector" : campos.idSector}
        </div>
        {seleccion && (
          <div className="absolute overflow-x-hidden top-12 border border-neutral-200 rounded-md shadow-2xl left-0 max-h-72 backdrop-blur-sm bg-white w-full z-50">
            {dataSector &&
              dataSector.map(
                (sector) =>
                  sector.nombreSector != "Sucursal" && (
                    <div
                      key={sector.idSector}
                      data-valor={sector.nombreSector}
                      className={`p-2 cursor-pointer hover:bg-[#ececec] rounded-sm`}
                      onClick={handleClick}
                    >
                      {sector.nombreSector}
                    </div>
                  )
              )}
            {sucursales.map((sucursal) => (
              <div
                key={sucursal.idSucursal}
                data-valor={`Sucursal ${sucursal.idSucursal}`}
                className={`p-2 cursor-pointer hover:bg-[#ececec] rounded-sm`}
                onClick={handleClick}
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
