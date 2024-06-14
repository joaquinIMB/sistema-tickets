import Link from "next/link";

const ModalLegajo = ({
  dataUsuarios,
  legajo,
  setLegajo,
  setDataUser,
  cambiarEstadoAlerta,
  cambiarAlerta,
}) => {

  const onSubmit = async (e) => {
    e.preventDefault();
    if (legajo.length > 0) {
      setDataUser(dataUsuarios.filter((user) => user.idUsuario.trim() == legajo));
    } else {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "Por favor ingresa tu legajo",
      });
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-[99]">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Ingresar Número de Legajo</h2>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            value={legajo}
            name="legajo"
            onChange={(e) => setLegajo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4 outline-none"
            placeholder="Número de Legajo"
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Enviar
            </button>
          </div>
          <div className="flex w-full center gap-3 pt-3">
          <h2 className="font-semibold">¿Ya tenés una cuenta?</h2>
          <Link
            href={"/auth/iniciar-sesion"}
            className="text-blue-600 font-bold cursor-pointer"
          >
            Inicia sesión
          </Link>
        </div>
        </form>
      </div>
    </div>
  );
};

export default ModalLegajo;
