"use client";

import sluga from "sluga";
import type { UseFormReturn } from "react-hook-form";

interface SlugHandlerProps {
	form: UseFormReturn<any>;
	fieldName: string; // The field to watch (e.g., "name", "title")
	slugFieldName: string; // The slug field (e.g., "handle")
}

export const SlugHandler = ({
	form,
	fieldName,
	slugFieldName,
}: SlugHandlerProps) => {
	const handleFieldChange = (value: string) => {
		const formValues = form.getValues();

		const currentSlug = formValues["handle"];
		const previousFieldValue = formValues[fieldName];
		const expectedSlug = sluga(previousFieldValue);

		console.log(currentSlug, previousFieldValue);

		if (currentSlug === expectedSlug) {
			const newSlug = sluga(value);
			form.setValue(slugFieldName, newSlug, { shouldValidate: true });
		}
	};

	return { handleFieldChange };
};
