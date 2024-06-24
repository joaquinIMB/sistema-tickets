"use client";

import { useState } from "react";
import { DetalleResponsable } from "./DetalleResponsable";
import { InformacionTicket } from "./InformacionTicket";
import { useGetTicketIdQuery } from "@/services/apiTicket";
import styles from "@/componentes/offcanvas.module.css";
import Offcanvas from "./Offcanvas"; // Importa el componente Offcanvas
import { BotonMenuMovimientos } from "./BotonMenuMovimientos";

export const AsideDetalles = ({ idTicket, dataUsuario, dataSector }) => {
  const { data, error } = useGetTicketIdQuery(idTicket);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  if (error) return <div>Error: {error.message}</div>;

  const handleShowOffcanvas = () => setShowOffcanvas(true);
  const handleHideOffcanvas = () => setShowOffcanvas(false);

  return (
    <>
      {data &&
        data.map((ticket) => (
          <aside
            key={ticket.idTicket}
            className={`w-[20%] min-w-[300px] border-l border-opacity-5 relative flex flex-row gap-1 p-2 pb-3 pt-1 overflow-auto flex-wrap justify-center h-[92vh] ${styles.asideDetalles}`}
          >
            <InformacionTicket ticket={ticket} idTicket={idTicket} />
            <DetalleResponsable
              ticket={ticket}
              dataSector={dataSector}
              dataUsuario={dataUsuario}
            />
            <div className="p-4 bg-white h-[200px] min-h-[200px] border-y border-opacity-5 shadow-sm rounded-sm w-full">
              <h2 className="font-semibold text-lg">Solicitante</h2>
              <div className="flex flex-col gap-2 py-4">
                <div className="flex flex-row w-full justify-between">
                  <h3 className="font-semibold">Agente</h3>
                </div>
                <div>
                  <h5 className=" pb-1 text-neutral-600">
                    Legajo:
                    <span className="text-neutral-600 font-semibold pl-2">
                      {ticket.legajoEmisor}
                    </span>
                  </h5>
                  <h5 className="text-neutral-600 font-semibold pb-1">
                    {ticket.nombreEmisor}
                  </h5>
                  <h6 className="text-neutral-600">
                    {ticket.correoUsuarioEmisor}
                  </h6>
                </div>
              </div>
            </div>
          </aside>
        ))}
      <BotonMenuMovimientos handleShowOffcanvas={handleShowOffcanvas} />
      {showOffcanvas && (
        <Offcanvas handleClose={handleHideOffcanvas}>
          {data &&
            data.map((ticket) => (
              <div key={ticket.idTicket}>
                <InformacionTicket ticket={ticket} idTicket={idTicket} />
                <DetalleResponsable
                  ticket={ticket}
                  dataSector={dataSector}
                  dataUsuario={dataUsuario}
                />
                <div className="p-4 bg-white h-[200px] min-h-[200px] border-y border-opacity-5 shadow-sm rounded-sm w-full">
                  <h2 className="font-semibold text-lg">Solicitante</h2>
                  <div className="flex flex-col gap-2 py-4">
                    <div className="flex flex-row w-full justify-between">
                      <h3 className="font-semibold">Agente</h3>
                    </div>
                    <div>
                      <h5 className=" pb-1 text-neutral-600">
                        Legajo:
                        <span className="text-neutral-600 font-semibold pl-2">
                          {ticket.legajoEmisor}
                        </span>
                      </h5>
                      <h5 className="text-neutral-600 font-semibold pb-1">
                        {ticket.nombreEmisor}
                      </h5>
                      <h6 className="text-neutral-600">
                        {ticket.correoUsuarioEmisor}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </Offcanvas>
      )}
    </>
  );
};

// "use client";

// import { DetalleResponsable } from "./DetalleResponsable";
// import { InformacionTicket } from "./InformacionTicket";
// import { useGetTicketIdQuery } from "@/services/apiTicket";
// import styles from "@/componentes/admin.module.css";

// export const AsideDetalles = ({ idTicket, dataUsuario, dataSector }) => {
//   const { data, error } = useGetTicketIdQuery(idTicket);
//   if (error) return <div>Error: {error.message}</div>;
//   return (
//     <>
//       {data &&
//         data.map((ticket) => (
//           <aside
//             key={ticket.idTicket}
//             className={`w-[20%] min-w-[300px] border-l border-opacity-5 relative flex flex-row gap-1 p-2 pb-3 pt-1 overflow-auto flex-wrap justify-center h-[92vh] ${styles.asideDetalles}`}
//           >
//             <header className="border-y self-center border-opacity-5 w-full py-4 px-4 bg-white shadow-sm rounded-sm">
//               <h2 className="text-center font-semibold text-lg">Detalles</h2>
//             </header>
//             <InformacionTicket ticket={ticket} idTicket={idTicket}/>
//             <DetalleResponsable
//               ticket={ticket}
//               dataSector={dataSector}
//               dataUsuario={dataUsuario}
//             />
//             <div className="p-4 bg-white h-[200px] min-h-[100px] border-y border-opacity-5 shadow-sm rounded-sm w-full">
//               <h2 className="font-semibold text-lg">Solicitante</h2>
//               <div className="flex flex-col gap-2 py-4">
//                 <div className="flex flex-row w-full justify-between">
//                   <h3 className="font-semibold">Agente</h3>
//                 </div>
//                 <div>
//                   <h5 className=" pb-1 text-neutral-600">
//                     Legajo:
//                     <span className="text-neutral-600 font-semibold pl-2">
//                       {ticket.legajoEmisor}
//                     </span>
//                   </h5>
//                   <h5 className="text-neutral-600 font-semibold pb-1">
//                     {ticket.nombreEmisor}
//                   </h5>
//                   <h6 className="text-neutral-600">
//                     {ticket.correoUsuarioEmisor}
//                   </h6>
//                 </div>
//               </div>
//             </div>
//           </aside>
//         ))}
//     </>
//   );
// };
