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
  solutionsData,
  homeLayout = ['slider', 'services', 'solutions']
}: { 
  sliderData: any, 
  servicesData: any[],
  solutionsData: any[],
  homeLayout?: string[]
}) {
  
  // Modül Render Fonksiyonu
  const renderModule = (moduleName: string) => {
    switch (moduleName) {
      case 'slider': {
        const hasImage = !!sliderData?.imageUrl;
        return (
          <section 
            key={moduleName}
            style={{
              background: hasImage ? `url(${sliderData.imageUrl}) center/cover no-repeat` : 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
              color: 'white', 
              padding: '8rem 1rem', 
              textAlign: 'center',
              position: 'relative'
            }}
          >
            {hasImage && <div style={{position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 0}}></div>}
            <div style={{position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto'}}>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{fontSize: '3.5rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.2}}
              >
                {sliderData?.title || 'FT Dijital Prime'}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{fontSize: '1.25rem', opacity: 0.9, marginBottom: '2.5rem'}}
              >
                {sliderData?.subtitle || 'Geleceğin işletmelerini yeniden inşa ediyoruz. Dijital dönüşüm ve yazılım çözümlerinde güvenilir iş ortağınız.'}
              </motion.p>
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                style={{background: 'white', color: '#0ea5e9', border: 'none', padding: '1rem 2.5rem', borderRadius: '9999px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'}}
              >
                {sliderData?.btnText || 'Projelerimizi İnceleyin'}
              </motion.button>
            </div>
          </section>
        );
      }
        
      case 'services':
        return (
          <section key="services" id="hizmetler" className={styles.servicesSection}>
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
        );

      case 'solutions':
        return (
          <section key="solutions" id="cozumler" className={styles.servicesSection} style={{background: 'white'}}>
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
        );
        
      default:
        return null;
    }
  };

  return (
    <main style={{ backgroundColor: '#f8fafc' }}>
      {/* Modüller Sürükle-Bırak Sıralamasına Göre Render Edilir */}
      {homeLayout.map(moduleName => renderModule(moduleName))}
    </main>
  );
}
