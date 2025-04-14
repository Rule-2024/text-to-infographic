export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-24">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
          Text to Infographic
        </h1>
        <p className="max-w-2xl text-lg text-gray-700 dark:text-gray-300">
          Easily convert text to beautiful infographics using AI, no design experience needed
        </p>
      </div>
      <div className="flex flex-col items-center">
        <a 
          href="/create" 
          className="mb-6 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Start Creating
        </a>
        <p className="text-sm text-gray-500">
          Free to use, no login required
        </p>
      </div>
    </main>
  )
} 