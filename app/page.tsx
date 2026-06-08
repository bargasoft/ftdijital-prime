import prisma from '@/lib/db';
import styles from './public.module.css';

export const revalidate = 0; // Her zaman veritabanından en güncel veriyi çek

export default async function HomePage() {
  const sliders = await prisma.slider.findMany({ orderBy: { order: 'asc' } });
  const activeSlider = sliders.length > 0 ? sliders[sliders.length - 1] : null;

  return (
    <main>
      {/* Hero Section / Slider - Dinamik Veri */}
      <section className={styles.hero}>
        <h1 className={styles.title}>
          {activeSlider ? activeSlider.title : "Geleceğin İşletmelerini Yeniden İnşa Ediyoruz"}
        </h1>
        <p className={styles.subtitle}>
          {activeSlider?.subtitle || "Logo Yazılım ürünleriyle dijital dönüşümünüzü hızlandırın, küresel standartlarda operasyonel mükemmelliğe ulaşın."}
        </p>
        <button className={styles.button}>
          {activeSlider?.btnText || "Hemen Başlayın"}
        </button>
      </section>

      {/* Services Section - Statik/Örnek Veri */}
      <section className={styles.servicesSection}>
        <h2 className={styles.sectionTitle}>Prime Hizmetlerimiz</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Dijital Dönüşüm Danışmanlığı</h3>
            <p className={styles.cardDesc}>İş süreçlerinizi modern yazılımlarla entegre ederek verimliliğinizi maksimize ediyoruz. Gelenekselden dijitale köprü kuruyoruz.</p>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Özel Yazılım Geliştirme</h3>
            <p className={styles.cardDesc}>Sadece size özel, işletmenizin DNA'sına uygun ölçeklenebilir ve yüksek performanslı yazılımlar tasarlıyoruz.</p>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Logo ERP Çözümleri</h3>
            <p className={styles.cardDesc}>Logo Tiger, GO ve Netsis ürünlerinin kusursuz kurulumu, optimizasyonu ve desteği ile işletmenizi büyütüyoruz.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
