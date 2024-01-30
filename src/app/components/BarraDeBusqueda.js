import Image from "next/image";

export default function BarraDeBusqueda() {
  return (
    <div className="flex flex-row-reverse w-full max-w-md items-center rounded-md space-x-2 border py-2 shadow-sm border-black border-opacity-5">
      <input className="flex-1 outline-0 p-2 pl-3 bg-transparent text-black border-l-2 border-black border-opacity-5" placeholder="Search for tickets..." />
      <button className="pr-2" type="submit">
        <Image className="w-[20px]" src="/lupa.png" alt="Logo de busqueda" width={100} height={100}/>
        <span className="sr-only">Search</span>
      </button>
    </div>
  )
}

