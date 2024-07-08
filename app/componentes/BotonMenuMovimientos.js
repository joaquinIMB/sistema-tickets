import Image from "next/image";

export const BotonMenuMovimientos = ({handleShowOffcanvas}) => {
  return (
    <>
      <button type="button" className="block lg:hidden cursor-pointer" onClick={handleShowOffcanvas}>
        <Image
          className="bg-[#57565694] backdrop-blur-sm rounded-s-full p-2 max-[1064px]:block hidden absolute right-0 top-[40%]"
          src={"/flecha-hacia-izquierda.png"}
          alt="Imagen representativa de una flecha doble hacia la izquierda"
          width={40}
          height={40}
        />
      </button>
    </>
  );
};
