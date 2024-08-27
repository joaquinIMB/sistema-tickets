import styles from "@/componentes/admin.module.css"

export const ModalAperturaTicket = ({ setPopUp, handleClick, ticket }) => {
  return (
    <div
      className={` ${styles.modal}`}
      onClick={() => setPopUp(false)}
    >
      <div className="flex p-4 flex-col justify-center gap-4 w-[340px] bg-[#efefef] absolute z-[999] overflow-hidden shadow-xl rounded-md">
        <h1 className="text-black font-semibold">
          ¿Quiere realizar la apertura del ticket {ticket.idTicket}?
        </h1>
        <div className="flex flex-row w-full justify-center gap-6">
          <button
            className="w-md px-4 py-1 bg-blue-700 text-white font-semibold hover:shadow-4xl transition rounded-md"
            onClick={handleClick}
          >
            Aceptar
          </button>
          <button
            className="w-md px-4 py-1 bg-neutral-800 text-white font-semibold hover:shadow-4xl transition rounded-md"
            onClick={() => setPopUp(false)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
