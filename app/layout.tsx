import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'OpenBook',
  description: 'OpenBook Waitlist Page',
  icons: {
    icon: '/openbook.png',
  },
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
