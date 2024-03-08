import Image from "next/image";
import { estados } from "../data/estados";

export const SeleccionarEstado = ({
  desplegar,
  setDesplegar,
  campos,
  cambiarCampos,
}) => {
  const handleClick = (e) => {
    cambiarCampos({
      ...campos,
      idEstado: e.currentTarget.dataset.valor,
    });
    setDesplegar(!desplegar);
  };
  return (
    <>
      <div className="relative self-center">
        <div
          onClick={() => setDesplegar(!desplegar)}
          className={`flex px-4 py-1 cursor-pointer capitalize items-center gap-2 ${
            desplegar && "bg-[#ececec]"
          } text-[#00000090] rounded-md border border-[#00000080] bg-[#f5f5f5] font-semibold hover:shadow-4xl transition`}
        >
          {campos.idEstado ? campos.idEstado : "Nuevo estado"}

          <Image
            src={"/flecha.png"}
            className={`${
              desplegar === true ? "rotate-90" : "rotate-[270deg] duration-100"
            } transition-all duration-200 w-3`}
            alt="Boton para desplegar tipos de estado"
            width={100}
            height={100}
          />
        </div>
        {desplegar && (
          <ul
            className={`absolute shadow-md p-2 rounded-md bottom-12 z-50 right-0 bg-[#f5f5f5] w-full`}
          >
            {estados &&
              estados.map((estado) => (
                <li
                  className={
                    "p-2 px-3 capitalize font-medium cursor-pointer text-[#00000090] hover:bg-[#ececec] rounded-md"
                  }
                  key={estado}
                  data-valor={estado}
                  onClick={handleClick}
                >
                  {estado}
                </li>
              ))}
          </ul>
        )}
      </div>
    </>
  );
};
