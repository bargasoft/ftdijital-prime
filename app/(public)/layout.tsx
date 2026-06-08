import Header from '@/components/Header';
import Footer from '@/components/Footer';
import prisma from '@/lib/db';

export const revalidate = 60;

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Veritabanından Site Ayarlarını Çekiyoruz
  const settingsArray = await prisma.setting.findMany();
  const settings = settingsArray.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <>
      <Header 
        siteLogo={settings.site_logo}
        primaryColor={settings.primary_color}
        headerLogoAlign={settings.header_logo_align}
        headerMenuStyle={settings.header_menu_style}
        headerBgStyle={settings.header_bg_style}
      />
      
      {children}
      
      <Footer 
        siteLogo={settings.site_logo}
        primaryColor={settings.primary_color}
        phone={settings.contact_phone}
        email={settings.contact_email}
        address={settings.contact_address}
        instagram={settings.social_instagram}
        linkedin={settings.social_linkedin}
        footerTheme={settings.footer_theme}
        footerColumns={settings.footer_columns}
      />
    </>
  );
}
