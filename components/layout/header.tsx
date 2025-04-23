'use client'

import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="Logo" width={120} height={40} priority />
            <span className="sr-only">Home</span>
          </Link>
        </div>
        
        <nav className="flex items-center gap-4">
          <Link 
            href="/create" 
            className="text-sm font-medium hover:text-primary"
          >
            Create
          </Link>
          <Link 
            href="/auth/sign-in" 
            className="rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  )
} 