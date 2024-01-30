import { listaSideBar, listaSubNav } from "./ui/listaEnlaces";
import Link from "next/link";
import Image from "next/image";
import Boton from "./ui/Boton";
import BarraDeBusqueda from "./BarraDeBusqueda";
import { poppins } from "./ui/fuentes";

const SubNav = () => {
  const enlaceSideBar = listaSideBar.slice(0, 1);
  return (
    <>
      <section
        className={`w-96 bg-[#fbfbfb] border-r-2 border-[#00000010] text-white flex flex-col`}
      >
        <div className="flex flex-row justify-end p-2 h-14 border-b-2 shadow-5xl border-black border-opacity-5">
          <Boton />
        </div>
        <div className="flex flex-row justify-end p-2 h-14">
          <BarraDeBusqueda />
        </div>
        <nav className={`${poppins.className} h-full`}>
          <ul className="py-4 px-12 flex flex-col text-zinc-900 gap-2 ">
            {listaSubNav.map((enlace) => (
              <li key={enlace.label}>
                <Link href={enlace.href}>{enlace.label}</Link>
              </li>
            ))}
            <span className="py-2 px-0 text-[#8f8f8f8f]">INTERACCIONES</span>
            <li>Ultimos 7 días</li>
            <li>Mi sector</li>
            <span className="py-2 px-0 text-[#8f8f8f8f]">ESTADOS</span>
            <li>Activo</li>
            <li>Pendiente</li>
            <li>En proceso</li>
            <li>Resuelto</li>
            <li>Anulado</li>
            <li>En revision</li>
          </ul>
        </nav>
      </section>
    </>
  );
};

export default SubNav;
