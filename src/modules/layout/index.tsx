import Footer from "@modules/layout/templates/footer";
import Header from "@modules/layout/templates/header";
import { getSiteSettings } from "@/lib/data/site-settings";

const Layout = async ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const settings = await getSiteSettings();
	const showCatalog = settings?.showCatalog ?? true;

	return (
		<div>
			<Header showCatalog={showCatalog} />
			{children}
			<Footer />
		</div>
	);
};

export default Layout;
