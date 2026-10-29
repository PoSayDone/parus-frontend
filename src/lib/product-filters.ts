export type ProductFilters = {
	colors: string[];
	flowers: string[];
	military: string[];
	woods?: string[];
	traditions?: string[];
	icons?: string[];
	carved?: string[];
	heightMin?: number;
	heightMax?: number;
	widthMin?: number;
	widthMax?: number;
};

export type ProductFilterOptions = {
	colors: string[];
	flowers: string[];
	military: string[];
	height?: { min: number; max: number };
	width?: { min: number; max: number };
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

export function readDimensionParam(
	value?: string | string[],
): number | undefined {
	const raw = Array.isArray(value) ? value[0] : value;

	if (!raw?.trim()) return undefined;

	const normalized = raw
		.trim()
		.replace(/\s+/g, "")
		.replace(/мм$/iu, "")
		.replace(",", ".");

	if (!/^\d+(?:\.\d+)?$/.test(normalized)) {
		return undefined;
	}

	const number = Number(normalized);

	return Number.isFinite(number) ? number : undefined;
}

function matchesRange(
	value: number | undefined,
	min?: number,
	max?: number,
): boolean {
	if (min === undefined && max === undefined) return true;
	if (value === undefined) return false;

	return (
		(min === undefined || value >= min) &&
		(max === undefined || value <= max)
	);
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
	
	const woods = read("древесина");
	const traditions = read("религиозная традиция");
	const icons = read("иконка").includes("да") ? "да" : "нет";
	const carved = read("резной").includes("да") ? "да" : "нет";

	// Определяем, есть ли у товара характеристики этой группы.
	const hasCrossCharacteristics = characteristics.some((item) =>
		["древесина", "религиозная традиция", "иконка", "резной"].includes(
			normalizeValue(item.key),
		),
	);

	const readDimension = (key: string) => {
	const characteristic = characteristics.find(
		(item) => normalizeValue(item.key) === key,
	);

	return readDimensionParam(characteristic?.value);
};

return {
	colors,
	flowers,
	military,
	woods,
	traditions,
	icons,
	carved,
	hasCrossCharacteristics,
	height: readDimension("высота (мм)"),
	width: readDimension("ширина (мм)"),
};
}

export function matchesProductFilters(
	product: FilterProduct,
	filters: ProductFilters,
): boolean {
	const values = getProductFilterValues(product);

	return (
		(!filters.colors.length ||
			filters.colors.every((value) =>
				values.colors.includes(value),
			)) &&
		(!filters.flowers.length ||
			filters.flowers.every((value) =>
				values.flowers.includes(value),
			)) &&
		(!filters.military.length ||
			filters.military.includes(values.military)) &&
		(!filters.woods?.length ||
			filters.woods.some((value) =>
				values.woods.includes(value),
			)) &&
		(!filters.traditions?.length ||
			filters.traditions.some((value) =>
				values.traditions.includes(value),
			)) &&
		(!filters.icons?.length ||
			filters.icons.includes(values.icons)) &&
		(!filters.carved?.length ||
			filters.carved.includes(values.carved)) &&
		matchesRange(
			values.height,
			filters.heightMin,
			filters.heightMax,
		) &&
		matchesRange(
			values.width,
			filters.widthMin,
			filters.widthMax,
		)
	);
}

export function collectFilterOptions(
	products: FilterProduct[],
): ProductFilterOptions {
	const colors = new Set<string>();
	const flowers = new Set<string>();
	const military = new Set<string>();
	const woods = new Set<string>();
	const traditions = new Set<string>();

	let hasCrossCharacteristics = false;
	let height: ProductFilterOptions["height"];
	let width: ProductFilterOptions["width"];

	for (const product of products) {
		const values = getProductFilterValues(product);

		values.colors.forEach((value) => colors.add(value));
		values.flowers.forEach((value) => flowers.add(value));
		military.add(values.military);

		values.woods.forEach((value) => woods.add(value));
		values.traditions.forEach((value) => traditions.add(value));

		if (values.hasCrossCharacteristics) {
			hasCrossCharacteristics = true;
		}

		if (values.height !== undefined) {
			height = {
				min: Math.min(
					height?.min ?? values.height,
					values.height,
				),
				max: Math.max(
					height?.max ?? values.height,
					values.height,
				),
			};
		}

		if (values.width !== undefined) {
			width = {
				min: Math.min(
					width?.min ?? values.width,
					values.width,
				),
				max: Math.max(
					width?.max ?? values.width,
					values.width,
				),
			};
		}
	}

	const sortValues = (values: Set<string>) =>
		[...values].sort((a, b) => a.localeCompare(b, "ru"));

	return {
		colors: sortValues(colors),
		flowers: sortValues(flowers),
		military: ["да", "нет"].filter((value) =>
			military.has(value),
		),
		woods: sortValues(woods),
		traditions: sortValues(traditions),
		icons: hasCrossCharacteristics ? ["да", "нет"] : [],
		carved: hasCrossCharacteristics ? ["да", "нет"] : [],
		...(height ? { height } : {}),
		...(width ? { width } : {}),
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