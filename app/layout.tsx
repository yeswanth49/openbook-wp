import type { Metadata } from 'next'
import './globals.css'

// Use a fixed production URL when in production to ensure correct OpenGraph image URLs
const productionUrl = 'https://waitlist.goopenbook.in'
const baseUrl = process.env.NODE_ENV === 'production'
  ? productionUrl
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'OpenBook',
  description: 'Join the Waitlist for Early Access to OpenBook. Be the first to explore AI-powered, multilingual learning.',
  metadataBase: new URL(baseUrl),
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
    ]
  },
  openGraph: {
    title: 'OpenBook Waitlist',
    description: 'Join the Waitlist for Early Access to OpenBook. Be the first to explore AI-powered, multilingual learning.',
    images: [
      {
        url: '/openbook_opengraph.png',
        width: 1200,
        height: 630,
        alt: 'OpenBook Waitlist',
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpenBook Waitlist',
    description: 'Join the Waitlist for Early Access to OpenBook. Be the first to explore AI-powered, multilingual learning.',
    images: ['/openbook_opengraph.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-precomposed.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
      </head>
      <body>{children}</body>
    </html>
  )
}
