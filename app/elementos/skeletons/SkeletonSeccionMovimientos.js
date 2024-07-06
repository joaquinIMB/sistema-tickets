import styles from "@/elementos/skeletons/skeleton.module.css";
import style from "@/componentes/admin.module.css"

export const SkeletonSeccionMovimientos = () => {
  return (
    <section className={`${style.contenedorSeccionMovimientos}`}>
      <main className={`${style.seccionMovimientos}`}>
        <div className="w-[90%] border relative border-black border-opacity-5 h-auto rounded-md overflow-hidden">
          <header className="flex flex-row justify-between bg-neutral-800 min-h-[22%] py-1 px-4">
            <div className={`flex flex-col w-[30%] ${styles.animatePulse}`}>
              <div className="h-4 w-full bg-gray-300 rounded-md"></div>
            </div>
            <div
              className={`flex flex-col text-end text-base w-[20%] ${styles.animatePulse}`}
            >
              <div className="h-4 w-full bg-gray-300 rounded-md"></div>
            </div>
            <div
              className={`flex flex-col text-end text-base w-[40%] ${styles.animatePulse}`}
            >
              <div className="h-4 w-full bg-gray-300 rounded-md"></div>
            </div>
          </header>
          <main className="bg-white min-h-18">
            <div
              className={`p-4 h-16 bg-gray-300 ${styles.animatePulse}`}
            ></div>
          </main>
        </div>

        <div className="w-[90%] h-auto rounded-md overflow-hidden relative">
          <header className="flex flex-row justify-between bg-neutral-800 min-h-[22%] py-1 px-4">
            <div className={`flex flex-col w-[25%] ${styles.animatePulse}`}>
              <div className="h-4 w-full bg-gray-300 rounded-md"></div>
            </div>
            <div
              className={`flex flex-col text-end text-base w-[25%] ${styles.animatePulse}`}
            >
              <div className="h-4 w-full bg-gray-300 rounded-md"></div>
            </div>
          </header>
          <main className="bg-white min-h-18">
            <div
              className={`p-4 h-16 bg-gray-300 ${styles.animatePulse}`}
            ></div>
          </main>
        </div>
      </main>

      <form className="h-[148px] w-[90%] flex items-center justify-center">
        <div className="relative w-full h-full bg-white">
          <div
            className={`w-full h-[80%] py-2 px-4 m-auto bg-gray-300 rounded-md rounded-b-none ${styles.animatePulse}`}
          ></div>
          <label className="absolute flex justify-end items-center rounded-b-md bg-neutral-800 bottom-0 right-0 p-2 w-[100%] min-h-11 h-[20%]">
            <div className="flex flex-row items-center gap-4">
              <div
                className={`h-4 w-20 bg-gray-300 rounded-md ${styles.animatePulse}`}
              ></div>
              <div
                className={`h-8 w-24 bg-gray-300 rounded-md ${styles.animatePulse}`}
              ></div>
              <div
                className={`px-4 py-1 h-8 w-16 bg-gray-300 rounded-md ${styles.animatePulse}`}
              ></div>
            </div>
          </label>
        </div>
      </form>
    </section>
  );
};
