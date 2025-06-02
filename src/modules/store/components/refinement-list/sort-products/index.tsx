"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export type SortOptions = "price_asc" | "price_desc" | "created_at";

type SortProductsProps = {
	sortBy: SortOptions;
	setQueryParams: (name: string, value: SortOptions) => void;
	"data-testid"?: string;
};

const sortOptions = [
	{
		value: "created_at",
		label: "Новое",
	},
	{
		value: "price_asc",
		label: "Сначала недорогие",
	},
	{
		value: "price_desc",
		label: "Сначала дорогие",
	},
];

const SortProducts = ({
	"data-testid": dataTestId,
	sortBy,
	setQueryParams,
}: SortProductsProps) => {
	const handleChange = (value: SortOptions) => {
		setQueryParams("sortBy", value);
	};

	return (
		<Select onValueChange={handleChange} value={sortBy}>
			<SelectTrigger className="w-[130px] md:w-[200px]">
				<SelectValue placeholder="Сортировка" />
			</SelectTrigger>
			<SelectContent>
				{sortOptions.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default SortProducts;
