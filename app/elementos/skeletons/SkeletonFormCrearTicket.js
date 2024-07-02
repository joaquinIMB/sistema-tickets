import styles from "@/elementos/skeletons/skeleton.module.css";

export const SkeletonFormularioCrearTicket = () => {
  return (
    <form className="w-full md:w-[80%] p-3 py-0 px-4 md:px-8 mt-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-end">
          <div className="flex flex-col w-[50%] max-[768px]:w-full">
            <label className="pb-2 text-lg font-medium text-gray-700">
              Asunto
            </label>
            <div
              className={`h-10 bg-gray-300 rounded-md ${styles.animatePulse}`}
            ></div>
          </div>
          <div className="w-full md:w-[30%]">
            <span className="block text-lg font-medium text-gray-700 pb-2">
              Sector
            </span>
            <div
              className={`h-10 bg-gray-300 rounded-md ${styles.animatePulse}`}
            ></div>
          </div>
          <div className="w-full md:w-[30%]">
            <span className="block text-lg font-medium text-gray-700 pb-2">
              Prioridad
            </span>
            <div
              className={`h-10 bg-gray-300 rounded-md ${styles.animatePulse}`}
            ></div>
          </div>
        </div>
        <div className="relative flex flex-col">
          <label className="block relative z-10 text-lg font-medium text-gray-700 pb-2">
            Descripción
          </label>
          <div
            className={`h-72 max-md:h-40 bg-gray-300 rounded-lg ${styles.animatePulse}`}
          ></div>
          <div className="mt-6 absolute bottom-0 right-0">
            <div
              className={`h-10 w-28 bg-gray-300 rounded-md ${styles.animatePulse}`}
            ></div>
          </div>
        </div>
      </div>
    </form>
  );
};
