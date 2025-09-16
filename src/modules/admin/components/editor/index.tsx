"use client";

import React, { memo, useEffect, useRef } from "react";
import EditorJS, { I18nDictionary } from "@editorjs/editorjs";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import { uploadFile } from "@/lib/data/uploads";
import { editorTranslations } from "@/modules/admin/components/editor/translations";

interface EditorJSConfig {
	holder: string;
	placeholder: string;
	tools: Record<string, any>;
	data?: any;
	i18n?: I18nDictionary;
	onChange?: (api: any, event: any) => void;
}

interface EditorJSInstance {
	destroy: () => void;
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
};

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

	useEffect(() => {
		if (!ref.current) {
			const editorConfig: EditorJSConfig = {
				holder,
				placeholder: "Начните писать здесь...",
				tools: EDITOR_TOOLS,
				i18n: editorTranslations,
				data: data,
				async onChange(api: any, event: any) {
					const content = await api.saver.save();
					onChange(content);
				},
			};

			const editor = new EditorJS(editorConfig);
			ref.current = editor;
		}

		return () => {
			if (ref.current && ref.current.destroy) {
				ref.current.destroy();
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <div id={holder} {...props} />;
}

export default memo(Editor);
