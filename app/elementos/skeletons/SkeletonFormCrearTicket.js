import styles from "@/elementos/skeletons/skeleton.module.css";

export const SkeletonFormularioCrearTicket = () => {
  return (
    <form className="w-[80%] p-3 py-0 px-8 mt-6">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <div
            className={`pb-2 h-6 bg-gray-300 rounded-md w-20 ${
              styles.animatePulse
            }`}
          ></div>
          <div
            className={`p-2 w-full h-10 bg-gray-300 border border-neutral-200 rounded-md ${
              styles.animatePulse
            }`}
          ></div>
        </div>
        <div className="flex flex-row justify-between gap-4">
          <div className="w-[40%]">
            <div
              className={`block h-6 bg-gray-300 rounded-md w-20 ${
                styles.animatePulse
              } py-2 my-3`}
            ></div>
            <div
              className={`p-2 w-full h-10 bg-gray-300 border border-neutral-200 rounded-md ${
                styles.animatePulse
              }`}
            ></div>
          </div>
          <div className="w-[30%]">
            <div
              className={`block h-6 bg-gray-300 rounded-md w-16 ${
                styles.animatePulse
              } py-2 my-3`}
            ></div>
            <div
              className={`p-2 w-full h-10 bg-gray-300 border border-neutral-200 rounded-md ${
                styles.animatePulse
              }`}
            ></div>
          </div>
          <div className="w-[30%]">
            <div
              className={`block h-6 bg-gray-300 rounded-md w-24 ${
                styles.animatePulse
              } py-2 my-3`}
            ></div>
            <div
              className={`p-2 w-full h-10 bg-gray-300 border border-neutral-200 rounded-md ${
                styles.animatePulse
              }`}
            ></div>
          </div>
        </div>
        <div className="relative flex flex-col">
          <div
            className={`block h-6 bg-gray-300 rounded-md w-28 ${
              styles.animatePulse
            } py-2 my-3`}
          ></div>
          <div
            className={`p-2 px-4 w-full h-72 bg-gray-300 border border-neutral-200 rounded-lg ${
              styles.animatePulse
            }`}
          ></div>
          <div className="mt-6 absolute bottom-0 right-0">
            <div
              className={`w-md px-4 py-2 m-2 h-10 bg-gray-300 rounded-md ${
              styles.animatePulse
            }`}
            ></div>
          </div>
        </div>
      </div>
    </form>
  );
};
