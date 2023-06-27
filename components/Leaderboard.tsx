'use client';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import React from 'react';

import VoteButtons from '@/components/VoteButtons';
import { createColumnHelper } from '@tanstack/react-table';
import { PhrasePairRow, PhrasePairTable } from '@/utils/types';

const columnHelper = createColumnHelper<PhrasePairRow>();

export const columns = [
	columnHelper.display({
		id: 'voteButtons',
		cell: (props) => <VoteButtons row={props.row} />,
	}),
	columnHelper.accessor('phraseOne', {
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('phraseTwo', {
		cell: (info) => info.getValue(),
	}),
];

export default function LeaderBoardTable({ data }: { data: PhrasePairRow[] }) {
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
