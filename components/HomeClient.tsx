'use client';
import styles from '../app/public.module.css';
import { ArrowRight, Code, Database, LineChart, Cpu, Layout, Smartphone, ShieldCheck, Cog } from 'lucide-react';
import { motion } from 'framer-motion';

// Mapping lucide-react icons by string name
const IconMap: Record<string, any> = {
  LineChart, Code, Database, Cpu, Layout, Smartphone, ShieldCheck, Cog
};

export default function HomeClient({ 
  sliderData, 
  servicesData,
  solutionsData
}: { 
  sliderData: any, 
  servicesData: any[],
  solutionsData: any[]
}) {
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
          Hizmetlerimiz
        </motion.h2>
        
        <div className={styles.grid}>
          {servicesData.length > 0 ? servicesData.map((service, index) => {
            const Icon = IconMap[service.icon || 'Code'] || Code;
            return (
              <motion.div key={service.id} className={styles.card} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <div className={styles.iconWrapper}>
                  <Icon size={32} />
                </div>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{service.description}</p>
              </motion.div>
            )
          }) : (
            <div style={{gridColumn: '1 / -1', textAlign: 'center', color: '#64748b'}}>Henüz hizmet eklenmemiş.</div>
          )}
        </div>
      </section>

      {/* Solutions Section */}
      <section className={styles.servicesSection} style={{background: 'white'}}>
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Çözümlerimiz
        </motion.h2>
        
        <div className={styles.grid}>
          {solutionsData.length > 0 ? solutionsData.map((solution, index) => (
            <motion.div key={solution.id} className={styles.card} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} style={{background: '#f8fafc', boxShadow: 'none', border: '1px solid #e2e8f0'}}>
              <h3 className={styles.cardTitle} style={{color: '#0ea5e9'}}>{solution.title}</h3>
              <div style={{fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem', fontWeight: 600}}>{solution.category}</div>
              <p className={styles.cardDesc}>{solution.items}</p>
            </motion.div>
          )) : (
            <div style={{gridColumn: '1 / -1', textAlign: 'center', color: '#64748b'}}>Henüz çözüm eklenmemiş.</div>
          )}
        </div>
      </section>
    </main>
  );
}
