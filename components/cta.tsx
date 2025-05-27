'use client';

import Link from 'next/link';

export function Cta() {
  return (
    <div className="mt-0 mb-24 max-w-4xl w-full">
      <div className="glass-card p-10 card-shadow text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-heading">
          Ready to Create Your Infographic?
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <span className="bg-primary/20 text-primary font-medium text-sm px-4 py-1.5 rounded-full">
            Free to use
          </span>
          <span className="bg-secondary/20 text-secondary font-medium text-sm px-4 py-1.5 rounded-full">
            No login required
          </span>
          <span className="bg-purple-100 text-purple-600 font-medium text-sm px-4 py-1.5 rounded-full">
            No experience needed
          </span>
        </div>

        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Transform your text into stunning infographics in seconds. Our AI handles all the design
          work for you.
        </p>

        <Link href="/create" className="btn-gradient text-lg px-8 py-4 rounded-lg inline-block">
          Start Creating Now
        </Link>
      </div>
    </div>
  );
}
