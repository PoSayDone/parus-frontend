import React from "react";

import Footer from "@modules/layout/templates/footer";
import Header from "@modules/layout/templates/header";

const Layout: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	return (
		<div>
			<Header />
			<main className="flex flex-col relative mx-auto">{children}</main>
			<Footer />
		</div>
	);
};

export default Layout;
