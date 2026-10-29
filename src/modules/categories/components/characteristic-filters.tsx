"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
	filterValueLabel,
	filterValueSlug,
	type ProductFilters,
	type ProductFilterOptions,
} from "@/lib/product-filters";

type Props = {
	categoryHandle: string;
	sortBy: string;
	filters: ProductFilters;
	options: ProductFilterOptions;
};

export default function CharacteristicFilters({
	categoryHandle,
	sortBy,
	filters,
	options,
}: Props) {
	const [selected, setSelected] = useState<ProductFilters>(filters);
	
	

	const groups = [
		{
			title: "Цвет",
			name: "color",
			key: "colors" as const,
			placeholder: "Все цвета",
			values: options.colors,
		},
		{
			title: "Цветы",
			name: "flower",
			key: "flowers" as const,
			placeholder: "Все цветы",
			values: options.flowers,
		},
		{
			title: "Воинский",
			name: "military",
			key: "military" as const,
			placeholder: "Все товары",
			values: options.military.includes("да")
				? options.military
				: [],
		},
		{
			title: "Древесина",
			name: "wood",
			key: "woods" as const,
			placeholder: "Все породы",
			values: options.woods ?? [],
		},
		{
			title: "Религиозная традиция",
			name: "tradition",
			key: "traditions" as const,
			placeholder: "Все традиции",
			values: options.traditions ?? [],
		},
		{
			title: "Иконка",
			name: "icon",
			key: "icons" as const,
			placeholder: "Все товары",
			values: options.icons ?? [],
		},
		{
			title: "Резной",
			name: "carved",
			key: "carved" as const,
			placeholder: "Все товары",
			values: options.carved ?? [],
		},
	];

	function toggleValue(
	key:
		| "colors"
		| "flowers"
		| "military"
		| "woods"
		| "traditions"
		| "icons"
		| "carved",
	value: string,
) {
	setSelected((current) => {
		const values = current[key] ?? [];

		return {
			...current,
			[key]: values.includes(value)
				? values.filter((item) => item !== value)
				: [...values, value],
		};
	});
}

	const dimensionGroups = [
	{
		key: "height",
		title: "Высота, мм",
		minName: "heightMin",
		maxName: "heightMax",
		bounds: options.height,
		minValue: filters.heightMin,
		maxValue: filters.heightMax,
	},
	{
		key: "width",
		title: "Ширина, мм",
		minName: "widthMin",
		maxName: "widthMax",
		bounds: options.width,
		minValue: filters.widthMin,
		maxValue: filters.widthMax,
	},
];

	const categoryUrl = `/categories/${categoryHandle}`;
	const resetUrl =
		`${categoryUrl}?sortBy=${encodeURIComponent(sortBy)}`;

	return (
	<form
		action={categoryUrl}
		method="get"
		className="mb-8 flex flex-wrap items-end gap-3"
	>
		<div className="w-full sm:w-[180px]">
			<label
				htmlFor="category-sort"
				className="mb-1.5 block text-sm font-medium"
			>
				Сортировка
			</label>

			<div className="relative">
				<select
					id="category-sort"
					name="sortBy"
					defaultValue={sortBy}
					className="h-10 w-full appearance-none rounded-full border border-input bg-card pl-4 pr-9 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
				>
					<option value="created_at">Сначала новые</option>
					<option value="price_asc">Сначала дешевле</option>
					<option value="price_desc">Сначала дороже</option>
				</select>

				<ChevronDown
					aria-hidden="true"
					className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2"
				/>
			</div>
		</div>

		{groups.map((group) => {
			if (!group.values.length) return null;

			const selectedValues = selected[group.key] ?? [];
			const label = selectedValues.length
				? selectedValues.map(filterValueLabel).join(", ")
				: group.placeholder;

			return (
				<fieldset
					key={group.name}
					className={`w-full min-w-0 ${
	group.key === "traditions"
		? "sm:w-[220px]"
		: "sm:w-[180px]"
}`}
				>
					<legend className="mb-1.5 text-sm font-medium">
						{group.title}
					</legend>

					<details className="group relative open:z-30">
						<summary className="flex h-10 cursor-pointer list-none items-center justify-between gap-2 rounded-full border border-input bg-card px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden">
							<span className="truncate" title={label}>
								{label}
							</span>

							<ChevronDown
								aria-hidden="true"
								className="size-4 shrink-0 transition-transform group-open:rotate-180"
							/>
						</summary>

						<div className="absolute left-0 top-full z-30 mt-2 max-h-64 w-full min-w-[180px] overflow-y-auto rounded-2xl border bg-popover p-1.5">
							{group.values.map((value) => (
								<label
									key={value}
									className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 hover:bg-muted"
								>
									<input
										type="checkbox"
										name={group.name}
										value={filterValueSlug(value)}
										checked={selectedValues.includes(value)}
										onChange={() => toggleValue(group.key, value)}
										className="size-4 shrink-0 accent-primary"
									/>

									<span className="text-sm">
										{filterValueLabel(value)}
									</span>
								</label>
							))}
						</div>
					</details>
				</fieldset>
			);
		})}
		
		{dimensionGroups.map((group) => {
	if (!group.bounds) return null;

	return (
		<fieldset
			key={group.key}
			className="w-full min-w-0 sm:w-[200px]"
		>
			<legend className="mb-1.5 text-sm font-medium">
				{group.title}
			</legend>

			<div className="flex h-10 items-center gap-2 rounded-full border border-input bg-card px-3">
				<input
					type="number"
					name={group.minName}
					aria-label={`${group.title}: от`}
					min={0}
					step="any"
					defaultValue={group.minValue ?? ""}
					placeholder={`От ${group.bounds.min}`}
					className="h-full w-0 min-w-0 flex-1 bg-transparent text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
				/>

				<span aria-hidden="true" className="text-muted-foreground">
					—
				</span>

				<input
					type="number"
					name={group.maxName}
					aria-label={`${group.title}: до`}
					min={0}
					step="any"
					defaultValue={group.maxValue ?? ""}
					placeholder={`До ${group.bounds.max}`}
					className="h-full w-0 min-w-0 flex-1 bg-transparent text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
				/>
			</div>
		</fieldset>
	);
})}
		<button
			type="submit"
			className={buttonVariants({ size: "sm", className: "h-10" })}
		>
			Применить
		</button>

		<Link
			href={resetUrl}
			className="inline-flex h-10 items-center px-1 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
		>
			Сбросить
		</Link>
	</form>
);
}