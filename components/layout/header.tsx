'use client'

import Link from 'next/link'

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link 
            href="/" 
            className="text-xl font-bold"
          >
            Text to Infographic
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