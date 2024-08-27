import styles from "@/elementos/skeletons/skeleton.module.css";

export const SkeletonFormIniciarSesion = () => {
  return (
    <div className={`container p-4 pb-2 pt-0`}>
      <div
        className={`w-full h-5 bg-gray-300 rounded ${
          styles.animate - pulse
        } mb-4`}
      ></div>
      <div className={`max-w-xl mx-auto w-full bg-white rounded-md pt-2`}>
        <div className={`w-full`}>
          <div
            className={`block text-base font-medium bg-gray-300 h-5 w-24 mb-2 rounded ${
              styles.animate - pulse
            }`}
          ></div>
          <div
            className={`mt-1 p-2 w-full bg-gray-200 h-10 rounded-md ${
              styles.animate - pulse
            }`}
          ></div>
        </div>
        <div className={`mt-4`}>
          <div
            className={`block text-base font-medium bg-gray-300 h-5 w-28 mb-2 rounded ${
              styles.animate - pulse
            }`}
          ></div>
          <div
            className={`mt-1 p-2 w-full bg-gray-200 h-10 rounded-md ${
              styles.animate - pulse
            }`}
          ></div>
        </div>
        <div className={`mt-6`}>
          <div
            className={`w-full py-2 px-4 bg-gray-400 h-10 rounded-md ${
              styles.animate - pulse
            }`}
          ></div>
        </div>
        <div className={`flex w-full justify-around py-6 pb-4`}>
          <div
            className={`font-semibold bg-gray-300 h-5 w-36 rounded ${
              styles.animate - pulse
            }`}
          ></div>
          <div
            className={`text-blue-300 h-5 w-24 rounded ${
              styles.animate - pulse
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};
