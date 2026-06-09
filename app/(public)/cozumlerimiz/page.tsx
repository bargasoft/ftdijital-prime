import prisma from '@/lib/db';
import SolutionsClient from './SolutionsClient';

export const metadata = {
  title: 'Çözümlerimiz | FT Dijital Prime',
  description: 'İşletmenizi geleceğe taşıyacak Kobi ve ERP çözümlerimiz.',
};

export default async function SolutionsPage() {
  const solutions = await prisma.solution.findMany({ 
    where: { isActive: true },
    include: { category: true },
    orderBy: { order: 'asc' } 
  });
  
  return (
    <main>
      <SolutionsClient solutionsData={solutions} />
    </main>
  );
}
