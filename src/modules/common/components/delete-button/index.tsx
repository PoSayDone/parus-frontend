import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { deleteLineItem } from "@lib/data/cart";
import { Loader, Trash } from "lucide-react";
import { type ComponentProps, useState } from "react";

const DeleteButton = ({
	id,
	className,
	children,
	...rest
}: {
	id: string;
} & ComponentProps<typeof Button>) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = async (id: string) => {
		setIsDeleting(true);
		await deleteLineItem(id).catch((_err) => {
			setIsDeleting(false);
		});
	};

	return (
		<Button
			variant={"ghost"}
			className={cn(className)}
			onClick={() => handleDelete(id)}
			{...rest}
		>
			{isDeleting ? <Loader className="animate-spin" /> : <Trash />}
			{!!children && <span>{children}</span>}
		</Button>
	);
};

export default DeleteButton;
