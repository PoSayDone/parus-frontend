"use client";

import { useParams } from "next/navigation";
import ProductForm from "@/modules/admin/templates/product-form";

export default function EditProductPage() {
	const params = useParams();
	const handle = params.id as string;

	return <ProductForm productHandle={handle} />;
}
