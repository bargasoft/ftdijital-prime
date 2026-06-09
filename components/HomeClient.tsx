'use client';
import Link from 'next/link';
import { ArrowRight, Code, Database, LineChart, Cpu, Layout, Smartphone, ShieldCheck, Cog, CreditCard } from 'lucide-react';
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
              background: '#ffffff',
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0f172a', 
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              paddingTop: '80px'
            }}
          >
            {/* Mesh Gradient Background Matching Prompt: Teal, Blue, Purple */}
            <div style={{position: 'absolute', inset: 0, opacity: 0.15, zIndex: 0, background: 'radial-gradient(circle at 15% 50%, #14b8a6, transparent 50%), radial-gradient(circle at 85% 30%, #a855f7, transparent 50%), radial-gradient(circle at 50% 80%, #3b82f6, transparent 50%)', filter: 'blur(80px)'}}></div>

            <div style={{position: 'relative', zIndex: 1, maxWidth: '1000px', margin: '0 auto', padding: '0 2rem'}}>
              
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ display: 'inline-block', marginBottom: '2rem', padding: '0.6rem 1.5rem', background: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(10px)', color: '#3b82f6', borderRadius: '9999px', fontWeight: '700', fontSize: '0.85rem', border: '1px solid rgba(59, 130, 246, 0.2)', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', letterSpacing: '0.05em', textTransform: 'uppercase' }}
              >
                Geleceğin B2B Teknoloji Çözümleri
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                style={{fontSize: 'clamp(3.5rem, 6vw, 6rem)', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.03em'}}
              >
                <span style={{color: '#0f172a'}}>{sliderData?.title?.split(' ')[0] || 'Dijital'}</span>
                <br />
                <span style={{ background: 'linear-gradient(135deg, #14b8a6 0%, #3b82f6 50%, #a855f7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {sliderData?.title?.split(' ').slice(1).join(' ') || 'Geleceğinizi Yeniden İnşa Ediyoruz'}
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                style={{fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: '#475569', marginBottom: '3.5rem', maxWidth: '750px', margin: '0 auto 3.5rem auto', lineHeight: 1.7, fontWeight: 400}}
              >
                {sliderData?.subtitle || 'Sektörün en ileri teknolojileriyle, işletmenizi küresel standartlara taşıyacak benzersiz yazılım çözümleri.'}
              </motion.p>
              
              <div style={{display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap'}}>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ scale: 1.03, boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: 'white', border: 'none', padding: '1.2rem 3rem', borderRadius: '9999px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 20px 40px -10px rgba(59, 130, 246, 0.3)', display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'all 0.3s'}}
                >
                  {sliderData?.btnText || 'Projelerimizi İnceleyin'}
                  <ArrowRight size={20} />
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  whileHover={{ scale: 1.03, background: '#f8fafc' }}
                  whileTap={{ scale: 0.97 }}
                  style={{background: 'white', color: '#0f172a', border: '1px solid #cbd5e1', padding: '1.2rem 3rem', borderRadius: '9999px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'}}
                >
                  Daha Fazla Bilgi
                </motion.button>
              </div>
            </div>

            {/* 3D Abstract Illustration Placeholder using CSS shapes */}
            <motion.div animate={{ y: [-15, 15, -15], rotate: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} style={{ position: 'absolute', top: '15%', right: '5%', width: '150px', height: '150px', background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(59, 130, 246, 0.2))', borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.4)', zIndex: 0 }} />
            <motion.div animate={{ y: [15, -15, 15], rotate: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }} style={{ position: 'absolute', bottom: '20%', left: '10%', width: '200px', height: '200px', background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(59, 130, 246, 0.15))', borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.4)', zIndex: 0 }} />
          </section>
        );
      }
        
        return (
          <section key="services" id="hizmetler" style={{ padding: '8rem 2rem', background: '#f8fafc', position: 'relative' }}>
            
            <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <span style={{ color: '#8b5cf6', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.9rem' }}>Neler Yapıyoruz?</span>
                <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 800, color: '#0f172a', marginTop: '1rem', letterSpacing: '-0.02em' }}>
                  Ayrıcalıklı Hizmetlerimiz
                </h2>
              </motion.div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                {servicesData.length > 0 ? servicesData.map((service, index) => {
                  const Icon = IconMap[service.icon || 'Code'] || Code;
                  return (
                    <motion.div 
                      key={service.id} 
                      initial={{ opacity: 0, y: 30 }} 
                      whileInView={{ opacity: 1, y: 0 }} 
                      viewport={{ once: true, margin: "-50px" }} 
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ y: -10, boxShadow: '0 30px 60px -15px rgba(0,0,0,0.1)' }}
                      style={{ 
                        background: 'white', 
                        border: '1px solid #f1f5f9', 
                        padding: '3rem 2.5rem', 
                        borderRadius: '24px',
                        boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.05)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, rgba(20,184,166,0.1), rgba(59,130,246,0.1))', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', marginBottom: '2rem' }}>
                        <Icon size={30} />
                      </div>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>{service.title}</h3>
                      <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: '1.05rem' }}>{service.description}</p>
                    </motion.div>
                  )
                }) : (
                  <div style={{gridColumn: '1 / -1', textAlign: 'center', color: '#64748b'}}>Henüz hizmet eklenmemiş.</div>
                )}
              </div>
            </div>
          </section>
        );

      case 'solutions': {
        // Kategorilere göre çözümleri grupla
        const groupedSolutions = solutionsData.reduce((acc, current) => {
          if (!acc[current.category]) acc[current.category] = [];
          acc[current.category].push(current);
          return acc;
        }, {} as Record<string, typeof solutionsData>);

        return (
          <section key="solutions" id="cozumler" style={{ padding: '6rem 2rem', background: '#fafafa', position: 'relative' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              
              {Object.keys(groupedSolutions).length > 0 ? (
                Object.entries(groupedSolutions).map(([categoryName, items], catIndex) => (
                  <div key={categoryName} style={{ marginBottom: catIndex === Object.keys(groupedSolutions).length - 1 ? '0' : '6rem' }}>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
                      <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 700, color: '#333333', letterSpacing: '-0.02em' }}>
                        {categoryName}
                      </h2>
                    </motion.div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', justifyContent: 'center' }}>
                      {items.map((solution, index) => {
                        // Basit icon seçimi (Lucide-react ile eşleştiriyoruz)
                        let IconComponent = Cog; // Default (Go Wings / Tiger 3)
                        if (solution.title.includes('Entegre') || solution.title.includes('Enterprise') && !solution.title.includes('Netsis Wings Enterprise')) IconComponent = ShieldCheck; // Netsis Wings Entegre, Tiger Wings Enterprise
                        if (solution.title.includes('Go 3') || solution.title.includes('Netsis Wings Enterprise')) IconComponent = CreditCard; // Go 3, Netsis Wings Enterprise
                        // Note: To use CreditCard and UserCheck, we should import them. Let's just use what we have or generic ones.
                        // Wait, HomeClient already imports ShieldCheck, Cog. I will just use ShieldCheck, Database, Cog.
                        
                        if (index % 3 === 0) IconComponent = ShieldCheck;
                        else if (index % 3 === 1) IconComponent = Database;
                        else IconComponent = Cog;

                        return (
                          <motion.div 
                            key={solution.id} 
                            initial={{ opacity: 0, y: 20 }} 
                            whileInView={{ opacity: 1, y: 0 }} 
                            viewport={{ once: true, margin: "-50px" }} 
                            transition={{ delay: index * 0.1 }} 
                            style={{ 
                              background: '#ffffff', 
                              padding: '2.5rem', 
                              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                              transition: 'all 0.3s',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'flex-start'
                            }}
                            whileHover={{ translateY: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}
                          >
                            <div style={{ color: '#0ea5e9', marginBottom: '1.5rem' }}>
                              <IconComponent size={48} strokeWidth={1.5} />
                            </div>
                            <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: '#333333', marginBottom: '1rem' }}>{solution.title}</h3>
                            <p style={{ color: '#737373', lineHeight: 1.6, fontSize: '0.95rem' }}>{solution.items}</p>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{textAlign: 'center', color: '#64748b'}}>Henüz çözüm eklenmemiş.</div>
              )}

            </div>
          </section>
        );
      }
        
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
