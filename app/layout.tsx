import '../styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FloatingCta } from '@/components/floating-cta'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Text to Infographic | AI Text to Infographic',
  description: 'Convert your text into high-quality infographics using AI, free and no login required.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/tab-icon.svg" type="image/svg+xml" sizes="32x32" />
        <link rel="icon" href="/images/android-chrome-512x512.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/images/apple-icon.png" />
      </head>
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
          <FloatingCta />
        </div>
      </body>
    </html>
  )
}