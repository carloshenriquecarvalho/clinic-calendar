import { SchedulingForm } from '@/components/SchedulingForm'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <div className="animate-enter" style={{ animationDelay: '0.15s', opacity: 0 }}>
        <h2 className="text-xl font-light text-zinc-900 tracking-tight mb-1">Novo <span className="font-medium">Agendamento</span></h2>
        <p className="text-sm text-zinc-500 leading-relaxed">
          Preencha os dados abaixo para reservar um horário. O atendimento é das 09h às 18h.
        </p>
      </div>

      <SchedulingForm />

      <div className="pt-2 flex justify-center animate-enter" style={{ animationDelay: '0.3s', opacity: 0 }}>
        <Link 
          href="/dashboard"
          className="text-sm font-medium text-white bg-rose-600 px-4 py-2 rounded-xl hover:bg-rose-800 transition-colors"
        >
          Ver todos os agendamentos &rarr;
        </Link>
      </div>
    </div>
  );
}
