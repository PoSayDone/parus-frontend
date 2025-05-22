// import { EllipseMiniSolid } from "@medusajs/icons";
// import { Label, RadioGroup, Text, clx } from "@medusajs/ui";
import { ChipRadioGroup } from "../chip-radio-group";

type FilterRadioGroupProps = {
	title: string;
	items: {
		value: string;
		label: string;
	}[];
	value: any;
	handleChange: (...args: any[]) => void;
	"data-testid"?: string;
};

const FilterRadioGroup = ({
	title,
	items,
	value,
	handleChange,
	"data-testid": dataTestId,
}: FilterRadioGroupProps) => {
	return (
		<ChipRadioGroup
			chipSize="sm"
			defaultValue={value}
			data-testid={dataTestId}
			onChange={handleChange}
			options={items}
			name={""}
		/>
	);
};

export default FilterRadioGroup;
