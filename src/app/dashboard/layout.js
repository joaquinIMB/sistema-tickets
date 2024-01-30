import { Header } from "../components/Header";
import { Filtros } from "../components/Filtros";
import Aside from "../components/Aside";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-full">
        <main className="flex flex-row min-h-screen">
          <Aside />
          <div className="flex flex-col w-full ">
            <Header />
            <Filtros />
            <section className="flex flex-row flex-wrap relative w-full h-full justify-around p-7 pt-10 bg-[#fbfbfb]">
              <main className="w-full flex flex-row flex-wrap justify-evenly gap-3">
                {children}
              </main>
            </section>
          </div>
        </main>
      </body>
    </html>
  );
}
