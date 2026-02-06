import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display' })

export const metadata: Metadata = {
  title: 'Paris Restaurant Map | Très Très Bon',
  description: 'Discover the best restaurants in Paris curated by Très Très Bon',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
