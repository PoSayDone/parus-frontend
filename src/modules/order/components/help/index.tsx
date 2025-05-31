import { Heading } from "@medusajs/ui";
import Link from "next/link";
import React from "react";

const Help = () => {
	return (
		<div className="mt-6">
			<Heading className="text-base-semi">Нужна помощь?</Heading>
			<div className="text-base-regular my-2">
				<ul className="gap-y-2 flex flex-col">
					<li>
						<Link href="/contact">Контакты</Link>
					</li>
					<li>
						<Link href="/contact">Возвраты и обмены</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Help;
