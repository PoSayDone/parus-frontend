export type ProductFilters = {
	colors: string[];
	flowers: string[];
	military: string[];
};

export type ProductFilterOptions = {
	colors: string[];
	flowers: string[];
	military: string[];
};

type FilterProduct = {
	characteristics?: { key: string; value: string }[];
	categories?: { handle: string }[];
};

export function normalizeValue(value: string): string {
	return value
		.trim()
		.replace(/\s+/g, " ")
		.toLocaleLowerCase("ru-RU")
		.replace(/ё/g, "е");
}

export function splitValues(value: string): string[] {
	return [...new Set(
		value.split(",").map(normalizeValue).filter(Boolean)
	)];
}

export function readFilterParam(
	value?: string | string[]
): string[] {
	const values = Array.isArray(value) ? value : value ? [value] : [];

	return [...new Set(values.flatMap(splitValues))];
}

export function getProductFilterValues(product: FilterProduct) {
	const characteristics = product.characteristics ?? [];

	const read = (key: string) =>
		[...new Set(
			characteristics
				.filter((item) => normalizeValue(item.key) === key)
				.flatMap((item) => splitValues(item.value))
		)];

	const colors = read("цвет");
	const flowers = read("цветы");

	const hasDefaultGreen = product.categories?.some(
		(category) => ["korziny", "venki"].includes(category.handle)
	);

	if (hasDefaultGreen && !colors.includes("зеленый")) {
		colors.push("зеленый");
	}

	const military = read("воинский").includes("да") ? "да" : "нет";

	return { colors, flowers, military };
}

export function matchesProductFilters(
	product: FilterProduct,
	filters: ProductFilters
): boolean {
	const values = getProductFilterValues(product);

	return (
		(!filters.colors.length ||
			filters.colors.every((value) => values.colors.includes(value))) &&
		(!filters.flowers.length ||
			filters.flowers.every((value) => values.flowers.includes(value))) &&
		(!filters.military.length ||
			filters.military.includes(values.military))
	);
}

export function collectFilterOptions(
	products: FilterProduct[]
): ProductFilterOptions {
	const colors = new Set<string>();
	const flowers = new Set<string>();
	const military = new Set<string>();

	for (const product of products) {
		const values = getProductFilterValues(product);

		values.colors.forEach((value) => colors.add(value));
		values.flowers.forEach((value) => flowers.add(value));
		military.add(values.military);
	}

	return {
		colors: [...colors].sort((a, b) => a.localeCompare(b, "ru")),
		flowers: [...flowers].sort((a, b) => a.localeCompare(b, "ru")),
		military: ["да", "нет"].filter((value) => military.has(value)),
	};
}

export function filterValueLabel(value: string): string {
	if (value === "зеленый") return "Зелёный";

	return value.charAt(0).toLocaleUpperCase("ru-RU") + value.slice(1);
}

export function filterValueSlug(value: string): string {
	const letters: Record<string, string> = {
		а: "a", б: "b", в: "v", г: "g", д: "d",
		е: "e", ё: "e", ж: "zh", з: "z", и: "i",
		й: "y", к: "k", л: "l", м: "m", н: "n",
		о: "o", п: "p", р: "r", с: "s", т: "t",
		у: "u", ф: "f", х: "kh", ц: "ts", ч: "ch",
		ш: "sh", щ: "shch", ъ: "", ы: "y", ь: "",
		э: "e", ю: "yu", я: "ya",
	};

	return value
		.trim()
		.toLowerCase()
		.split("")
		.map((letter) => letters[letter] ?? letter)
		.join("")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}