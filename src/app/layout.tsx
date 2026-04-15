import type { Metadata } from "next";
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
      <body className="min-h-full bg-zinc-50 flex flex-col items-center justify-center lg:p-12 text-zinc-900">
        {/* Responsive wrapper: Mobile-first column natively, transforming to a dual-pane soft card on Desktop */}
        <div className="w-full lg:max-w-[1000px] min-h-screen lg:min-h-[700px] lg:h-[80vh] flex flex-col lg:flex-row bg-white shadow-none lg:shadow-2xl lg:shadow-zinc-200/50 lg:rounded-[2rem] overflow-hidden relative">
          
          {/* Desktop Sidebar Aesthetics */}
          <div className="hidden lg:flex lg:w-[45%] bg-rose-50 relative flex-col justify-between p-12 border-r border-rose-100/50">
            <div className="z-10 mt-8">
              <div className="w-14 h-14 bg-white shadow-sm border border-rose-100 rounded-2xl flex items-center justify-center mb-6 text-rose-600 animate-enter">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h1 className="text-4xl font-light tracking-tight text-zinc-900 animate-enter" style={{ animationDelay: '0.1s', opacity: 0 }}>
                Clínica de <br/><span className="font-medium text-rose-600">Estética Premium</span>
              </h1>
              <p className="mt-5 text-zinc-500 max-w-sm text-sm leading-relaxed animate-enter" style={{ animationDelay: '0.2s', opacity: 0 }}>
                Tecnologia, bem-estar e cuidados avançados unidos em um só lugar. Agende agora seu horário.
              </p>
            </div>
            <div className="z-10 animate-enter" style={{ animationDelay: '0.3s', opacity: 0 }}>
              <p className="text-xs font-semibold tracking-widest uppercase text-zinc-400">© 2026 Clínica Premium</p>
            </div>
          </div>

          {/* Main Mobile App Area (also serves as the right pane on Desktop) */}
          <div className="flex-1 flex flex-col bg-white relative overflow-y-auto">
            {/* Mobile Header (Hidden on Desktop) */}
            <header className="lg:hidden px-6 py-8 flex flex-col items-center bg-white z-10 border-b border-zinc-100">
              <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center mb-4 text-rose-600 animate-enter">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h1 className="text-xl font-medium tracking-tight text-zinc-900 animate-enter" style={{ animationDelay: '0.1s', opacity: 0 }}>
                Clínica de <span className="text-rose-600">Estética</span>
              </h1>
            </header>
            
            <main className="flex-1 p-6 lg:p-14 overflow-x-hidden">
              {children}
            </main>
          </div>
          
        </div>
      </body>
    </html>
  );
}
