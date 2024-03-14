import "@/globals.css";
import React from "react";
import { AuthProvider } from "./contexts/authContext";

export const metadata = {
  title: "Sistema de tickets - Helpdesk Unity",
  description:
    "Página para crear un ticket, en sistema de tickets Helpdesk Unity",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-full">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
