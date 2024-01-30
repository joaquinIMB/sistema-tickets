import { Poppins, Lobster } from "next/font/google";

export const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "700"],
    style: "normal",
    preload: true
  });
export const lobster = Lobster({
    subsets: ["latin"],
    weight: ["400"],
    style: "normal",
    preload: true
  });