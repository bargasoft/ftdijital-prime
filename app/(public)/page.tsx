import prisma from '@/lib/db';
import styles from '../public.module.css';
import { ArrowRight, Play, Search, Target, TrendingUp, ClipboardList, Settings, BarChart3, CheckCircle, Clock, Users, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default async function HomePage() {
  const sliders = await prisma.slider.findMany({ orderBy: { order: 'asc' } });
  
  const defaultSlider = {
    title: 'İşletmenizin Tüm Sistemlerini Anlar, Düzenler ve Büyüten Ortağınız.',
    subtitle: 'Dağınık sistemleri tek bir yapıda birleştiriyor, işletmenizin verimliliğini artırıyor ve sürdürülebilir büyümenizi sağlıyoruz.',
    btnText: 'Yaklaşımımızı Keşfedin',
    btnLink: '#yaklasimimiz',
    imageUrl: '/slider-bg.png'
  };

  const activeSlider = sliders.length > 0 ? sliders[0] : defaultSlider;

  return (
    <main>
      
      {/* 1. HERO ALANI */}
      <section className={styles.hero}>
        <div className={`${styles.container} ${styles.heroContent}`}>
          
          <div className={styles.heroLeft}>
            <h1 className={styles.titleMain}>
              İşletmenizin <br />
              Tüm Sistemlerini <br />
              <span className={styles.gradientText}>
                Anlar, Düzenler ve
              </span> <br />
              <span className={styles.gradientText}>
                Büyüten
              </span> Ortağınız.
            </h1>
            <p className={styles.subtitleMain}>
              Dağınık sistemleri tek bir yapıda birleştiriyor,
              işletmenizin verimliliğini artırıyor ve sürdürülebilir
              büyümenizi sağlıyoruz.
            </p>
            <div className={styles.heroButtons}>
              <button className={styles.primaryBtn}>
                Yaklaşımımızı Keşfedin <ArrowRight size={20} />
              </button>
              <button className={styles.secondaryBtn}>
                <div className={styles.playIcon}>
                  <Play size={20} fill="currentColor" />
                </div>
                FT Dijital'i Tanıyın
              </button>
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.radiantGrid}>
              {/* Tasarımcıdan gelen 8 adet KESİLMİŞ (Şeffaf) dilim tam yerlerine konumlandırılır. 
                  Bu sayede tasarım birebir korunurken, her biri ayrı ayrı hover efekti alabilir. */}
              <img src="/uretim.png" alt="Üretim" className={`${styles.piece} ${styles.pieceUretim}`} />
              <img src="/depo.png" alt="Depo" className={`${styles.piece} ${styles.pieceDepo}`} />
              <img src="/otel.png" alt="Otel" className={`${styles.piece} ${styles.pieceOtel}`} />
              <img src="/muhasebe.png" alt="Muhasebe" className={`${styles.piece} ${styles.pieceMuhasebe}`} />
              <img src="/yonetim.png" alt="Yönetim" className={`${styles.piece} ${styles.pieceYonetim}`} />
              <img src="/teknoloji.png" alt="Teknoloji" className={`${styles.piece} ${styles.pieceTeknoloji}`} />
              <img src="/guvenlik.png" alt="Güvenlik" className={`${styles.piece} ${styles.pieceGuvenlik}`} />
              <img src="/ft-dijital.png" alt="Merkez Logo" className={styles.pieceCenter} />
            </div>
          </div>

        </div>
      </section>

      {/* 2. YAKLAŞIMIMIZ */}
      <section className={`${styles.section} ${styles.approachSection}`} id="yaklasimimiz">
        <div className={`${styles.container} ${styles.approachGrid}`}>
          <div className={styles.approachLeft}>
            <span className={styles.sectionLabel}>YAKLAŞIMIMIZ</span>
            <h2 className={styles.approachTitle}>
              Teknolojiyi Araç Olarak Kullanır, <span>İşletmenizi</span> Merkeze Koyarız.
            </h2>
          </div>
          <div className={styles.approachRight}>
            <div className={styles.approachCard}>
              <Search size={40} className={styles.approachIcon} />
              <h3 className={styles.approachCardTitle}>Derinlemesine Analiz</h3>
              <p className={styles.approachCardDesc}>Mevcut yapınızı inceler, fırsatları ve riskleri ortaya çıkarırız.</p>
            </div>
            <div className={styles.approachCard}>
              <Target size={40} className={styles.approachIcon} />
              <h3 className={styles.approachCardTitle}>Doğru Yapılandırma</h3>
              <p className={styles.approachCardDesc}>İhtiyaçlarınıza uygun çözümleri entegre ederek sisteminizi kurarız.</p>
            </div>
            <div className={styles.approachCard}>
              <TrendingUp size={40} className={styles.approachIcon} />
              <h3 className={styles.approachCardTitle}>Sürekli İyileştirme</h3>
              <p className={styles.approachCardDesc}>Veriye dayalı yönetimle süreçlerinizi sürekli geliştiririz.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SÜRECİMİZ */}
      <section className={`${styles.section} ${styles.processSection}`}>
        <div className={styles.container}>
          <span className={styles.sectionLabel}>SÜRECİMİZ</span>
          <h2 className={styles.processTitle}>Analizden Sonuca<br />Uçtan Uca Yönetim.</h2>
          
          <div className={styles.timeline}>
            
            <div className={styles.timelineStep}>
              <div className={styles.timelineIcon}><ClipboardList size={32} /></div>
              <h3 className={styles.timelineStepTitle}>1. Keşif & Analiz</h3>
              <p className={styles.timelineStepDesc}>İşletmenizi, süreçlerinizi ve sistemlerinizi detaylı şekilde analiz ederiz.</p>
            </div>
            
            <div className={styles.timelineStep}>
              <div className={styles.timelineIcon}><Target size={32} /></div>
              <h3 className={styles.timelineStepTitle}>2. Strateji & Planlama</h3>
              <p className={styles.timelineStepDesc}>İhtiyaçlara özel yol haritası oluşturur, öncelikleri belirleriz.</p>
            </div>
            
            <div className={styles.timelineStep}>
              <div className={styles.timelineIcon}><Settings size={32} /></div>
              <h3 className={styles.timelineStepTitle}>3. Uygulama & Entegrasyon</h3>
              <p className={styles.timelineStepDesc}>Çözümleri devreye alır, tüm sistemleri entegre ederek çalıştırırız.</p>
            </div>
            
            <div className={styles.timelineStep}>
              <div className={styles.timelineIcon}><BarChart3 size={32} /></div>
              <h3 className={styles.timelineStepTitle}>4. Yönetim & Destek</h3>
              <p className={styles.timelineStepDesc}>Sistemi yönetir, izler ve sürekli destek sağlayarak değer üretiriz.</p>
            </div>
            
            <div className={styles.timelineStep}>
              <div className={styles.timelineIcon}><CheckCircle size={32} /></div>
              <h3 className={styles.timelineStepTitle}>5. Büyüme & Sürdürülebilirlik</h3>
              <p className={styles.timelineStepDesc}>Verimliliği artırır, işletmenizin büyümesine uzun vadeli katkı sağlarız.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. DENEYİM (STATS) & CTA */}
      <section className={styles.section} style={{ paddingBottom: '0' }}>
        <div className={styles.container}>
          
          {/* Stats Bar */}
          <div className={styles.statsBox}>
            <div className={styles.statsLeft}>
              <h2 className={styles.statsTitle}>Deneyimimizle<br/>İşletmelere Değer<br/>Katıyoruz.</h2>
            </div>
            
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <Clock size={28} className={styles.statIcon} />
                <div className={styles.statValue}>20+</div>
                <div className={styles.statLabel}>Yıllık Deneyim</div>
              </div>
              <div className={styles.statItem}>
                <Users size={28} className={styles.statIcon} />
                <div className={styles.statValue}>250+</div>
                <div className={styles.statLabel}>Mutlu Müşteri</div>
              </div>
              <div className={styles.statItem}>
                <Briefcase size={28} className={styles.statIcon} />
                <div className={styles.statValue}>500+</div>
                <div className={styles.statLabel}>Tamamlanan Proje</div>
              </div>
              <div className={styles.statItem}>
                <Settings size={28} className={styles.statIcon} />
                <div className={styles.statValue}>7/24</div>
                <div className={styles.statLabel}>Teknik Destek</div>
              </div>
            </div>
            
            <div className={styles.statsRight}>
              Farklı sektörlerden işletmelerin dijital dönüşüm süreçlerine değer katıyoruz.
            </div>
          </div>

        </div>
      </section>

      {/* CTA ALANI */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaBox}>
            <div>
              <h2 className={styles.ctaTitle}>İşletmenizin Tüm Dijital Altyapısını<br/>Güvenle Yönetmeye Hazırız.</h2>
              <p className={styles.ctaDesc}>Siz işinize odaklanın, gerisini biz yönetelim.</p>
            </div>
            <button className={styles.ctaBtn}>
              Bize Ulaşın <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}
