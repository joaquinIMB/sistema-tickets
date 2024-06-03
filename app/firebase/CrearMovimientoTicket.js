import { db } from "./FirebaseConfig";
import { updateDoc, doc, setDoc } from "firebase/firestore";
import { traerFechaHora } from "../funciones/traerFechaHora";

export const crearMovimientoTicket = async (campos) => {
  const fechaHora = traerFechaHora();

  const movTickets = await fetch(`${API_URL}/movimientos/${campos.idTicket}`, {
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));

  const idMovTicket = movTickets.length + 1;

  const docRef = doc(db, "movimientoTicket", campos.idTicket + idMovTicket);
  try {
    await setDoc(docRef, {
      idMovimientoTicket: idMovTicket.toString(),
      idTicket: campos.idTicket,
      idSector: campos.idSector,
      idEstado: campos.idEstado,
      prioridad: campos.prioridad,
      legajoEmisor: campos.legajoEmisor,
      legajoAsignado: campos.legajoAsignado,
      fechaHoraRegistro: fechaHora,
      descripcionMovimiento: campos.descripcionMovimiento,
    });
    console.log(`Movimiento de ticket ${idMovTicket.toString()} agregado`);
  } catch (error) {
    console.log(error);
  }
};

export const actualizarAperturaTicket = async (campos) => {
  if (campos) {
    const ticketRef = doc(db, "tickets", `${campos.idTicket}`);
    try {
      await updateDoc(ticketRef, {
        ...campos,
      });
    } catch (error) {
      console.log(error);
    }
  }
};
