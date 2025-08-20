"use client";

import { useParams } from "next/navigation";
import CategoryForm from "@/modules/admin/templates/category-form";

export default function EditCategoryPage() {
	const params = useParams();
	const handle = params.id as string;

	return <CategoryForm categoryHandle={handle} />;
}
