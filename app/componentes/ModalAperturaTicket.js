import styles from "@/componentes/admin.module.css"

export const ModalAperturaTicket = ({ setPopUp, handleClick, ticket }) => {
  return (
    <div
      className={` ${styles.modal}`}
      onClick={() => setPopUp(false)}
    >
      <div className="flex p-4 flex-col justify-center gap-3 w-80 bg-[#efefef] absolute z-[999] overflow-hidden shadow-xl rounded-md">
        <h1 className="text-black font-semibold">
          ¿Quiere realizar la apertura del ticket {ticket.idTicket}?
        </h1>
        <div className="flex flex-row w-full justify-center gap-4">
          <button
            className="w-md px-4 py-1 bg-blue-700 text-white font-semibold hover:shadow-4xl transition rounded-sm"
            onClick={handleClick}
          >
            Aceptar
          </button>
          <button
            className="w-md px-4 py-1 bg-neutral-800 text-white font-semibold hover:shadow-4xl transition rounded-sm"
            onClick={() => setPopUp(false)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
