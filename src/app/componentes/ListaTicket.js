import { Ticket } from "@/app/componentes/Ticket";

const ListaTicket = async ({ estado }) => {
  const data = await fetch(`http://localhost:3000/api/ticket/${estado}`, {
    cache: "no-store",
  })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));

  return data != "" || data != undefined ? (
    data.map((ticket) => {
      return (
        <>
          <Ticket key={ticket.idTicket} ticket={ticket} />
        </>
      );
    })
  ) : (
    <h1 key={""}>no se pudo encontrar</h1>
  );
};

export default ListaTicket;
