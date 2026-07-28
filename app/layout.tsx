import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Barbearia Imperial | Barbearia & Perfumaria',
  description:
    'Produtos para barba, cabelo e perfumaria com atendimento personalizado pelo WhatsApp.',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
