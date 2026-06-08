import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FT Dijital Prime',
  description: 'Geleceğin İşletmelerini Yeniden İnşa Ediyoruz',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}
