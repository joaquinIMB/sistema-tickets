"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { listaEnlaces } from "./listaEnlaces";
import { useState } from "react";
import styles from "@/app/components/enlaceActivo.module.css";
import TiposDeTickets from "./TiposDeTickets";

export const NavLinks = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const enlacesNoDesplegables = listaEnlaces.slice(0, 2);

  return (
    <nav>
      <ul className="overflow-hidden">
        {enlacesNoDesplegables.map((enlace) => {
          return (
            <li key={enlace.label}>
              <Link
                className={` flex w-full flex-col items-center gap-2 relative overflow-hidden py-2 text-sm transition-all hover:text-gray-300  ${
                  pathname === enlace.href && isOpen === false
                    ? `${styles.enlaceActivo} hover:text-white`
                    : ""
                }`}
                href={enlace.href}
                onClick={() => setIsOpen(false)}
              >
                <Image
                  src={enlace.logo}
                  alt={`Logo ${enlace.label} de menu desplegable`}
                  className={`w-7 object-contain relative z-10`}
                  width={100}
                  height={100}
                />
                <span className="relative z-10">{enlace.label}</span>
              </Link>
            </li>
          );
        })}
        <TiposDeTickets isOpen={isOpen} setIsOpen={setIsOpen}/>
      </ul>
    </nav>
  );
};
