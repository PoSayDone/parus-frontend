"use client";

import { updateLineItem } from "@lib/data/cart";
import { HttpTypes } from "@medusajs/types";
import CartItemSelect from "@modules/cart/components/cart-item-select";
import ErrorMessage from "@modules/checkout/components/error-message";
import DeleteButton from "@modules/common/components/delete-button";
import LineItemOptions from "@modules/common/components/line-item-options";
import LineItemPrice from "@modules/common/components/line-item-price";
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price";
import Link from "next/link";
import Thumbnail from "@modules/products/components/thumbnail";
import { useState } from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type ItemProps = {
	item: HttpTypes.StoreCartLineItem;
	type?: "full" | "preview";
	currencyCode: string;
};

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
	const [updating, setUpdating] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const changeQuantity = async (quantity: number) => {
		setError(null);
		setUpdating(true);

		await updateLineItem({
			lineId: item.id,
			quantity,
		})
			.catch((err) => {
				setError(err.message);
			})
			.finally(() => {
				setUpdating(false);
			});
	};

	// TODO: Update this to grab the actual max inventory
	const maxQtyFromInventory = 10;
	const maxQuantity = item.variant?.manage_inventory
		? 10
		: maxQtyFromInventory;

	return (
		<TableRow className="w-full" data-testid="product-row">
			<TableCell className="!pl-0 p-4 w-24">
				<Link
					href={`/products/${item.product_handle}`}
					className={cn(
						"flex",
						"w-24",
						//  {
						// 	"w-16": type === "preview",
						// 	"small:w-24 w-12": type === "full",
						// }
					)}
				>
					<Thumbnail
						thumbnail={item.thumbnail}
						images={item.variant?.product?.images}
						size="square"
					/>
				</Link>
			</TableCell>

			<TableCell className="text-left">
				<p
					className="txt-medium-plus text-ui-fg-base"
					data-testid="product-title"
				>
					{item.product_title}
				</p>
				<LineItemOptions
					variant={item.variant}
					data-testid="product-variant"
				/>
			</TableCell>

			{type === "full" && (
				<TableCell>
					<div className="flex gap-2 items-center w-32">
						<Select
							value={item.quantity.toString()}
							onValueChange={(value) =>
								changeQuantity(parseInt(value))
							}
							data-testid="product-select-button"
						>
							<SelectTrigger className="w-[180px]">
								{updating ? (
									<Loader className="animate-spin size-4 shrink-0" />
								) : (
									<SelectValue placeholder="Кол-во товаров" />
								)}
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{/* TODO: Update this with the v2 way of managing inventory */}
									{Array.from(
										{
											length: Math.min(maxQuantity, 10),
										},
										(_, i) => (
											<SelectItem
												value={(i + 1).toString()}
												key={i}
											>
												{i + 1}
											</SelectItem>
										),
									)}
								</SelectGroup>
							</SelectContent>
						</Select>
						<DeleteButton
							size={"icon"}
							id={item.id}
							data-testid="product-delete-button"
						/>
					</div>
					<ErrorMessage
						error={error}
						data-testid="product-error-message"
					/>
				</TableCell>
			)}

			{type === "full" && (
				<TableCell className="hidden small:table-cell">
					<LineItemUnitPrice
						item={item}
						style="tight"
						currencyCode={currencyCode}
					/>
				</TableCell>
			)}

			<TableCell className="!pr-0">
				<span
					className={cn("!pr-0", {
						"flex flex-col items-end h-full justify-center":
							type === "preview",
					})}
				>
					{type === "preview" && (
						<span className="flex gap-x-1 ">
							<p className="text-ui-fg-muted">
								{item.quantity}x{" "}
							</p>
							<LineItemUnitPrice
								item={item}
								style="tight"
								currencyCode={currencyCode}
							/>
						</span>
					)}
					<LineItemPrice
						item={item}
						style="tight"
						currencyCode={currencyCode}
					/>
				</span>
			</TableCell>
		</TableRow>
	);
};

export default Item;
