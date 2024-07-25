"use client";

import { DesplegableProvider } from "@/contexts/desplegableContext";
import { lobster } from "@/elementos/fuentes";
import { store } from "@/store";
import { Provider } from "react-redux";

export default function LayoutAuth({ children }) {
  return (
      <DesplegableProvider>
        <div className="flex flex-col min-h-screen">
          <div className="flex justify-center items-center py-2 min-h-screen bg-slate-500 bg-opacity-5">
            <main
              className={`flex flex-col items-center pt-4 bg-white border border-black border-opacity-5 shadow-lg`}
            >
              <span
                className={`text-3xl font-semibold text-gray-800 ${lobster.className} tracking-wider`}
              >
                HelpdeskUnity
              </span>
              <Provider store={store}>{children}</Provider>
            </main>
          </div>
        </div>
      </DesplegableProvider>
  );
}
