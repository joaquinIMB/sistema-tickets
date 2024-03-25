"use client";

import { db } from "@/firebase/FirebaseConfig";
import { collection, where, onSnapshot, query } from "firebase/firestore";
import { useState, useEffect } from "react";

const useTraerTicket = (idTicket) => {
  const [ticket, setTicket] = useState("");

  useEffect(() => {
    const referenciaTicket = collection(db, "tickets");

    const tickets = query(referenciaTicket, where("idTicket", "==", idTicket));

    const ticketSnapshot = onSnapshot(tickets, (snapshot) => {
      setTicket(snapshot.docs.map((ticket) => ticket.data()));
    });
    return ticketSnapshot;
  }, [idTicket, setTicket]);

  return ticket;
};

export default useTraerTicket;
