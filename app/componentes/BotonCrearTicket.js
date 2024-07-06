import Image from "next/image";
import Link from "next/link";

const BotonCrearTicket = ({ habilitarBoton }) => {
  return (
    <>
      <Link
        href={"/admin/ticket/crear-ticket"}
        className={`rounded-md bg-blue-800 text-white text-sm hover:bg-blue-500 cursor-pointer ${
          habilitarBoton
            ? "absolute right-[22px] max-[768px]:right-[14px]"
            : "relative"
        } transition-all flex items-center justify-center gap-1 w-auto px-2 py-1 max-h-10`}
      >
        <Image
          src={"/mas.png"}
          alt="Logo en representación a la acción sumar"
          className="w-8"
          width={100}
          height={100}
        />
        Crear ticket
      </Link>
    </>
  );
};

export default BotonCrearTicket;
