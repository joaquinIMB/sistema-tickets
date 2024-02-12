export const BuscaRuta = (enlace) => {
  return (
    <h1 className="capitalize text-[28px] text-gray-800 font-semibold">{`${
      enlace.estado ? enlace.estado : enlace.categoria.replace("-", " ")
    }`}</h1>
  );
};
