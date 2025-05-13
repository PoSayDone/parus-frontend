import repeat from "@lib/util/repeat";
import { HttpTypes } from "@medusajs/types";

import Item from "@modules/cart/components/item";
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item";
import {
	Table,
	TableRow,
	TableBody,
	TableHead,
	TableHeader,
} from "@/components/ui/table";

type ItemsTemplateProps = {
	cart?: HttpTypes.StoreCart;
};

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
	const items = cart?.items;
	return (
		<div>
			<div className="pb-3 flex items-center">
				<h1 className="text-3xl text-medium">Корзина</h1>
			</div>
			<Table>
				<TableHeader className="border-t-0">
					<TableRow className="text-ui-fg-subtle txt-medium-plus">
						<TableHead className="!pl-0">Товар</TableHead>
						<TableHead></TableHead>
						<TableHead>Количество</TableHead>
						<TableHead className="hidden small:table-cell">
							Цена
						</TableHead>
						<TableHead className="!pr-0 text-right">
							Итого
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{items
						? items
								.sort((a, b) => {
									return (a.created_at ?? "") >
										(b.created_at ?? "")
										? -1
										: 1;
								})
								.map((item) => {
									return (
										<Item
											key={item.id}
											item={item}
											currencyCode={cart?.currency_code}
										/>
									);
								})
						: repeat(5).map((i) => {
								return <SkeletonLineItem key={i} />;
							})}
				</TableBody>
			</Table>
		</div>
	);
};

export default ItemsTemplate;
