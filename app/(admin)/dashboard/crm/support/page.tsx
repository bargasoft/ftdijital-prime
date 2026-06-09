import { getTickets } from './actions';
import SupportDataTable from './SupportDataTable';
import { getActivePermissions } from '../../auth-actions';

export const metadata = {
  title: 'Destek Talepleri | CRM | FT Dijital Prime',
};

export default async function SupportPage() {
  const tickets = await getTickets();
  const permissions = await getActivePermissions();
  
  const canDelete = permissions.includes('ALL') || permissions.includes('DELETE_TICKETS');
  const canClose = permissions.includes('ALL') || permissions.includes('CLOSE_TICKETS');

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: '2rem'}}>
        <div>
          <h2 style={{fontSize:'1.8rem', fontWeight: 800, color: '#0f172a', margin:0, letterSpacing: '-0.02em'}}>Destek Talepleri (Helpdesk)</h2>
          <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Müşterilerinizden gelen ERP ve diğer yazılım destek taleplerini (Biletleri) buradan yönetebilirsiniz.</p>
        </div>
      </div>

      <SupportDataTable tickets={tickets} canDelete={canDelete} canClose={canClose} />
    </div>
  );
}
