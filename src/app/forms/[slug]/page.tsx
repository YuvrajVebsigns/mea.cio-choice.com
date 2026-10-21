import { use } from 'react';
import { DynamicForm } from '@/components/forms/DynamicForm';

interface FormPageProps {
  params: Promise<{ slug: string }>;
}

export default function PublicFormPage({ params }: FormPageProps) {
  const { slug } = use(params);

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 bg-gradient-to-b from-[#0B0F19] via-[#0F172A] to-[#0B0F19] relative overflow-hidden">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[400px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <DynamicForm slug={slug} />
      </div>
    </main>
  );
}
