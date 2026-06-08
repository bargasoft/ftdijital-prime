import prisma from '@/lib/db';
import HomeClient from '@/components/HomeClient';

// Yüksek performans ve SEO için revalidate süresi (örn: 60 saniye)
export const revalidate = 60;

export default async function HomePage() {
  // Veritabanından tüm ön yüz verilerini Server-side olarak çekiyoruz.
  const [sliders, services, solutions] = await Promise.all([
    prisma.slider.findMany({ orderBy: { order: 'asc' } }),
    prisma.service.findMany({ orderBy: { order: 'asc' } }),
    prisma.solution.findMany({ orderBy: { order: 'asc' } })
  ]);

  // Sadece son eklenen veya aktif olan slider'ı alıyoruz
  const activeSlider = sliders.length > 0 ? sliders[sliders.length - 1] : null;

  return (
    <HomeClient 
      sliderData={activeSlider}
      servicesData={services}
      solutionsData={solutions}
    />
  );
}
