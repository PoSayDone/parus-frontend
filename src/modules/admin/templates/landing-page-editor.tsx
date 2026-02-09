"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import type { Config, Data } from "@puckeditor/core";
import { Puck } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import { toast } from "sonner";
import { updateLandingPage } from "@/lib/data/landing-page";
import { landingEditorConfig } from "@/modules/landing/puck/editor-config";
import { Button } from "@/components/ui/button";

type LandingPageEditorProps = {
	initialData: Data;
};

export default function LandingPageEditor({
	initialData,
}: LandingPageEditorProps) {
	const [isPending, startTransition] = useTransition();
	const [isDirty, setIsDirty] = useState(false);
	const dataWithIds = useMemo<Data>(() => {
		const usedIds = new Set<string>();
		const content = (initialData.content || []).map((item, index) => {
			const props = item.props ?? {};
			const existingId =
				typeof props.id === "string" && props.id.trim().length > 0
					? props.id
					: typeof (item as { id?: string }).id === "string" &&
							(item as { id?: string }).id?.trim()
						? (item as { id?: string }).id?.trim()
						: `section-${index}`;
			let resolvedId = existingId;
			let suffix = 1;
			while (usedIds.has(resolvedId)) {
				resolvedId = `${existingId}-${suffix}`;
				suffix += 1;
			}
			usedIds.add(resolvedId);

			let nextProps = {
				...props,
				id: resolvedId,
			};
			return {
				...item,
				props: {
					...nextProps,
				},
			};
		});

		return {
			...initialData,
			content,
			root: initialData.root || { props: {} },
		};
	}, [initialData]);
	const dataRef = useRef<Data>(dataWithIds);

	const handleSave = (data: Data) => {
		startTransition(async () => {
			try {
				await updateLandingPage(data);
				toast.success("Главная страница обновлена");
				setIsDirty(false);
			} catch (error) {
				console.error("Failed to save landing page:", error);
				toast.error("Не удалось сохранить главную страницу");
			}
		});
	};

	return (
		<div className="h-screen overflow-hidden">
			<Puck
				config={landingEditorConfig as Config}
				data={dataWithIds}
				onChange={(data) => {
					dataRef.current = data as Data;
					setIsDirty(true);
				}}
				onPublish={(data) => handleSave(data as Data)}
				overrides={{
					headerActions:() => (
										<div className="flex items-center gap-2">
											<Button
												type="button"
												size="sm"
												disabled={isPending || !isDirty}
												onClick={() => handleSave(dataRef.current)}
											>
												{isPending ? "Сохранение..." : "Сохранить"}
											</Button>
										</div>
									)
				}}
			/>
		</div>
	);
}
