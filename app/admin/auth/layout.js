'use client'

import { useAuth } from "../../contexts/authContext";
import { useRouter } from "next/navigation";

export default function LayoutAuth({ children }) {
  const {usuario }= useAuth()
  const router = useRouter()
  if(usuario.logged === true){
    return router.replace("/admin/ticket/tickets-sin-abrir")
  }
  return (
    <div className="flex justify-center items-center py-2 min-h-screen">
      <main className={`flex flex-col items-center`}>{children}</main>
    </div>
  );
}
