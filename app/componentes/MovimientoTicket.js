export const MovimientoTicket = async ({ dataMovimientos }) => {
  const dataUsuario = await fetch(`https://helpdeskunity.netlify.app/api/ticket/usuarios`, {
    cache: "no-store",
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));

  let ultimoMovimiento = null;
  let emisorMovimiento = null;
  let usuarioEmisor = null;

  if (dataMovimientos && dataMovimientos.length > 0) {
    ultimoMovimiento = dataMovimientos[dataMovimientos.length - 1];
    emisorMovimiento = ultimoMovimiento.legajoEmisor;
    // Buscar el usuario emisor en la lista de usuarios
    usuarioEmisor = dataUsuario.find(
      (user) => user.idUsuario === emisorMovimiento
    );
  }
  return (
    <>
      {dataMovimientos &&
        dataMovimientos.map((movimiento) => {
          if (movimiento.idEstado != "nuevo") {
            return (
              <section
                key={movimiento.idMovimientoTicket}
                className="w-[80%] border border-black border-opacity-5 h-auto rounded-md overflow-hidden relative"
              >
                <header className="flex flex-row justify-between bg-neutral-800 min-h-[22%] py-1 px-4">
                  <div className="flex flex-col w-[25%]">
                    <h1 className=" text-base text-[#fcfcfc]">
                      {usuarioEmisor
                        ? `${usuarioEmisor.nombreUsuario} ${usuarioEmisor.apellidoUsuario}`
                        : ""}
                    </h1>
                  </div>
                  <div className="flex flex-col text-end text-base w-[25%]">
                    <span className="text-[#fcfcfc]">
                      {movimiento.fechaHoraRegistro}
                    </span>
                  </div>
                </header>

                <main className="bg-white min-h-18">
                  <p className="p-4 break-words">
                    {movimiento.descripcionMovimiento !== ""
                      ? movimiento.descripcionMovimiento
                      : `Cambió el estado a ${movimiento.idEstado}`}
                  </p>
                </main>
              </section>
            );
          }
        })}
    </>
  );
};
