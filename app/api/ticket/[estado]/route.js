import { NextResponse } from "next/server";
import { db } from "@/firebase/FirebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export const GET = async (request, { params }) => {
  try {
    const { estado } = params;
    if (!estado) {
      return NextResponse.error(new Error("El parámetro 'estado' es requerido."));
    }

    const referenciaTicket = collection(db, "tickets");
    const ticketsQuery = query(referenciaTicket, where("idEstado", "==", estado));
    const ticketSnapshot = await getDocs(ticketsQuery);

    const tickets = ticketSnapshot.docs.map((ticket) => ticket.data());

    return NextResponse.json(tickets);
  } catch (error) {

    console.error("Error al obtener tickets:", error);
    return NextResponse.error(new Error("Ocurrió un error al obtener los tickets."));
  }
};
