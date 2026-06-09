import prisma from '@/lib/db';
import HeaderClient from './HeaderClient';

export default async function Header() {
  // Fetch dynamic menu
  const menu = await prisma.menu.findUnique({ 
    where: { name: 'header' }, 
    include: { items: { orderBy: { order: 'asc' } } } 
  });
  const menuItems = menu?.items || [];

  // Fetch settings
  const settingsArray = await prisma.setting.findMany();
  const settings = settingsArray.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <HeaderClient 
      menuItems={menuItems}
      siteLogoLight={settings.site_logo_light_mode}
      siteLogoDark={settings.site_logo_dark_mode}
      siteLogoText={settings.site_logo_text}
      primaryColor={settings.primary_color || '#0ea5e9'}
    />
  );
}
