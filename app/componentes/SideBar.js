import Link from "next/link";
import Image from "next/image";
import styles from "@/componentes/admin.module.css";
import BotonMenu from "./BotonMenu";

export const SideBar = ({ desplegar, setDesplegar }) => {
  return (
    <>
      <div
        className={`flex justify-center overflow-hidden relative bg-neutral-950 w-[76px] h-full text-white `}
      >
        <div className="fixed top-0 w-[4.8rem]">
          <nav className="flex flex-col justify-between h-full">
            <ul className="flex flex-col">
              <li className="py-2 pt-4 px-3 m-auto">
                <BotonMenu setDesplegar={setDesplegar} desplegar={desplegar} />
              </li>
              <div className={`${styles.subMenuSideBar}`}>
                <div>
                  <li className="pt-[.34rem]">
                    <Link
                      className={`overflow-hidden flex w-full flex-col items-center relative py-2 text-sm transition-all hover:text-gray-300  ${styles.enlaceActivo}`}
                      href={"/admin/ticket/tickets-sin-abrir"}
                    >
                      <Image
                        src={"/boleto.png"}
                        alt={`Logo Tickets de menu desplegable`}
                        className={`w-10 object-contain relative z-10`}
                        width={100}
                        height={100}
                      />
                    </Link>
                  </li>{" "}
                </div>
                <div>
                  <li className="py-2">
                    <Image
                      src={"/informacion.png"}
                      className="m-auto w-8 border-b shadow-5xl border-black border-opacity-5"
                      alt="Logo de Punto Deportivo"
                      width={100}
                      height={100}
                    />
                  </li>
                  <li className="py-2">
                    <Image
                      src={"/ajuste.png"}
                      className="m-auto w-8 border-b shadow-5xl border-black border-opacity-5"
                      alt="Logo de Punto Deportivo"
                      width={100}
                      height={100}
                    />
                  </li>
                </div>
              </div>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
