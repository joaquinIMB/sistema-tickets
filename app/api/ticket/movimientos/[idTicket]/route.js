import { NextResponse } from "next/server";
import { db } from "@/firebase/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

export const GET = async (request, { params }) => {
  const { idTicket } = params;

  const referenciaTicket = collection(db, "movimientoTicket");

  const tickets = query(
    referenciaTicket,
    where("idTicket", "==", idTicket)
  );

  const ticketSnapshot = await getDocs(tickets);

  const documentos = ticketSnapshot.docs.map((ticket) => ticket.data());

  return NextResponse.json(documentos);
};
