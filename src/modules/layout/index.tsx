import { getSiteSettings } from "@/lib/data/site-settings";
import Footer from "@modules/layout/templates/footer";
import Header from "@modules/layout/templates/header";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const settings = await getSiteSettings();
  const showCatalog = settings?.showCatalog ?? true;

  return (
    <div>
      <Header
        showCatalog={showCatalog}
        phone={settings?.phone ?? "+79999999999"}
      />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
