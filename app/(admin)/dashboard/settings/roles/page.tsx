import { getRoles, seedRoles } from './actions';
import RolesClient from './RolesClient';

export const metadata = {
  title: 'Rol ve Yetki Yönetimi | FT Dijital Prime',
};

export default async function RolesPage() {
  await seedRoles();
  const roles = await getRoles();

  return <RolesClient roles={roles} />;
}
