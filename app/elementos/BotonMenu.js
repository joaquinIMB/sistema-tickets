import Image from "next/image";

export default function BotonMenu({ setDesplegar, desplegar }) {
  return (
    <button className="m-auto outline-none">
      <Image
        onClick={() => setDesplegar(!desplegar)}
        className={` w-9 m-auto`}
        src="/menu.png"
        alt="Logo de busqueda"
        width={80}
        height={80}
      />
    </button>
  );
}
