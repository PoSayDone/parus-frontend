"use client";

import type React from "react";
import { memo, useEffect, useRef } from "react";
import EditorJS, { type EditorConfig } from "@editorjs/editorjs";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import { uploadFile } from "@/lib/data/uploads";
import { editorTranslations } from "@/modules/admin/components/editor/translations";
import { cn } from "@/lib/utils";

interface EditorJSInstance {
	destroy: () => void;
	render?: (data: any) => Promise<void>;
	saver: {
		save: () => Promise<any>;
	};
}

const EDITOR_TOOLS = {
	header: {
		class: Header,
		shortcut: "CMD+H",
		inlineToolbar: true,
		config: {
			placeholder: "Введите заголовок",
			levels: [2, 3, 4],
			defaultLevel: 2,
		},
	},
	paragraph: {
		class: Paragraph,
		inlineToolbar: true,
	},
	image: {
		class: ImageTool,
		config: {
			uploader: {
				/**
				 * Upload file to the server and return an uploaded image data
				 * @param file - file selected from the device or pasted by drag-n-drop
				 * @return Promise with an uploaded file data
				 */
				async uploadByFile(file: File) {
					try {
						const url = await uploadFile(file);

						return {
							success: 1,
							file: {
								url: url,
							},
						};
					} catch (error) {
						console.error("Error uploading image:", error);
						return {
							success: 0,
							file: {
								url: "",
							},
						};
					}
				},
			},
		},
	},
} as unknown as EditorConfig["tools"];

type EditorProps = {
	data?: any;
	onChange: (content: any) => void;
	holder: string;
} & React.ComponentProps<"div">;

function Editor({
	data,
	onChange,
	holder = "editorjs",
	...props
}: EditorProps) {
	const ref = useRef<EditorJSInstance | null>(null);
	const onChangeRef = useRef(onChange);
	const hasHydratedData = useRef(!!data);
	const isEditorChangeRef = useRef(false);

	useEffect(() => {
		onChangeRef.current = onChange;
	}, [onChange]);

	useEffect(() => {
		if (!ref.current) {
			const editorConfig: EditorConfig = {
				holder,
				placeholder: "Начните писать здесь...",
				tools: EDITOR_TOOLS,
				i18n: editorTranslations as EditorConfig["i18n"],
				data: data ?? undefined,
				async onChange(api: any, _event: any) {
					const content = await api.saver.save();
					isEditorChangeRef.current = true;
					onChangeRef.current(content);
				},
			};

			const editor = new EditorJS(editorConfig);
			ref.current = editor;
			hasHydratedData.current = !!data;
		}

		return () => {
			if (ref.current?.destroy) {
				ref.current.destroy();
				ref.current = null;
				hasHydratedData.current = false;
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [holder]);

	useEffect(() => {
		if (!ref.current || !data || hasHydratedData.current) {
			return;
		}

		if (isEditorChangeRef.current) {
			isEditorChangeRef.current = false;
			return;
		}

		ref.current.render?.(data);
		hasHydratedData.current = true;
	}, [data]);

	return (
		<div
			id={holder}
			{...props}
			className={cn("editorjs-theme", props.className)}
		/>
	);
}

export default memo(Editor);
