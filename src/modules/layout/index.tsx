import type React from "react";

import Footer from "@modules/layout/templates/footer";
import Header from "@modules/layout/templates/header";

const Layout: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	return (
		<div>
			<Header />
			{children}
			<Footer />
		</div>
	);
};

export default Layout;
