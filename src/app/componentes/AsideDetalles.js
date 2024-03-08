export const AsideDetalles = async ({ ticket, dataMovimientos }) => {
  const dataUsuario = await fetch(`https://unity-1bc4d.firebaseapp.com/api/ticket/usuarios`, {
    cache: "no-store", next:{revalidate:0}
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));

  const usuarioEmisor = dataUsuario.map(
    (user) => (user.idUsuario = ticket.legajoAsignado)
  );
  return (
    <>
      {usuarioEmisor && (
        <aside className="w-[20%] min-w-[300px] border-l border-opacity-5 relative flex flex-row gap-2 p-2 overflow-auto flex-wrap justify-center h-[92vh]">
          <header className="border-y border-opacity-5 w-full p-4 bg-white shadow-sm rounded-sm">
            <h2 className="text-center font-semibold text-lg">Detalles</h2>
          </header>
          <div className="py-4 px-6 bg-white h-[250px] min-h-[250px] border-y border-opacity-5 shadow-sm rounded-sm  w-full">
            <h2 className="font-semibold text-lg">Información de Ticket</h2>
            <ul
              key={ticket.idTicket}
              className="pt-3 pb-4 flex flex-col gap-3 text-gray-500"
            >
              <li>
                Ticket ID:
                <span className="text-neutral-600 pl-2 font-semibold">
                  {ticket.idTicket}
                </span>
              </li>
              <li>
                Creación:
                <span className="text-neutral-600 pl-2 font-semibold">
                  {ticket.fechaHoraRegistro}
                </span>
              </li>
              <li>
                Ultimo movimiento:
                <span className="text-neutral-600 pl-2 font-semibold"></span>
              </li>
              <li>
                Estado:
                <span className="text-neutral-600 pl-2 font-semibold capitalize">
                  {ticket.idEstado}
                </span>
              </li>
              <li>
                Prioridad:
                <span className="text-neutral-600 pl-2 font-semibold">
                  {ticket.prioridad}
                </span>
              </li>
            </ul>
          </div>
          <div className="py-4 px-6 bg-white h-[250px] min-h-[250px] border-y border-opacity-5 shadow-sm rounded-sm w-full">
            <h2 className="font-semibold text-lg">Responsable</h2>
            <div className="flex flex-col gap-2 pt-4">
              <div className="flex flex-row w-full justify-between">
                <h3 className="font-semibold">Sector</h3>
                <h4 className="text-blue-700 font-semibold cursor-pointer">
                  Editar
                </h4>
              </div>
              <h5 className="text-neutral-600 font-semibold">
                {ticket.idSector}
              </h5>
            </div>
            <div className="flex flex-col gap-2 py-4">
              <div className="flex flex-row w-full justify-between">
                <h3 className="font-semibold">Agente</h3>
                <h4 className="text-blue-700 font-semibold cursor-pointer">
                  Editar
                </h4>
              </div>
              <div>
                <h5 className="text-neutral-600 font-semibold pb-1">
                  {ticket.nombreUsuarioAsignado}
                </h5>
                <h6 className="text-neutral-600">{usuarioEmisor.correo}</h6>
              </div>
            </div>
          </div>
          <div className="py-4 px-6 bg-white h-[240px] min-h-[240px] border-y border-opacity-5 shadow-sm rounded-sm w-full">
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
      )}
    </>
  );
};
