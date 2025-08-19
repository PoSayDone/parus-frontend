"use client";

import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";

const EDITOR_TOOLS = {
	header: {
		class: Header,
		shortcut: "CMD+H",
		inlineToolbar: true,
		config: {
			placeholder: "Enter a Header",
			levels: [2, 3, 4],
			defaultLevel: 2,
		},
	},
	paragraph: {
		class: Paragraph,
		inlineToolbar: true,
	},
};
function Editor({ data, onChange, holder }) {
	const ref = useRef();
	useEffect(() => {
		//initialize editor if we don't have a reference
		if (!ref.current) {
			const editor = new EditorJS({
				holder: holder,
				placeholder: "Start writting here..",
				tools: EDITOR_TOOLS,
				data,
				async onChange(api, event) {
					const content = await api.saver.save();
					// console.log(content, "sdfb");
					onChange(content);
				},
			});
			ref.current = editor;
		}

		//add a return function handle cleanup
		return () => {
			if (ref.current && ref.current.destroy) {
				ref.current.destroy();
			}
		};
	}, []);

	return (
		<>
			<div
				id={holder}
				style={{
					width: "100%",
					minHeight: 500,
					borderRadius: " 7px",
					background: "fff",
				}}
			/>
		</>
	);
}

export default Editor;
