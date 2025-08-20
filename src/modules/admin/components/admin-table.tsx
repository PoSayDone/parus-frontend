"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";

interface AdminTableAction {
	type: "view" | "edit" | "delete";
	label: string;
	href?: string;
	onClick?: (key: string) => void;
}

interface AdminTableColumn {
	key: string;
	label: string;
	render?: (value: any, row: any) => React.ReactNode;
}

interface AdminTableProps {
	columns: AdminTableColumn[];
	data: any[];
	actions: AdminTableAction[];
	getKey: (row: any) => string;
}

export function AdminTable({
	columns,
	data,
	actions,
	getKey,
}: AdminTableProps) {
	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						{columns.map((column) => (
							<TableHead key={column.key}>
								{column.label}
							</TableHead>
						))}
						<TableHead className="w-[70px]"></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.length > 0 &&
						data.map((row) => {
							const rowKey = getKey(row);
							return (
								<TableRow key={rowKey}>
									{columns.map((column) => (
										<TableCell key={column.key}>
											{column.render
												? column.render(
														row[column.key],
														row,
													)
												: row[column.key]}
										</TableCell>
									))}
									<TableCell>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant="ghost"
													className="size-8 !p-0"
												>
													<MoreHorizontal />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												{actions.map((action) => {
													if (
														action.type ===
															"delete" &&
														action.onClick
													) {
														return (
															<DropdownMenuItem
																key={
																	action.type
																}
																className="text-destructive"
																onClick={() =>
																	action.onClick?.(
																		rowKey,
																	)
																}
															>
																<Trash2 />
																{action.label}
															</DropdownMenuItem>
														);
													}

													if (action.href) {
														const href =
															action.href.replace(
																"{key}",
																rowKey,
															);
														return (
															<DropdownMenuItem
																key={
																	action.type
																}
																asChild
															>
																<Link
																	href={href}
																>
																	{action.type ===
																		"view" && (
																		<Eye />
																	)}
																	{action.type ===
																		"edit" && (
																		<Edit />
																	)}
																	{
																		action.label
																	}
																</Link>
															</DropdownMenuItem>
														);
													}

													return null;
												})}
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							);
						})}
				</TableBody>
			</Table>
			{data.length == 0 && (
				<div className="w-full flex items-center justify-center h-24">
					Ничего не найдено
				</div>
			)}
		</div>
	);
}
