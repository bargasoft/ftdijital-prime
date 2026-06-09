import { getSolutions, getCategories } from './actions';
import SolutionsDataTable from './SolutionsDataTable';

export const metadata = {
  title: 'Çözümler Yönetimi | FT Dijital Prime',
};

export default async function SolutionsPage() {
  const solutions = await getSolutions();
  const categories = await getCategories();

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: '2rem'}}>
        <div>
          <h2 style={{fontSize:'1.8rem', fontWeight: 800, color: '#0f172a', margin:0, letterSpacing: '-0.02em'}}>Çözümler Yönetimi</h2>
          <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Sitenizde yayınlanacak çözümlerinizi filtreleyin, sıralayın ve yönetin.</p>
        </div>
      </div>

      <SolutionsDataTable initialData={solutions} categories={categories} />
    </div>
  );
}
