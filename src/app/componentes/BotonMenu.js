import Image from "next/image";

export default function BotonMenu() {
  return (
      <button className="">
        <Image
          className="w-[40px]"
          src="/menu.png"
          alt="Logo de busqueda"
          width={100}
          height={100}
        />
      </button>
  );
}