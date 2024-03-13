"use client";

import { sucursales } from "../data/sucursales";

export const SeleccionarSector = ({
  dataSector,
  seleccion,
  cambiarSeleccion,
  campos,
  cambiarCampos,
}) => {
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
            className={`p-2 cursor-pointer border border-black bg-white ${
              campos.idSector != "" ? "text-black" : "text-gray-400"
            }`}
            onClick={() => cambiarSeleccion(!seleccion)}
          >
            {campos.idSector != "" ? campos.idSector : "Sector"}
          </div>
          {seleccion && (
            <div className="absolute overflow-x-hidden top-12 border border-black shadow-2xl left-0 max-h-72 backdrop-blur-sm bg-white w-full z-50">
              {dataSector &&
                dataSector.map(
                  (sector) =>
                    sector.nombreSector != "Sucursal" && (
                      <div
                        key={sector.idSector}
                        data-valor={sector.nombreSector}
                        className={`p-2 px-4 cursor-pointer hover:bg-gray-200 w-[412px]`}
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
                  className={`p-2 px-4 cursor-pointer hover:bg-gray-200 w-[412px]`}
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
