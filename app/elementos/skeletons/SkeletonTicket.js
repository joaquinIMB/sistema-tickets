import styles from "@/elementos/skeletons/skeleton.module.css";

export const SkeletonTicket = () => {
  return (
    <div className="w-full relative cursor-pointer">
      <ul
        className={`flex flex-row px-12 justify-between text-[#161616] list-none bg-white border-b-2 border-opacity-5 h-[74px] hover:bg-[#f0f0f0] items-center border-black transition-[3s]`}
      >
        <li className={`w-[25%]`}>
          <div
            className={`h-6 bg-gray-300 rounded-md w-3/4 ${styles.animatePulse}`}
          ></div>
          <div
            className={`mt-2 h-4 bg-gray-300 rounded-md w-1/2 ${styles.animatePulse}`}
          ></div>
        </li>
        <li
          className={`w-[35%] text-center font-semibold overflow-hidden py-0 px-4`}
        >
          <div
            className={`h-6 bg-gray-300 rounded-md w-3/4 ${styles.animatePulse} mx-auto`}
          ></div>
        </li>
        <li className={`w-[10%] text-center font-semibold`}>
          <div
            className={`h-6 bg-gray-300 rounded-md w-3/4 ${styles.animatePulse} mx-auto`}
          ></div>
        </li>
        <li className={`w-[12%] capitalize text-center`}>
          <div
            className={`h-6 bg-gray-300 rounded-full w-3/4 ${styles.animatePulse} mx-auto`}
          ></div>
        </li>
        <li
          className={`w-[18%] text-end font-semibold text-gray-600 max-md:hidden`}
        >
          <div
            className={`h-6 bg-gray-300 rounded-md w-3/4 ${styles.animatePulse} ml-auto`}
          ></div>
        </li>
      </ul>
    </div>
  );
};
