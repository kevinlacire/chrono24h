import './bootstrap.min.css'
import './24h.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Chrono 24h Basket ' + new Date().getFullYear(),
  description: 'Chrono 24h Basket',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
