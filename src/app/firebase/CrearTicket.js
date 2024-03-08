import { crearMovimientoTicket } from "./CrearMovimientoTicket";
import { db } from "./FirebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { traerFechaHora } from "../funciones/traerFechaHora";
import { revalidatePath } from "next/cache";

export const crearTicket = async (campos) => {
  const tickets = await fetch(`https://unity-1bc4d.firebaseapp.com/api/ticket`, {
    cache: "no-store", next:{revalidate:0}
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
        revalidatePath("/admin/ticket/tickets-sin-abrir", "page");
      })
      .catch((error) => console.log(error));
  };
  await crearMovimientoTicket({
    ...campos,
    idTicket: idTicket.toString(),
  });

  return altaTicket();
};
