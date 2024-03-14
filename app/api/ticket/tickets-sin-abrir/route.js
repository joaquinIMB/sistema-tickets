import { NextResponse } from "next/server";
import { db } from "@/firebase/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

export const GET = async (request) => {
  const referenciaTicket = collection(db, "tickets");

  const tickets = query(referenciaTicket, where("idEstado", "==", "nuevo"));

  const ticketSnapshot = await getDocs(tickets);

  const documentos = ticketSnapshot.docs.map((ticket) => ticket.data());

  return NextResponse.json(documentos);
};
