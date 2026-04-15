'use client'

import { useState } from 'react'
import { createAppointment } from '@/app/actions'
import { Calendar, Clock, User, Scissors, Heart, ArrowRight } from 'lucide-react'

export function SchedulingForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)
    
    const formElement = e.currentTarget
    const formData = new FormData(formElement)
    const result = await createAppointment(formData)
    
    if (result.error) {
      setError(result.error)
    } else {
      setSuccess(true)
      formElement.reset()
    }
    setLoading(false)
  }

  return (
    <div className="bg-white p-6 rounded-[1.25rem] shadow-sm border border-zinc-100 animate-enter" style={{ animationDelay: '0.2s', opacity: 0 }}>
      {success && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 text-green-700 text-sm font-medium border border-green-100 flex items-center gap-2">
          Agendamento realizado com sucesso!
        </div>
      )}
      
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-700 text-sm font-medium border border-red-100 flex items-center gap-2">
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
            required
            className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-500 transition-all text-sm text-zinc-900 placeholder:text-zinc-400"
            placeholder="Digite o nome completo"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-900 ml-1 flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500" /> Esteticista Responsável
          </label>
          <input 
            type="text" 
            name="aestheticianName" 
            required
            className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-500 transition-all text-sm text-zinc-900 placeholder:text-zinc-400"
            placeholder="Quem vai atender?"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-900 ml-1 flex items-center gap-2">
            <Scissors className="w-4 h-4 text-rose-500" /> Protocolo
          </label>
          <input 
            type="text" 
            name="protocol" 
            required
            className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-500 transition-all text-sm text-zinc-900 placeholder:text-zinc-400"
            placeholder="Ex: Limpeza de Pele Profunda"
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
              required
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-500 transition-all text-sm text-zinc-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-zinc-900 ml-1 flex items-center gap-2">
              <Clock className="w-4 h-4 text-rose-500" /> Hora (09-18h)
            </label>
            <input 
              type="time" 
              name="time" 
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
          className="w-full mt-4 flex items-center justify-center gap-2 bg-zinc-900 text-white py-3.5 rounded-xl font-medium text-sm transition-all hover:bg-zinc-800 active:scale-[0.98] disabled:opacity-70"
        >
          {loading ? 'Agendando...' : 'Confirmar Agendamento'}
          {!loading && <ArrowRight className="w-4 h-4" />}
        </button>
      </form>
    </div>
  )
}
