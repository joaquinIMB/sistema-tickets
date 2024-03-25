import { crearMovimientoTicket } from "./CrearMovimientoTicket";
import { db } from "./FirebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { traerFechaHora } from "../funciones/traerFechaHora";

export const crearTicket = async (campos) => {
  const API_URL =
    process.env.NODE_ENV === "production"
      ? "https://helpdeskunity.netlify.app/api/ticket"
      : "http://127.0.0.1:3000/api/ticket";

  const tickets = await fetch(`${API_URL}`, {
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));

  const idTicket = tickets.length + 1;
  const fechaHora = traerFechaHora();

  const altaTicket = async () => {
    const docRef = doc(db, "tickets", `${idTicket.toString()}`);
    return await setDoc(docRef, {
      ...campos,
      idTicket: idTicket.toString(),
      fechaHoraRegistro: fechaHora,
    })
      .then(() => {
        console.log(`Ticket ${idTicket.toString()} agregado`);
      })
      .catch((error) => console.log(error));
  };
  await crearMovimientoTicket({
    ...campos,
    idTicket: idTicket.toString(),
  });
  return altaTicket();
};
