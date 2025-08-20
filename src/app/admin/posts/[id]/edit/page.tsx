"use client";

import { useParams } from "next/navigation";
import PostForm from "@/modules/admin/templates/post-form";

export default function EditBlogPostPage() {
	const params = useParams();
	const handle = params.id as string;

	return <PostForm postHandle={handle} />;
}
