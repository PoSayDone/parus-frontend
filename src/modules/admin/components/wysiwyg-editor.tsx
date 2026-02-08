"use client";

import type { HTMLAttributes, MouseEvent, ReactNode } from "react";
import {
	Editor,
	EditorProvider,
	Toolbar,
	type ContentEditableEvent,
	useEditorState,
} from "react-simple-wysiwyg";
import {
	Bold,
	Italic,
	Underline,
	Strikethrough,
	List,
	ListOrdered,
	Link as LinkIcon,
	Undo2,
	Redo2,
	Eraser,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EditorState = ReturnType<typeof useEditorState>;

type WysiwygEditorProps = {
	value: string;
	onChange: (event: ContentEditableEvent) => void;
	placeholder?: string;
	className?: string;
	minHeight?: number;
};

export default function WysiwygEditor({
	value,
	onChange,
	placeholder,
	className,
	minHeight = 160,
}: WysiwygEditorProps) {
	return (
		<EditorProvider>
			<div
				className={cn(
					"rounded-md border border-input bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
					className,
				)}
			>
				<Toolbar className="border-b border-input bg-muted/30 px-2 py-1 flex flex-wrap gap-1">
					<BtnBold />
					<BtnItalic />
					<BtnUnderline />
					<BtnStrikeThrough />
					<BtnRemoveFormat />
					<BtnNumberedList />
					<BtnBulletList />
					<BtnLink />
					<BtnUndo />
					<BtnRedo />
				</Toolbar>
				<Editor
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					containerProps={{
						className: "rsw-editor border-0 rounded-none",
					}}
					className="rsw-ce p-3"
					style={{ minHeight }}
				/>
			</div>
		</EditorProvider>
	);
}

const BtnBold = createButton("Bold", <Bold className="size-4" />, "bold");
const BtnItalic = createButton(
	"Italic",
	<Italic className="size-4" />,
	"italic",
);
const BtnUnderline = createButton(
	"Underline",
	<Underline className="size-4" />,
	"underline",
);
const BtnStrikeThrough = createButton(
	"Strike through",
	<Strikethrough className="size-4" />,
	"strikeThrough",
);
const BtnNumberedList = createButton(
	"Numbered list",
	<ListOrdered className="size-4" />,
	"insertOrderedList",
);
const BtnBulletList = createButton(
	"Bullet list",
	<List className="size-4" />,
	"insertUnorderedList",
);
const BtnUndo = createButton("Undo", <Undo2 className="size-4" />, "undo");
const BtnRedo = createButton("Redo", <Redo2 className="size-4" />, "redo");
const BtnRemoveFormat = createButton(
	"Clear formatting",
	<Eraser className="size-4" />,
	"removeFormat",
);
const BtnLink = createButton("Link", <LinkIcon className="size-4" />, ({ $selection }) => {
	if ($selection?.nodeName === "A") {
		document.execCommand("unlink");
	} else {
		// eslint-disable-next-line no-alert
		document.execCommand(
			"createLink",
			false,
			window.prompt("URL", "") || undefined,
		);
	}
});

function createButton(
	title: string,
	content: ReactNode,
	command: ((state: EditorState) => void) | string,
) {
	ButtonFactory.displayName = title.replace(/\s/g, "");

	return ButtonFactory;

	function ButtonFactory(props: HTMLAttributes<HTMLButtonElement>) {
		const editorState = useEditorState();
		const { $el } = editorState;
		const isElFocused = () => Boolean($el?.contains(document.activeElement));

		let active = false;
		if (typeof command === "string") {
			active = isElFocused() && document.queryCommandState(command);
		}

		function onAction(event: MouseEvent<HTMLButtonElement>) {
			event.preventDefault();

			if (!isElFocused()) {
				$el?.focus();
			}

			if (typeof command === "function") {
				command(editorState);
			} else {
				document.execCommand(command);
			}
		}

		if (editorState.htmlMode) {
			return null;
		}

		return (
			<Button
				type="button"
				variant="ghost"
				size="sm"
				className="h-8 w-8 p-0 rounded-md data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
				data-active={active}
				onMouseDown={onAction}
				tabIndex={-1}
				title={title}
				{...props}
			>
				{content}
			</Button>
		);
	}
}
