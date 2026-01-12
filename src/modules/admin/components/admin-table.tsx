"use client";

import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

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
	filters?: React.ReactNode;
	fetchDataAction?: (params: {
		page: number;
		queryParams: {
			limit: number;
			q?: string;
		};
	}) => Promise<{
		response: { data: any[]; count: number };
		nextPage: number | null;
	}>;
	initialPage?: number;
	initialLimit?: number;
}

export function AdminTable({
	columns,
	data: externalData,
	actions,
	getKey,
	filters,
	fetchDataAction: fetchData,
	initialPage = 1,
	initialLimit = 10,
}: AdminTableProps) {
	const [internalData, setInternalData] = useState<any[]>(externalData || []);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(initialPage);
	const [limit] = useState(initialLimit);
	const [total, setTotal] = useState(0);
	const [searchTerm, setSearchTerm] = useState("");
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [deleteItemKey, setDeleteItemKey] = useState<string | null>(null);
	const [deleteAction, setDeleteAction] = useState<
		((key: string) => Promise<void>) | null
	>(null);

	// Debounce timeout ref
	const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Use external data if no fetch function is provided
	useEffect(() => {
		if (!fetchData && externalData) {
			setInternalData(externalData);
		}
	}, [externalData, fetchData]);

	// Fetch data when fetchData function is provided
	const loadData = useCallback(
		async (searchQuery: string = searchTerm) => {
			if (fetchData) {
				setLoading(true);
				try {
					const result = await fetchData({
						page,
						queryParams: { limit, q: searchQuery },
					});
					setInternalData(result.response.data || result.response.users || []);
					setTotal(result.response.count);
				} catch (error) {
					console.error("Error fetching data:", error);
				} finally {
					setLoading(false);
				}
			}
		},
		[fetchData, page, limit, searchTerm],
	);

	// Implement debounce for search
	useEffect(() => {
		// Clear previous timeout
		if (debounceTimeoutRef.current) {
			clearTimeout(debounceTimeoutRef.current);
		}

		// Set new timeout
		debounceTimeoutRef.current = setTimeout(() => {
			loadData(searchTerm);
		}, 300); // 300ms debounce

		// Cleanup timeout on unmount or when searchTerm changes
		return () => {
			if (debounceTimeoutRef.current) {
				clearTimeout(debounceTimeoutRef.current);
			}
		};
	}, [searchTerm, loadData]); // Include page and limit in dependencies

	const handleSearch = (term: string) => {
		setSearchTerm(term);
		setPage(1); // Reset to first page when searching
	};

	const handleDeleteClick = (
		key: string,
		action: (key: string) => Promise<void>,
	) => {
		setDeleteItemKey(key);
		setDeleteAction(() => action);
		setShowDeleteDialog(true);
	};

	const confirmDelete = async () => {
		if (deleteItemKey && deleteAction) {
			try {
				await deleteAction(deleteItemKey);
				await loadData(searchTerm);
			} catch (error) {
				console.error("Error during deletion:", error);
			}
		}
		// Reset all delete-related state
		setShowDeleteDialog(false);
		setDeleteItemKey(null);
		setDeleteAction(null);
	};

	const _cancelDelete = () => {
		setShowDeleteDialog(false);
		setDeleteItemKey(null);
		setDeleteAction(null);
	};

	const totalPages = Math.ceil(total / limit);

	// Load data when component mounts
	useEffect(() => {
		if (fetchData && searchTerm === "") {
			loadData();
		}
	}, [fetchData, loadData, searchTerm]);

	return (
		<div className="space-y-4">
			{fetchData && (
				<div className="flex items-center justify-between gap-3">
					<div className="flex items-center gap-3">
						<input
							type="text"
							placeholder="Поиск..."
							className="border rounded-md px-3 py-2 text-sm"
							value={searchTerm}
							onChange={(e) => handleSearch(e.target.value)}
						/>
						{filters}
					</div>
					<div className="text-sm text-muted-foreground">Всего: {total}</div>
				</div>
			)}

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							{columns.map((column) => (
								<TableHead key={column.key}>{column.label}</TableHead>
							))}
							<TableHead className="w-[70px]"></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{loading && internalData.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={columns.length + 1}
									className="h-24 text-center"
								>
									Загрузка...
								</TableCell>
							</TableRow>
						) : internalData.length > 0 ? (
							internalData.map((row) => {
								const rowKey = getKey(row);
								return (
									<TableRow key={rowKey}>
										{columns.map((column) => (
											<TableCell key={column.key}>
												{column.render
													? column.render(row[column.key], row)
													: row[column.key]}
											</TableCell>
										))}
										<TableCell>
											<DropdownMenu modal={false}>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" className="size-8 !p-0">
														<MoreHorizontal />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													{actions.map((action) => {
														if (action.type === "delete" && action.onClick) {
															return (
																<DropdownMenuItem
																	key={action.type}
																	className="text-destructive"
																	onClick={(e) => {
																		e.preventDefault();
																		handleDeleteClick(rowKey, action.onClick!);
																	}}
																>
																	<Trash2 />
																	{action.label}
																</DropdownMenuItem>
															);
														}

														if (action.href) {
															const href = action.href.replace("{key}", rowKey);
															return (
																<DropdownMenuItem key={action.type} asChild>
																	<Link href={href}>
																		{action.type === "view" && <Eye />}
																		{action.type === "edit" && <Edit />}
																		{action.label}
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
							})
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length + 1}
									className="h-24 text-center"
								>
									Ничего не найдено
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{fetchData && totalPages > 1 && (
				<div className="flex items-center justify-between">
					<div className="text-sm text-muted-foreground">
						Страница {page} из {totalPages}
					</div>
					<div className="flex space-x-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => setPage((p) => Math.max(1, p - 1))}
							disabled={page === 1}
						>
							Предыдущая
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => {
								setPage((p) => Math.min(totalPages, p + 1));
							}}
							disabled={page === totalPages}
						>
							Следующая
						</Button>
					</div>
				</div>
			)}

			<AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Подтверждение удаления</AlertDialogTitle>
						<AlertDialogDescription>
							Вы уверены, что хотите удалить этот элемент? Это действие нельзя
							отменить.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Отмена</AlertDialogCancel>
						<AlertDialogAction onClick={confirmDelete}>
							Удалить
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
