import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Test verileri oluşturuluyor...');

  // Temizlik
  await prisma.supportTicket.deleteMany();
  await prisma.deal.deleteMany();
  await prisma.customer.deleteMany();

  // Müşterileri Oluştur
  const customers = [
    { name: 'Ahmet Lojistik A.Ş.', email: 'bilgi@ahmetlojistik.com', company: 'Ahmet Lojistik', status: 'ACTIVE' },
    { name: 'Ayşe Tekstil Sanayi', email: 'muhasebe@aysetekstil.com', company: 'Ayşe Tekstil', status: 'ACTIVE' },
    { name: 'Demir Makine Ltd.', email: 'bt@demirmakine.com', company: 'Demir Makine', status: 'ACTIVE' },
  ];

  const createdCustomers = [];
  for (const c of customers) {
    const cust = await prisma.customer.create({ data: c });
    createdCustomers.push(cust);
  }

  // Biletleri (Ticket) Oluştur
  const tickets = [
    {
      subject: 'Logo Tiger Fatura Kesilmiyor',
      message: 'Merhaba, bugün sisteme girdiğimizde Logo Tiger üzerinde e-fatura keserken bağlantı hatası alıyoruz. GİB entegrasyonu mu koptu acaba? Acil desteğinizi rica ederiz.',
      priority: 'HIGH',
      status: 'OPEN',
      customerId: createdCustomers[0].id
    },
    {
      subject: 'Netsis Yıl Sonu Devir İşlemi',
      message: 'Mali müşavirimiz yıl sonu devir işlemlerinin yapılması gerektiğini söyledi. Önümüzdeki hafta içi uygun bir zamanda uzaktan bağlanıp devri gerçekleştirebilir miyiz?',
      priority: 'NORMAL',
      status: 'OPEN',
      customerId: createdCustomers[1].id
    },
    {
      subject: 'Go Wings Yeni Kullanıcı Açma',
      message: 'Muhasebe departmanımıza yeni bir arkadaş başladı. Ona Go Wings üzerinde sadece fatura modülünü görebileceği kısıtlı bir kullanıcı açmak istiyoruz. Nasıl yaparız?',
      priority: 'LOW',
      status: 'IN_PROGRESS',
      customerId: createdCustomers[2].id
    },
    {
      subject: 'Logo E-Defter Gönderim Hatası',
      message: 'Geçen ayın e-defterini beratını alırken zaman aşımı hatası verdi. Şema doğrulama hatası yazıyor ekranda.',
      priority: 'HIGH',
      status: 'CLOSED',
      customerId: createdCustomers[0].id
    }
  ];

  for (const t of tickets) {
    await prisma.supportTicket.create({ data: t });
  }

  console.log('✅ CRM Müşteri ve Destek Bileti (Ticket) verileri başarıyla oluşturuldu!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
