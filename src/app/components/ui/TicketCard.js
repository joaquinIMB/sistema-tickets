import Image from "next/image";

export const TicketCard = ({
  id,
  estado,
  fechaCreacion,
  mensaje,
  usuarioEmisor,
  nroTicket
}) => {
  return (
    <>
      <div id={id} className="w-full max-w-md py-2 px-4 flex flex-col h-80 gap-10 justify-center bg-white border-[1px] border-gray-300 border-opacity-50 rounded-sm mb-7">
        <div className="p-0 flex gap-2">
          <div className="flex items-center gap-4 text-sm">
              <span className="text-sm text-gray-500">Creado por: {usuarioEmisor}</span>
          </div>
        </div>
        <div className="items-center gap-4 p-0">
          <div className="flex flex-col items-center gap-4">
            <div className="text-lg">Ticket</div>
            <div className="text-xs">Ticket ID: {nroTicket}</div>
            <div className="bg-gradient-to-bl from-red-700 to-red-600  px-3 rounded-full flex justify-between items-center py-2">
              <Image src={"/boleto.png"} width={30} height={100} alt="Logo ilustrativo de un boleto"/>
              <span className="text-sm ml-4 text-white">
                Estado: {estado}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          {/* <div className="flex gap-2 items-center">
            <span className="text-sm">
              Message: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </span>
          </div> */}
        </div>
        <div className="flex items-center gap-4 text-sm justify-end">
          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-500">{fechaCreacion}</span>
          </div>
        </div>
      </div>
    </>
  );
};
