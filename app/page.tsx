'use client';
import { useEffect, useState } from 'react';
import styles from './public.module.css';
import { ArrowRight, Code, Database, LineChart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const [sliderData, setSliderData] = useState<{title: string, subtitle: string, btnText: string} | null>(null);

  useEffect(() => {
    fetch('/api/slider').then(res => res.json()).then(data => {
      if (data && data.length > 0) {
        setSliderData(data[data.length - 1]);
      }
    });
  }, []);

  return (
    <main style={{ backgroundColor: '#f8fafc' }}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <div style={{ marginBottom: '2rem', padding: '0.5rem 1rem', background: 'rgba(14, 165, 233, 0.1)', color: '#0ea5e9', borderRadius: '9999px', fontWeight: '600', fontSize: '0.875rem' }}>
            ✨ FT Dijital Prime Yayında
          </div>
          
          <h1 className={styles.title}>
            {sliderData ? sliderData.title : "Geleceğin İşletmelerini Yeniden İnşa Ediyoruz"}
          </h1>
          <p className={styles.subtitle}>
            {sliderData?.subtitle || "Logo Yazılım ürünleriyle dijital dönüşümünüzü hızlandırın, küresel standartlarda operasyonel mükemmelliğe ulaşın."}
          </p>
          
          <div className={styles.buttonGroup}>
            <button className={styles.primaryButton}>
              {sliderData?.btnText || "Hemen Başlayın"}
              <ArrowRight size={20} />
            </button>
            <button className={styles.secondaryButton}>
              Referanslarımızı İnceleyin
            </button>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className={styles.servicesSection}>
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Prime Hizmetlerimiz
        </motion.h2>
        
        <div className={styles.grid}>
          <motion.div className={styles.card} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <div className={styles.iconWrapper}>
              <LineChart size={32} />
            </div>
            <h3 className={styles.cardTitle}>Dijital Dönüşüm</h3>
            <p className={styles.cardDesc}>İş süreçlerinizi modern yazılımlarla entegre ederek verimliliğinizi maksimize ediyoruz. Gelenekselden dijitale güçlü bir köprü kuruyoruz.</p>
          </motion.div>
          
          <motion.div className={styles.card} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <div className={styles.iconWrapper} style={{ color: '#8b5cf6' }}>
              <Code size={32} />
            </div>
            <h3 className={styles.cardTitle}>Özel Yazılım</h3>
            <p className={styles.cardDesc}>Sadece size özel, işletmenizin DNA'sına tam uygun ölçeklenebilir ve yüksek performanslı modern web mimarileri tasarlıyoruz.</p>
          </motion.div>
          
          <motion.div className={styles.card} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <div className={styles.iconWrapper} style={{ color: '#ec4899' }}>
              <Database size={32} />
            </div>
            <h3 className={styles.cardTitle}>Logo ERP Çözümleri</h3>
            <p className={styles.cardDesc}>Logo Tiger, GO ve Netsis ürünlerinin kusursuz kurulumu, optimizasyonu ve desteği ile işletmenizin potansiyelini büyütüyoruz.</p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
