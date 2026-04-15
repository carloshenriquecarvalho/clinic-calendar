'use client'

import { AlertCircle, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface ConfirmationModalProps {
  isOpen: boolean
  title: string
  description: string
  onConfirm: () => void
  onCancel: () => void
  isDanger?: boolean
}

export function ConfirmationModal({ isOpen, title, description, onConfirm, onCancel, isDanger = true }: ConfirmationModalProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!isOpen || !mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm animate-enter" style={{ animationDuration: '0.2s', animationFillMode: 'both' }}>
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl overflow-hidden border border-zinc-100">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className={`p-3 rounded-xl ${isDanger ? 'bg-red-50 text-red-600' : 'bg-zinc-100 text-zinc-900'}`}>
              <AlertCircle className="w-6 h-6" />
            </div>
            <button onClick={onCancel} className="text-zinc-400 hover:text-zinc-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <h3 className="mt-4 text-lg font-medium text-zinc-900">{title}</h3>
          <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
            {description}
          </p>
        </div>
        <div className="px-6 py-4 bg-zinc-50 flex items-center justify-end gap-3 border-t border-zinc-100">
          <button 
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-200/50 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
              isDanger ? 'bg-red-600 hover:bg-red-700' : 'bg-zinc-900 hover:bg-zinc-800'
            }`}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
