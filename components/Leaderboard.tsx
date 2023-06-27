'use client';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import React from 'react';
import { columns } from '@/utils/table-columns';
export default function LeaderBoardTable({ defaultData }) {
	const [data, setData] = React.useState(() => [...defaultData]);
	const tableInstance = useReactTable({ columns, data, getCoreRowModel: getCoreRowModel() });
	return (
		<div className="w-full">
			<table>
				<thead>
					{tableInstance.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id}>
									{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{tableInstance.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
