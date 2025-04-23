'use client'

import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 transition-transform duration-300 group-hover:scale-110">
              <Image src="/images/logo.svg" alt="Logo" fill className="object-contain" priority />
            </div>
            <span className="sr-only">Home</span>
          </Link>
        </div>

        <nav className="flex items-center gap-6">
          <Link
            href="/create"
            className="text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-primary after:to-secondary hover:after:w-full after:transition-all after:duration-300"
          >
            Create
          </Link>
          <Link
            href="/auth/sign-in"
            className="gradient-border px-4 py-2 text-sm font-medium transition-all duration-300 hover:shadow-md"
          >
            <span>Sign In</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}