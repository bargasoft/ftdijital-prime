import { getUsers } from './actions';
import { getRoles } from '../roles/actions';
import UsersClient from './UsersClient';

export const metadata = {
  title: 'Kullanıcı Yönetimi | FT Dijital Prime',
};

export default async function UsersPage() {
  const users = await getUsers();
  const roles = await getRoles();

  return <UsersClient users={users} availableRoles={roles} />;
}
