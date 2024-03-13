import Link from "next/link";

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">
        404 - Página no encontrada
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Oops! La página que buscas no está disponible.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-500 text-white rounded-md text-lg hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        Volver al Inicio
      </Link>
    </div>
  );
}
