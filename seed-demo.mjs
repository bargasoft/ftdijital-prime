import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Ayarları Güncelle
  const settings = [
    { key: 'site_logo_text', value: 'FT Dijital Prime' },
    { key: 'primary_color', value: '#8b5cf6' },
  ];
  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: { key: s.key, value: s.value },
    });
  }

  // 2. Menüleri Oluştur
  const headerMenu = await prisma.menu.upsert({
    where: { name: 'header' },
    update: {},
    create: { name: 'header' },
  });

  await prisma.menuItem.deleteMany({ where: { menuId: headerMenu.id } });
  const headerItems = [
    { label: 'Anasayfa', url: '/', order: 1 },
    { label: 'Hizmetlerimiz', url: '#hizmetler', order: 2 },
    { label: 'Çözümlerimiz', url: '#cozumler', order: 3 },
    { label: 'Referanslar', url: '/referanslar', order: 4 },
  ];
  for (const item of headerItems) {
    await prisma.menuItem.create({ data: { ...item, menuId: headerMenu.id } });
  }

  // 3. Slider Temizle ve Yeni Ekle
  await prisma.slider.deleteMany();
  await prisma.slider.create({
    data: {
      title: 'Dijital Dönüşümde Lider Çözümler',
      subtitle: 'Modern, ölçeklenebilir ve güvenli yazılım mimarileri ile işletmenizi geleceğe taşıyoruz. BarGa Soft güvencesiyle.',
      btnText: 'Hemen Başlayın',
      // Mockup hissiyatı için görsel yerine harika bir gradient veya placeholder görsel verebiliriz.
      // imageUrl: '' 
    }
  });

  // 4. Hizmetler (Services)
  await prisma.service.deleteMany();
  const services = [
    { title: 'Özel Yazılım Geliştirme', description: 'İhtiyaçlarınıza özel, yüksek performanslı ve güvenli web & mobil uygulamalar tasarlıyoruz.', icon: 'Code' },
    { title: 'Bulut Bilişim Çözümleri', description: 'Verilerinizin güvenliğini sağlayan ve her an erişilebilir kılan modern bulut mimarileri.', icon: 'Database' },
    { title: 'Veri Analitiği ve Yapay Zeka', description: 'İşletme verilerinizi analiz ediyor, yapay zeka destekli öngörülerle kararlarınızı güçlendiriyoruz.', icon: 'LineChart' },
  ];
  for (const s of services) {
    await prisma.service.create({ data: s });
  }

  // 5. Çözüm Kategorilerini ve Çözümleri Oluştur
  await prisma.solution.deleteMany();
  const categories = ['Kobi Çözümleri', 'ERP Çözümleri'];
  const dbCategories = {};
  
  for (const catName of categories) {
    const cat = await prisma.solutionCategory.upsert({
      where: { name: catName },
      update: {},
      create: { name: catName, isActive: true, order: 0 }
    });
    dbCategories[catName] = cat.id;
  }

  const solutions = [
    { title: 'Go 3', categoryId: dbCategories['Kobi Çözümleri'], items: "It's possible to simultaneously manage and transform information from one server..." },
    { title: 'Go Wings', categoryId: dbCategories['Kobi Çözümleri'], items: "Back up your database, store in a safe and secure place while still maintaining ..." },
    { title: 'Tiger 3', categoryId: dbCategories['ERP Çözümleri'], items: "Back up your database, store in a safe and secure place while still maintaining ..." },
    { title: 'Tiger Wings Enterprise', categoryId: dbCategories['ERP Çözümleri'], items: "We provide the most responsive and functional IT design for companies and busine..." },
    { title: 'Netsis Wings Enterprise', categoryId: dbCategories['ERP Çözümleri'], items: "It's possible to simultaneously manage and transform information from one server..." },
    { title: 'Netsis Wings Entegre', categoryId: dbCategories['ERP Çözümleri'], items: "We provide the most responsive and functional IT design for companies and busine..." },
  ];

  for (const [index, solution] of solutions.entries()) {
    await prisma.solution.create({
      data: {
        ...solution,
        order: index,
        isActive: true
      }
    });
  }

  console.log('✅ Demo içerikler başarıyla oluşturuldu!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
