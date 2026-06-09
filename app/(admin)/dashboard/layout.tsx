import LayoutClient from './LayoutClient';
import { getActivePermissions } from './auth-actions';

export const metadata = {
  title: 'Dashboard | FT Dijital Prime',
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const permissions = await getActivePermissions();

  return (
    <LayoutClient permissions={permissions}>
      {children}
    </LayoutClient>
  );
}
