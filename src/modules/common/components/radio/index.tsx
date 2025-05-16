const Radio = ({
	checked,
	"data-testid": dataTestId,
}: {
	checked: boolean;
	"data-testid"?: string;
}) => {
	return (
		<>
			<div
				role="radio"
				aria-checked="true"
				data-state={checked ? "checked" : "unchecked"}
				className="group relative flex size-6 items-center justify-center outline-none"
				data-testid={dataTestId || "radio-button"}
			>
				<div className="border shadow-borders-base group-hover:shadow-borders-strong-with-shadow bg-surface group-data-[state=checked]:bg-primary group-data-[state=checked]:shadow-borders-interactive group-focus:!shadow-borders-interactive-with-focus group-disabled:!bg-ui-bg-disabled group-disabled:!shadow-borders-base flex size-6 items-center justify-center rounded-full transition-all">
					{checked && (
						<span
							data-state={checked ? "checked" : "unchecked"}
							className="group flex items-center justify-center"
						>
							<div className="bg-card shadow-details-contrast-on-bg-interactive group-disabled:bg-ui-fg-disabled rounded-full group-disabled:shadow-none size-[10px] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 " />
						</span>
					)}
				</div>
			</div>
		</>
	);
};

export default Radio;
