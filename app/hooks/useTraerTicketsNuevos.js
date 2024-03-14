"use client";

import { db } from "@/firebase/FirebaseConfig";
import { onSnapshot, query, collection, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/authContext";

export const useTraerTicketsNuevos = () => {
  const { usuario } = useAuth();
  const [data, setData] = useState();

  useEffect(() => {
    if (usuario) {
      const referenciaTicket = collection(db, "tickets");

      const tickets = query(referenciaTicket, where("idEstado", "==", "nuevo"));

      const ticketSnapshot = onSnapshot(tickets, (snapshot) => {
        setData(snapshot.docs.map((ticket) => ticket.data()));
      });
      return ticketSnapshot;
    }
  }, [usuario]);

  return data;
};
