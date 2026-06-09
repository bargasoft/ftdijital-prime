'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Cog, CreditCard, Database, ArrowRight, Zap, Globe } from 'lucide-react';
import Link from 'next/link';

export default function SolutionsClient({ solutionsData }: { solutionsData: any[] }) {
  // Çözümleri kategorilerine göre gruplandır
  const groupedSolutions = solutionsData.reduce((acc, current) => {
    const catName = current.category?.name || 'Kategorisiz';
    if (!acc[catName]) acc[catName] = [];
    acc[catName].push(current);
    return acc;
  }, {} as Record<string, typeof solutionsData>);

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>
      
      {/* Özel Hero Alanı */}
      <section style={{ 
        position: 'relative', 
        padding: '12rem 2rem 8rem', 
        background: '#0f172a', 
        overflow: 'hidden',
        textAlign: 'center'
      }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(14,165,233,0.2) 0%, transparent 60%)', filter: 'blur(50px)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 60%)', filter: 'blur(50px)', pointerEvents: 'none' }}></div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span style={{ color: '#38bdf8', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.9rem' }}>Kurumsal Ölçekte</span>
            <h1 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 800, color: 'white', marginTop: '1rem', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              İşletmenizi Geleceğe Taşıyan <br />
              <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.5)', background: 'linear-gradient(135deg, #38bdf8, #c084fc)', WebkitBackgroundClip: 'text' }}>Akıllı Çözümler</span>
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '1.25rem', lineHeight: 1.7, maxWidth: '700px', margin: '0 auto' }}>
              Karmaşık iş süreçlerinizi basitleştiren, verimliliğinizi artıran ve global standartlarda IT mimarisi sunan kurumsal altyapılarımızla tanışın.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dinamik Kategori Alanları */}
      {Object.keys(groupedSolutions).length > 0 ? (
        Object.entries(groupedSolutions).map(([categoryName, items], catIndex) => {
          const isEven = catIndex % 2 === 0;

          // Kategorilere özel arka plan renkleri/tasarımları
          const catBgGradient = isEven 
            ? 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' 
            : 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)';
          
          const titleColor = isEven ? '#0f172a' : 'white';
          const cardBg = isEven ? 'white' : 'rgba(255,255,255,0.03)';
          const cardBorder = isEven ? '1px solid #f1f5f9' : '1px solid rgba(255,255,255,0.05)';
          const cardTitleColor = isEven ? '#1e293b' : 'white';
          const cardTextColor = isEven ? '#64748b' : '#94a3b8';
          const shadowStyle = isEven ? '0 20px 40px -10px rgba(0,0,0,0.05)' : 'none';

          return (
            <section key={categoryName} style={{ padding: '8rem 2rem', background: isEven ? '#ffffff' : '#0f172a', position: 'relative', overflow: 'hidden' }}>
              <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: isEven ? 'row' : 'row-reverse', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
                
                {/* Sol/Sağ Yaratıcı Görsel Alanı */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  style={{ flex: '1 1 400px', position: 'relative' }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '500px', borderRadius: '30px', background: catBgGradient, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: isEven ? 'none' : '1px solid rgba(255,255,255,0.1)' }}>
                     {/* Creative Abstract Elements */}
                     <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} style={{ position: 'absolute', width: '300px', height: '300px', border: `2px dashed ${isEven ? '#cbd5e1' : '#334155'}`, borderRadius: '50%' }} />
                     <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} style={{ position: 'absolute', width: '200px', height: '200px', border: `1px solid ${isEven ? '#94a3b8' : '#475569'}`, borderRadius: '30%' }} />
                     
                     <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                       <Globe size={64} color={isEven ? '#3b82f6' : '#38bdf8'} strokeWidth={1} style={{ marginBottom: '1rem' }} />
                       <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: titleColor, letterSpacing: '-0.03em' }}>{categoryName}</h2>
                       <div style={{ width: '60px', height: '4px', background: isEven ? '#3b82f6' : '#38bdf8', margin: '1.5rem auto 0', borderRadius: '2px' }} />
                     </div>
                  </div>
                </motion.div>

                {/* Sağ/Sol Çözüm Kartları Listesi */}
                <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {items.map((solution, index) => {
                    let IconComponent = Cog;
                    if (solution.title.includes('Entegre') || (solution.title.includes('Enterprise') && !solution.title.includes('Netsis Wings Enterprise'))) IconComponent = ShieldCheck;
                    if (solution.title.includes('Go 3') || solution.title.includes('Netsis Wings Enterprise')) IconComponent = CreditCard;
                    
                    return (
                      <motion.div 
                        key={solution.id} 
                        initial={{ opacity: 0, y: 20 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: index * 0.15 }}
                        whileHover={{ scale: 1.02, x: isEven ? 10 : -10 }}
                        style={{ 
                          background: cardBg, 
                          border: cardBorder, 
                          padding: '2rem', 
                          borderRadius: '20px', 
                          boxShadow: shadowStyle,
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '1.5rem',
                          backdropFilter: isEven ? 'none' : 'blur(10px)',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <div style={{ padding: '1rem', background: isEven ? '#f0f9ff' : 'rgba(56, 189, 248, 0.1)', borderRadius: '16px', color: isEven ? '#0ea5e9' : '#38bdf8' }}>
                          <IconComponent size={32} strokeWidth={1.5} />
                        </div>
                        <div>
                          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: cardTitleColor, marginBottom: '0.5rem' }}>{solution.title}</h3>
                          <p style={{ color: cardTextColor, lineHeight: 1.6, fontSize: '0.95rem' }}>{solution.items}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

              </div>
            </section>
          )
        })
      ) : (
        <div style={{ padding: '8rem 2rem', textAlign: 'center', color: '#64748b' }}>Henüz çözüm eklenmemiş.</div>
      )}

      {/* CTA Alanı */}
      <section style={{ padding: '8rem 2rem', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', textAlign: 'center', color: 'white' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Zap size={48} strokeWidth={1} style={{ marginBottom: '2rem', opacity: 0.8 }} />
          <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>İşletmeniz İçin En Doğru Çözümü Birlikte Bulalım</h2>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '3rem', lineHeight: 1.7 }}>
            Uzman ekibimizle ihtiyaçlarınızı analiz edelim, size en uygun yazılım mimarisini kurgulayalım.
          </p>
          <Link href="/#iletisim" style={{ background: 'white', color: '#3b82f6', padding: '1.2rem 3rem', borderRadius: '9999px', fontWeight: 700, fontSize: '1.1rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', transition: 'transform 0.2s' }}>
            Hemen İletişime Geçin <ArrowRight size={20} />
          </Link>
        </div>
      </section>

    </div>
  );
}
