import { TextInputForm } from '@/components/form/text-input-form';

export default function CreatePage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-center text-2xl font-bold md:text-3xl">
        Create Infographic from Text
      </h1>
      
      <div className="mb-8 rounded-lg border bg-card p-6 shadow-sm">
        <TextInputForm />
      </div>
      
      <p className="text-center text-sm text-muted-foreground">
        No login required. Sign in to unlock more features (coming soon)
      </p>
    </main>
  )
} 