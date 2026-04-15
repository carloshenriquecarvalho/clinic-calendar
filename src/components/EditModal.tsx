'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Calendar, Clock, User, Scissors, Heart, X, ArrowRight } from 'lucide-react'
import { editAppointment } from '@/app/actions'

interface EditModalProps {
  isOpen: boolean
  onClose: () => void
  appointment: any
}

export function EditModal({ isOpen, onClose, appointment }: EditModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => setMounted(true), [])

  if (!isOpen || !mounted) return null

  // extract simple date and time strings for the form
  const dateObj = new Date(appointment.dateTime)
  const dateStr = dateObj.toISOString().split('T')[0]
  const timeStr = dateObj.toTimeString().substring(0, 5)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    const result = await editAppointment(appointment.id, formData)
    
    if (result.error) {
      setError(result.error)
    } else {
      onClose()
    }
    setLoading(false)
  }

  return createPortal(
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-end sm:justify-center p-4 sm:p-0 bg-zinc-900/40 backdrop-blur-sm animate-enter" style={{ animationDuration: '0.2s', animationFillMode: 'both' }}>
      <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden border border-zinc-100 flex flex-col max-h-[90vh]">
        <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <h3 className="text-lg font-medium text-zinc-900">Editar Agendamento</h3>
          <button onClick={onClose} className="p-2 -mr-2 bg-zinc-50 rounded-full text-zinc-400 hover:text-zinc-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-700 text-sm font-medium border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-900 ml-1 flex items-center gap-2">
                <User className="w-4 h-4 text-rose-500" /> Nome da Cliente
              </label>
              <input 
                type="text" 
                name="clientName" 
                defaultValue={appointment.clientName}
                required
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-500 transition-all text-sm text-zinc-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-900 ml-1 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" /> Esteticista Responsável
              </label>
              <input 
                type="text" 
                name="aestheticianName" 
                defaultValue={appointment.aestheticianName}
                required
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-500 transition-all text-sm text-zinc-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-900 ml-1 flex items-center gap-2">
                <Scissors className="w-4 h-4 text-rose-500" /> Protocolo
              </label>
              <input 
                type="text" 
                name="protocol" 
                defaultValue={appointment.protocol}
                required
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-500 transition-all text-sm text-zinc-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-900 ml-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-rose-500" /> Data
                </label>
                <input 
                  type="date" 
                  name="date" 
                  defaultValue={dateStr}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-500 transition-all text-sm text-zinc-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-900 ml-1 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-rose-500" /> Hora
                </label>
                <input 
                  type="time" 
                  name="time" 
                  defaultValue={timeStr}
                  required
                  min="09:00"
                  max="18:00"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-500 transition-all text-sm text-zinc-900"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2 bg-zinc-900 text-white py-3.5 rounded-xl font-medium text-sm transition-all hover:bg-zinc-800 active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? 'Salvando...' : 'Salvar Alterações'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.body
  )
}
