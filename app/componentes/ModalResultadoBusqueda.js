import styles from "@/componentes/admin.module.css";
import { useRouter } from "next/navigation";

export const ModalResultadoBusqueda = ({ data, setModalBusqueda }) => {
  const router = useRouter();
  return (
    <div
      className={`${styles.modalBackdrop}`}
      onClick={() => setModalBusqueda(false)}
    >
      <div
        className={`${styles.modalBusqueda} max-md:w-[95%]`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col bg-white rounded-md shadow-lg">
          {data?.length ? (
            data.map((ticket) => (
              <div
                key={ticket.idticket}
                className="flex flex-col border-b border-gray-200 p-2 cursor-pointer rounded-md max-lg:text-black hover:bg-[#f0f0f0]"
                onClick={() => {
                  router.replace(
                    `/admin/ticket/movimientos-ticket/${ticket.idticket}`
                  );
                  setModalBusqueda(false);
                }}
              >
                <div className="flex justify-between">
                  <span className="font-semibold">{ticket.nombreEmisor}</span>
                  <span className="text-sm text-gray-600">
                    {ticket.fechaHoraRegistro}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">{ticket.tituloTicket}</span>
                  <span
                    className={`text-sm py-1 px-2 rounded-full capitalize ${getColorByEstado(
                      ticket.idEstado
                    )}`}
                  >
                    {ticket.idEstado}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Prioridad: {ticket.prioridad}</span>
                  <span>Sector origen: {ticket.idSector}</span>
                </div>
              </div>
            ))
          ) : (
            <span>No se encontraron resultados</span>
          )}
        </div>
      </div>
    </div>
  );
};

const getColorByEstado = (estado) => {
  switch (estado) {
    case "abierto":
      return "bg-red-500 text-white";
    case "pendiente":
      return "bg-yellow-500 text-white";
    case "proceso":
      return "bg-blue-500 text-white";
    case "resuelto":
      return "bg-green-500 text-white";
    case "anulado":
      return "bg-gray-500 text-white";
    case "revision":
      return "bg-purple-500 text-white";
    default:
      return "bg-gray-300 text-black";
  }
};
