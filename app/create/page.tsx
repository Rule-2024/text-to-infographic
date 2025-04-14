import { TextInputForm } from '@/components/form/text-input-form';

export default function CreatePage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-center text-2xl font-bold md:text-3xl">
        输入文本生成信息图
      </h1>
      
      <div className="mb-8 rounded-lg border bg-card p-6 shadow-sm">
        <TextInputForm />
      </div>
      
      <p className="text-center text-sm text-muted-foreground">
        无需登录即可生成，登录可解锁更多功能（即将推出）
      </p>
    </main>
  )
} 