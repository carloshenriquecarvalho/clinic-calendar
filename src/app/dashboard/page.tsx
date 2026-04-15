import { getAppointments } from '@/app/actions'
import Link from 'next/link'
import { isBefore } from 'date-fns'
import { ArrowLeft } from 'lucide-react'
import { AppointmentCard } from '@/components/AppointmentCard'

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  const appointments = await getAppointments()
  const now = new Date()

  const cancelled = appointments.filter(a => a.status === 'CANCELLED')
  const completed = appointments.filter(a => a.status === 'COMPLETED')
  
  const scheduled = appointments.filter(a => a.status === 'SCHEDULED' || !a.status)
  const upcoming = scheduled.filter(a => !isBefore(new Date(a.dateTime), now))
  const past = scheduled.filter(a => isBefore(new Date(a.dateTime), now))

  function ListSection({ title, items, emptyMessage, isPast = false }: { title: string, items: any[], emptyMessage: string, isPast?: boolean }) {
    if (items.length === 0) return null
    
    return (
      <div className="space-y-4">
        <h3 className="text-sm font-semibold tracking-widest text-zinc-400 uppercase ml-1">{title}</h3>
        <div className="flex flex-col gap-3">
          {items.map((app, i) => (
            <AppointmentCard key={app.id} app={app} index={i} isPast={isPast} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4 animate-enter" style={{ opacity: 0 }}>
        <Link href="/" className="p-2 bg-white border border-zinc-200 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-all shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-2xl font-light text-zinc-900 tracking-tight">Painel de <span className="font-medium">Controle</span></h2>
          <p className="text-sm text-zinc-500">Gerenciamento de agenda</p>
        </div>
      </div>

      {appointments.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-3xl border border-dashed border-zinc-200">
          <p className="text-zinc-500 text-sm">Ainda não há nenhum agendamento cadastrado.</p>
          <Link href="/" className="mt-4 inline-block text-sm font-medium text-rose-600 hover:text-rose-800">Criar Novo &rarr;</Link>
        </div>
      ) : (
        <>
          <ListSection title="Próximos / Hoje" items={upcoming} emptyMessage="" />
          <ListSection title="Passados (Pendentes)" items={past} emptyMessage="" isPast={true} />
          <ListSection title="Concluídos" items={completed} emptyMessage="" isPast={true} />
          <ListSection title="Cancelados" items={cancelled} emptyMessage="" isPast={true} />
        </>
      )}
      
      <div className="h-6" />
    </div>
  )
}
