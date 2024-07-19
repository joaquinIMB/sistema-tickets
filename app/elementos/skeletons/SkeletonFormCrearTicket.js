import styles from "@/elementos/skeletons/skeleton.module.css";

export const SkeletonFormularioCrearTicket = () => {
  return (
    <div className="p-4 pt-5 max-md:px-2 bg-[#f7f7f7] w-[700px] rounded-lg max-md:w-full animate-pulse">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-end">
          <div className="flex flex-col w-[50%] max-[768px]:w-full">
            <label className="pb-2 text-lg font-medium text-gray-700">
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </label>
            <div className="p-2 w-full bg-gray-300 border border-neutral-200 rounded-md outline-none h-10"></div>
          </div>
          <div className="w-full md:w-[30%]">
            <span className="block text-lg font-medium text-gray-700 pb-2">
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </span>
            <div className="p-2 w-full bg-gray-300 border border-neutral-200 rounded-md outline-none h-10"></div>
          </div>
          <div className="w-full md:w-[30%]">
            <span className="block text-lg font-medium text-gray-700 pb-2">
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </span>
            <div className="p-2 w-full bg-gray-300 border border-neutral-200 rounded-md outline-none h-10"></div>
          </div>
        </div>
        <div className="relative flex flex-col">
          <label className="block relative z-10 text-lg font-medium text-gray-700 pb-2">
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </label>
          <div className="w-full bg-gray-300 h-44 py-2 px-4 m-auto outline-none resize-none border rounded-md rounded-b-none border-opacity-5"></div>
          <label className="absolute flex justify-end items-center rounded-b-md bg-neutral-800 bottom-0 right-0 p-2 w-[100%] min-h-11 h-[20%] z-[99]">
          </label>
        </div>
      </div>
    </div>
  );
};
