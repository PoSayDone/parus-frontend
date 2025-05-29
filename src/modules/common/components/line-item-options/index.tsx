import { HttpTypes } from "@medusajs/types";

type LineItemOptionsProps = {
	variant: HttpTypes.StoreProductVariant | undefined;
	"data-testid"?: string;
	"data-value"?: HttpTypes.StoreProductVariant;
};

const LineItemOptions = ({
	variant,
	"data-testid": dataTestid,
	"data-value": dataValue,
}: LineItemOptionsProps) => {
	return (
		<div
			data-testid={dataTestid}
			data-value={dataValue}
			className="inline-block txt-medium text-ui-fg-subtle w-full overflow-hidden text-ellipsis"
		>
			Вариант: {variant?.title}
		</div>
	);
};

export default LineItemOptions;
