import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Step Together Line Dance — Connecting People Through Line Dance',
  description:
    'Step Together Line Dance connects communities through the joy of line dancing. In-person classes, events, online platform, workshops, and more — led by founder Cinnamon Leigh Dull.',
  keywords: ['line dance', 'line dancing classes', 'step together', 'Cinnamon Dull', 'dance community'],
  openGraph: {
    title: 'Step Together Line Dance',
    description: 'Connecting People Through Line Dance',
    images: ['/cover.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
