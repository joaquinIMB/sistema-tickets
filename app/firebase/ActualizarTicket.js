import { db } from "./FirebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

export const actualizarTicket = async (campos) => {
  const docRef = doc(db, "tickets", `${campos.idTicket}`);
  console.log(campos);
  return await updateDoc(docRef, {
    idEstado: campos.idEstado,
    idSector: campos.idSector,
    legajoAsignado: campos.legajoAsignado,
    nombreUsuarioAsignado: campos.nombreUsuarioAsignado,
    prioridad: campos.prioridad,
  }).catch((error) => console.log(error));
};
