import Link from "next/link";

const EmptyCartMessage = () => {
	return (
		<div
			className="py-48 px-2 flex flex-col justify-center items-start"
			data-testid="empty-cart-message"
		>
			<h1 className="text-3xl">Cart</h1>
			<div className="text-lg mt-4 mb-6 max-w-[32rem]">
				You don&apos;t have anything in your cart. Let&apos;s change
				that, use the link below to start browsing our products.
			</div>
			<div>
				<Link href="/store">Explore products</Link>
			</div>
		</div>
	);
};

export default EmptyCartMessage;
