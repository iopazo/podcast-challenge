import clsx from 'clsx'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Podcaster list',
  description: 'An app for listing podcasters',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className={clsx({'bg-white': true})}>
          {children}
        </main>
      </body>
    </html>
  )
}
