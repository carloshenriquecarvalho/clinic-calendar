import type { Metadata } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clínica Premium - Agendamentos",
  description: "Tecnologia e estética.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-zinc-50 flex flex-col items-center justify-center text-zinc-900">
        {/* Responsive wrapper: Mobile-first column natively, transforming to a dual-pane soft card on Desktop */}
        <div className="w-full lg:max-w-[1000px] min-h-screen lg:min-h-[700px] lg:h-[80vh] flex flex-col lg:flex-row bg-white shadow-none lg:shadow-2xl lg:shadow-zinc-200/50 lg:rounded-[2rem] overflow-hidden relative">
          
          {/* Desktop Sidebar Aesthetics */}
          <div className="hidden lg:flex lg:w-[45%] bg-rose-50/30 relative flex-col justify-between p-12 border-r border-rose-100/30">
            <div className="z-10 mt-8">
              <div className="mb-6 animate-enter">
                <Image src="/logo.png" alt="Premium Estética" width={150} height={150} className="object-contain" priority />
              </div>
              <h1 className="text-4xl font-light tracking-tight text-zinc-900 animate-enter" style={{ animationDelay: '0.1s', opacity: 0 }}>
                Crystal  <br/><span className="font-medium text-rose-600">Laser e Estética</span>
              </h1>
              <p className="mt-5 text-zinc-500 max-w-sm text-sm leading-relaxed animate-enter" style={{ animationDelay: '0.2s', opacity: 0 }}>
                Tecnologia, bem-estar e luxo unidos em um só lugar para nossas pacientes.
              </p>
            </div>
            <div className="z-10 animate-enter" style={{ animationDelay: '0.3s', opacity: 0 }}>
              <p className="text-xs font-semibold tracking-widest uppercase text-zinc-400">© 2026 Crystal Laser e Estética</p>
              <p className="text-xs font-semibold tracking-widest uppercase text-zinc-300 ">MADE BY NEXUS GROWTH</p>
            </div>
          </div>

          {/* Main Mobile App Area (also serves as the right pane on Desktop) */}
          <div className="flex-1 flex flex-col bg-white relative overflow-y-auto">
            {/* Mobile Header (Hidden on Desktop) */}
            <header className="lg:hidden px-6 py-5 flex flex-col items-center bg-white z-10 border-b border-zinc-100">
              <div className="mb-2 animate-enter">
                <Image src="/logo.png" alt="Premium Estética" width={65} height={65} className="object-contain" priority />
              </div>
              <h1 className="text-xl font-medium tracking-tight text-zinc-900 animate-enter text-center" style={{ animationDelay: '0.1s', opacity: 0 }}>
                Crystal <span className="text-rose-600 block sm:inline">Laser e Estética</span>
              </h1>
            </header>
            
            <main className="flex-1 p-5 lg:p-14 overflow-x-hidden">
              {children}
            </main>
          </div>
          
        </div>
      </body>
    </html>
  );
}
