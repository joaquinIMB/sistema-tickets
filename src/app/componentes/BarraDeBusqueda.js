import Image from "next/image";

export default function BarraDeBusqueda() {
  return (
    <div className="flex flex-row-reverse w-full max-w-xl items-center rounded-md  border overflow-hidden border-black border-opacity-5">
      <input
        className="flex-1 outline-0 p-2 pl-3 bg-white text-zinc-800"
        placeholder="Busqueda por tickets..."
      />
      <button className="px-2 bg-[#f0f0f0] h-10">
        <Image
          className="w-[20px]"
          src="/lupa.png"
          alt="Logo de busqueda"
          width={100}
          height={100}
        />
      </button>
    </div>
  );
}
