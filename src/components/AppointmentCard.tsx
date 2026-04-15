'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar, Clock, User, Scissors, MoreVertical, CheckCircle, XCircle, Edit2, Trash2 } from 'lucide-react'
import { deleteAppointment, updateAppointmentStatus } from '@/app/actions'
import { ConfirmationModal } from './ConfirmationModal'
import { EditModal } from './EditModal'

interface AppointmentCardProps {
  app: any
  index: number
  isPast?: boolean
}

export function AppointmentCard({ app, index, isPast }: AppointmentCardProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleStatusUpdate(newStatus: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED') {
    setLoading(true)
    setShowMenu(false)
    await updateAppointmentStatus(app.id, newStatus)
    setLoading(false)
  }

  async function handleDelete() {
    setLoading(true)
    setShowDeleteModal(false)
    setShowMenu(false)
    await deleteAppointment(app.id)
    setLoading(false)
  }

  // Visual cues based on status
  let barColor = 'bg-rose-300'
  let opacity = isPast ? 'opacity-75' : ''
  if (app.status === 'COMPLETED') {
    barColor = 'bg-green-400'
    opacity = 'opacity-80'
  } else if (app.status === 'CANCELLED') {
    barColor = 'bg-zinc-300'
    opacity = 'opacity-60 grayscale-[0.5]'
  }

  return (
    <div 
      className={`bg-white p-5 rounded-2xl shadow-sm border border-zinc-200 flex flex-col gap-3 animate-enter relative overflow-visible transition-all ${opacity} ${showMenu ? 'z-40' : 'z-0'}`} 
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
    >
      <div className={`absolute top-0 left-0 w-1 h-full ${barColor} rounded-l-2xl transition-colors`}/>
      
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="font-semibold text-zinc-900 text-[15px] flex items-center gap-1.5">
            <User className="w-4 h-4 text-zinc-400" /> {app.clientName}
          </h3>
          <p className="text-zinc-500 text-sm flex items-center gap-1.5 mt-1">
            <Scissors className="w-4 h-4 text-zinc-400" /> {app.protocol} ({app.aestheticianName})
          </p>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="text-right flex flex-col items-end">
            <span className={`text-sm font-medium px-2.5 py-1 rounded-lg flex items-center gap-1 ${
              app.status === 'CANCELLED' ? 'bg-zinc-100 text-zinc-600' : 
              app.status === 'COMPLETED' ? 'bg-green-50 text-green-700' : 'bg-rose-50 text-rose-600'
            }`}>
              <Calendar className="w-3.5 h-3.5" />
              {format(new Date(app.dateTime), "dd 'de' MMM", { locale: ptBR })}
            </span>
            <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1 mt-1.5">
              <Clock className="w-3.5 h-3.5" />
              {format(new Date(app.dateTime), "HH:mm")}
            </span>
          </div>

          <div className="relative">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              disabled={loading}
              className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
            
            {showMenu && (
              <>
                {/* Backdrop for mobile to catch outside clicks */}
                <div className="fixed inset-0 z-20 sm:hidden" onClick={() => setShowMenu(false)} />
                <div 
                  className="absolute right-0 top-10 mt-1 w-48 bg-white rounded-xl shadow-xl border border-zinc-100 p-1.5 z-30 animate-enter"
                  style={{ animationDuration: '0.15s' }}
                  onMouseLeave={() => setShowMenu(false)}
                >
                  <button onClick={() => { setShowMenu(false); setShowEditModal(true) }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 rounded-lg transition-colors">
                    <Edit2 className="w-4 h-4" /> Editar
                  </button>
                  {app.status !== 'COMPLETED' && (
                    <button onClick={() => handleStatusUpdate('COMPLETED')} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-green-700 hover:bg-green-50 rounded-lg transition-colors">
                      <CheckCircle className="w-4 h-4" /> Concluir
                    </button>
                  )}
                  {app.status !== 'CANCELLED' && (
                    <button onClick={() => handleStatusUpdate('CANCELLED')} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-orange-700 hover:bg-orange-50 rounded-lg transition-colors">
                      <XCircle className="w-4 h-4" /> Cancelar
                    </button>
                  )}
                  <div className="my-1 border-t border-zinc-100" />
                  <button onClick={() => { setShowMenu(false); setShowDeleteModal(true) }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" /> Excluir
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <ConfirmationModal 
        isOpen={showDeleteModal}
        title="Tem certeza?"
        description="Esta ação excluirá o agendamento permanentemente e não poderá ser desfeita."
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />

      {showEditModal && (
        <EditModal 
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          appointment={app}
        />
      )}
    </div>
  )
}
