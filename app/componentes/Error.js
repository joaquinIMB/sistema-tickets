export const Error = ({ error, refetch }) => {
  <div className="w-full h-full flex flex-col justify-center items-center p-4 bg-red-100 text-neutral-800 rounded-md">
    <h1 className="text-2xl font-bold mb-4">Error</h1>
    <p className="mb-4">
      {error.message} {error.code} {error.status}
    </p>
    <button
      onClick={() => refetch()}
      className="px-4 py-2 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-800 transition"
    >
      Reintentar
    </button>
  </div>;
};
