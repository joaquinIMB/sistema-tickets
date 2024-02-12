import { Header } from '../componentes/Header';
import Aside from '../componentes/Aside';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-full">
          <main className="flex flex-row min-h-screen">
            <Aside />
            <div className="flex flex-col w-full ">
              <Header />
              <section className="flex flex-row flex-wrap relative w-full h-full justify-around bg-[#fbfbfb]">
                <main className="w-full container flex flex-row flex-wrap justify-start gap-1 h-fit">
                  {children}
                </main>
              </section>
            </div>
          </main>
      </body>
    </html>
  );
}
