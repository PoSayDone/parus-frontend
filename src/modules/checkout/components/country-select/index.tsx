import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";

import NativeSelect, {
	NativeSelectProps,
} from "@modules/common/components/native-select";
import { HttpTypes } from "@medusajs/types";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const CountrySelect = forwardRef<
	HTMLSelectElement,
	NativeSelectProps & {
		region?: HttpTypes.StoreRegion;
	}
>(({ placeholder = "Country", region, defaultValue, ...props }, ref) => {
	const innerRef = useRef<HTMLSelectElement>(null);

	useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
		ref,
		() => innerRef.current,
	);

	const countryOptions = useMemo(() => {
		if (!region) {
			return [];
		}

		return region.countries?.map((country) => ({
			value: country.iso_2,
			label: country.display_name,
		}));
	}, [region]);

	return (
		<Select
			ref={innerRef}
			placeholder={placeholder}
			defaultValue={defaultValue}
			{...props}
		>
			<SelectTrigger className="bg-card text-input-foreground !h-[54px] w-full rounded-full px-5">
				<SelectValue placeholder="Страна" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{countryOptions?.map(({ value, label }, index) => (
						<SelectItem key={index} value={value}>
							{label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
});

CountrySelect.displayName = "CountrySelect";

export default CountrySelect;
