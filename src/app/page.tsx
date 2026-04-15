import { SchedulingForm } from '@/components/SchedulingForm'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <div className="animate-enter" style={{ animationDelay: '0.15s', opacity: 0 }}>
        <h2 className="text-2xl font-light text-zinc-900 tracking-tight mb-2">Novo <span className="font-medium">Agendamento</span></h2>
        <p className="text-sm text-zinc-500 leading-relaxed">
          Preencha os dados abaixo para reservar um horário. O atendimento é das 09h às 18h.
        </p>
      </div>

      <SchedulingForm />

      <div className="pt-4 flex justify-center animate-enter" style={{ animationDelay: '0.3s', opacity: 0 }}>
        <Link 
          href="/dashboard"
          className="text-sm font-medium text-rose-600 hover:text-rose-800 transition-colors"
        >
          Ver todos os agendamentos &rarr;
        </Link>
      </div>
    </div>
  );
}
