import prisma from '@/lib/db';
import { notFound } from 'next/navigation';

// Next.js 15 requires async params
export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  const page = await prisma.page.findUnique({
    where: { slug: resolvedParams.slug, isPublished: true }
  });

  if (!page) {
    notFound();
  }

  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 200px)' }}>
      {/* Header Alanı */}
      <div style={{ background: '#0f172a', color: 'white', padding: '4rem 1rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0, letterSpacing: '-0.5px' }}>{page.title}</h1>
      </div>

      {/* İçerik Alanı */}
      <div style={{ maxWidth: '800px', margin: '3rem auto', padding: '0 1rem' }}>
        <div 
          style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', lineHeight: 1.8, color: '#334155' }}
          dangerouslySetInnerHTML={{ __html: page.content.replace(/\n/g, '<br/>') }}
        />
      </div>
    </main>
  );
}
