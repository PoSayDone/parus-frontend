import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getCacheTag, getAuthHeaders, removeCartId } from "@lib/data/cookies";
import { sdk } from "@lib/config";
import { placeOrder } from "@lib/data/cart";

type Params = Promise<{ cartId: string }>;

export async function GET(req: NextRequest, { params }: { params: Params }) {
	const { cartId } = await params;
	const { origin } = req.nextUrl;

	const headers = { ...(await getAuthHeaders()) };

	// Retreive fresh cart values
	const cartCacheTag = await getCacheTag("carts");
	revalidateTag(cartCacheTag);
	const { cart } = await sdk.store.cart.retrieve(
		cartId,
		{
			fields: "id, order_link.order_id",
		},
		headers,
	);

	console.log(cart);

	if (!cart) {
		return NextResponse.redirect(`${origin}`);
	}

	const orderId = (cart as unknown as Record<string, any>).order_link
		?.order_id;

	if (!orderId) {
		await placeOrder(cartId);
		// Fail when payment not authorized
		return NextResponse.redirect(
			`${origin}/checkout?step=review&error=payment_failed`,
		);
	}

	const orderCacheTag = await getCacheTag("orders");
	revalidateTag(orderCacheTag);
	removeCartId();
	return NextResponse.redirect(`${origin}/order/${orderId}/confirmed`);
}
