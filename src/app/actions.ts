'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createAppointment(formData: FormData) {
  const clientName = formData.get('clientName') as string
  const aestheticianName = formData.get('aestheticianName') as string
  const protocol = formData.get('protocol') as string
  const dateStr = formData.get('date') as string
  const timeStr = formData.get('time') as string

  if (!clientName || !aestheticianName || !protocol || !dateStr || !timeStr) {
    return { error: 'Todos os campos são obrigatórios' }
  }

  // Combine date and time
  const [year, month, day] = dateStr.split('-').map(Number)
  const [hours, minutes] = timeStr.split(':').map(Number)

  if (hours < 9 || hours >= 18) {
    return { error: 'O agendamento deve ser entre 09:00 e 18:00.' }
  }

  const dateTime = new Date(year, month - 1, day, hours, minutes)

  try {
    await prisma.appointment.create({
      data: {
        clientName,
        aestheticianName,
        protocol,
        dateTime,
        status: 'SCHEDULED'
      },
    })
    
    revalidatePath('/dashboard')
    return { success: true }
  } catch (err) {
    console.error(err)
    return { error: 'Ocorreu um erro ao salvar o agendamento.' }
  }
}

export async function editAppointment(id: string, formData: FormData) {
  const clientName = formData.get('clientName') as string
  const aestheticianName = formData.get('aestheticianName') as string
  const protocol = formData.get('protocol') as string
  const dateStr = formData.get('date') as string
  const timeStr = formData.get('time') as string

  // Combine date and time
  const [year, month, day] = dateStr.split('-').map(Number)
  const [hours, minutes] = timeStr.split(':').map(Number)

  if (hours < 9 || hours >= 18) {
    return { error: 'O agendamento deve ser entre 09:00 e 18:00.' }
  }

  const dateTime = new Date(year, month - 1, day, hours, minutes)

  try {
    await prisma.appointment.update({
      where: { id },
      data: {
        clientName,
        aestheticianName,
        protocol,
        dateTime,
      },
    })
    
    revalidatePath('/dashboard')
    return { success: true }
  } catch (err) {
    return { error: 'Ocorreu um erro ao editar o agendamento.' }
  }
}

export async function updateAppointmentStatus(id: string, status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED') {
  try {
    await prisma.appointment.update({
      where: { id },
      data: { status },
    })
    revalidatePath('/dashboard')
    return { success: true }
  } catch (err) {
    return { error: 'Erro ao atualizar status.' }
  }
}

export async function deleteAppointment(id: string) {
  try {
    await prisma.appointment.delete({
      where: { id },
    })
    revalidatePath('/dashboard')
    return { success: true }
  } catch (err) {
    return { error: 'Erro ao deletar agendamento.' }
  }
}

export async function getAppointments() {
  const appointments = await prisma.appointment.findMany({
    orderBy: {
      dateTime: 'asc',
    },
  })
  return appointments
}
