import { NextResponse } from "next/server";
import { db } from "@/app/firebase/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

export const GET = async (request, { params }) => {
  const { estado } = params;

  const referenciaTicket = collection(db, "tickets");

  const tickets = query(referenciaTicket, where("idEstado", "==", estado));

  const ticketSnapshot = await getDocs(tickets);

  const documentos = ticketSnapshot.docs.map((ticket) => ticket.data());

  return NextResponse.json(documentos);
};
