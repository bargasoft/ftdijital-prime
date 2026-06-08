import prisma from '@/lib/db';
import styles from '../public.module.css';

export default async function PublicBlogPage() {
  const blogs = await prisma.blog.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 className={styles.sectionTitle}>Blog & Haberler</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {blogs.length === 0 && <p style={{textAlign: 'center', color: '#64748b', width: '100%'}}>Henüz blog yazısı bulunmuyor.</p>}
          {blogs.map(blog => (
            <div key={blog.id} className={styles.card} style={{display: 'flex', flexDirection: 'column'}}>
              {blog.image && <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1.5rem' }} />}
              <h3 className={styles.cardTitle}>{blog.title}</h3>
              <p className={styles.cardDesc} style={{marginBottom: '1.5rem', flex: 1}}>{blog.content.substring(0, 150)}...</p>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                {new Date(blog.createdAt).toLocaleDateString('tr-TR')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
