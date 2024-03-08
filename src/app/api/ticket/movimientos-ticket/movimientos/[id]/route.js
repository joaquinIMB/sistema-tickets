import { NextResponse } from "next/server";
import { db } from "@/app/firebase/FirebaseConfig";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

export const GET = async (request, { params }) => {
  const { id } = params;

  const referenciaMov = collection(db, "movimientoTicket");

  const movTickets = query(
    referenciaMov,
    where("idTicket", "==", id),
    orderBy("idMovimientoTicket", "asc")
  );

  const movSnapshot = await getDocs(movTickets);

  const documentos = movSnapshot.docs.map((ticket) => ticket.data());

  return NextResponse.json(documentos);
};
