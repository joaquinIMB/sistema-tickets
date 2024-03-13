import { NextResponse } from "next/server";
import { db } from "../../firebase/FirebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";

export const GET = async (request) => {

  const referenciaTicket = collection(db, "tickets");

  const tickets = query(referenciaTicket);

  const ticketSnapshot = await getDocs(tickets);

  const documentos = ticketSnapshot.docs.map((ticket) => ticket.data());

  return NextResponse.json(documentos);
};
