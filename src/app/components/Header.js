"use client";

import { BuscaRuta } from "./BuscaRuta";

export const Header = () => {
  return (
    <header className="sticky top-0 z-20 bg-white items-center px-12 py-3 border-b-2 shadow-5xl border-black border-opacity-5 text-white h-14 w-auto">
      <div className="flex items-center gap-6 justify-between w-full ">
        <BuscaRuta/>
      </div>
    </header>
  );
};
