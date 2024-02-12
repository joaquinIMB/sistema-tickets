import "@/app/globals.css";
import React from "react";
import { AuthProvider } from "./componentes/contexts/authContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-full">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
