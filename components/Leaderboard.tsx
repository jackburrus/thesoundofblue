'use client';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import React, { useEffect } from 'react';

import VoteButtons from '@/components/VoteButtons';
import { createColumnHelper, ColumnResizeMode } from '@tanstack/react-table';
import { PhrasePairRow, PhrasePairTable } from '@/utils/types';
import Header from './Header';
import { Gradient } from '@/utils/gradient';

const columnHelper = createColumnHelper<PhrasePairRow>();

export const columns = [
	columnHelper.display({
		id: 'voteButtons',
		header: 'Vote',
		minSize: 100,
		cell: (props) => <VoteButtons row={props.row} />,
	}),
	columnHelper.accessor('phraseOne', {
		header: 'Phrase One',
		cell: (info) => info.getValue(),
		meta: {
			align: 'center',
		},
	}),
	columnHelper.accessor('phraseTwo', {
		header: 'Phrase Two',
		meta: {
			align: 'center',
		},
		minSize: 150,

		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('createdAt', {
		header: 'Created',
		meta: {
			align: 'center',
			// add a class to hide the column on smaller screens
		},
		cell: (info) => {
			const date = new Date(info.getValue());
			return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}`;
		},
	}),
];

export default function LeaderBoardTable({ data }: { data: PhrasePairRow[] }) {
	const isMobile = window.innerWidth < 768;
	const tableInstance = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
	});
	const gradient = new Gradient();
	useEffect(() => {
		gradient.initGradient('#gradient-canvas');
	}, []);
	return (
		<div className=" w-full   flex border h-screen items-center justify-center ">
			<canvas className="absolute w-full h-screen z-[-1]" id="gradient-canvas" data-transition-in />
			<div className=" max-h-[500px] md:max-h-[800px] overflow-scroll shadow-md rounded-md bg-white">
				<table className=" ">
					<thead className="">
						{tableInstance.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										{...{
											colSpan: header.colSpan,
											style: {
												width: header.getSize(),
											},
										}}
										className="border-b-2 border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										key={header.id}
									>
										{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{tableInstance.getRowModel().rows.map((row) => (
							<tr className="cursor-pointer  border-b " key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<td align={(cell.column.columnDef.meta as any)?.align} key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
