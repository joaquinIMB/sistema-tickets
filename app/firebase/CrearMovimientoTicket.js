import { db } from "./FirebaseConfig";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { traerFechaHora } from "../funciones/traerFechaHora";
import { revalidatePath } from "next/cache";

export const crearMovimientoTicket = async (campos) => {
  const fechaHora = traerFechaHora();
  const movTickets = await fetch(
    `https://helpdeskunity.netlify.app/api/ticket/movimientos-ticket/movimientos/${campos.idTicket}`,
    {
      cache: "no-store"
    }
  )
    .then((res) => res.json())
    .catch((error) => console.log(error));

  const idMovTicket = movTickets.length + 1;

  const docRef = collection(db, "movimientoTicket");
  try {
    await addDoc(docRef, {
      idMovimientoTicket: idMovTicket.toString(),
      idTicket: campos.idTicket,
      idSector: campos.idSector,
      idEstado: campos.idEstado,
      prioridad: campos.prioridad,
      legajoEmisor: campos.legajoEmisor,
      legajoAsignado: campos.legajoAsignado,
      fechaHoraRegistro: fechaHora,
      descripcionMovimiento: campos.descripcionMovimiento || "",
    });
    console.log(`Movimiento de ticket ${idMovTicket.toString()} agregado`);
    revalidatePath("/admin/ticket/movimientos-ticket/[idTicket]", "page");
  } catch (error) {
    console.log(error);
  }
};

export const actualizarAperturaTicket = async (campos) => {
  if (campos || campos.idTicket) {
    const ticketRef = doc(db, "tickets", `${campos.idTicket}`);
    try {
      await updateDoc(ticketRef, {
        ...campos,
      })
    } catch (error) {
      console.log(error);
    }
  }
};
