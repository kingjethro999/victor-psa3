import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ogor Dry Cleaning Ltd',
  description: 'Created By King Jethro',
  generator: 'jethroportfolio.vercel.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
