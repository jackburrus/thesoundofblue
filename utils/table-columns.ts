import { createColumnHelper } from '@tanstack/react-table';

type PhrasePairRow = {
	id: number;
	phraseOne: string;
	phraseTwo: string;
	connectionScore: number;
	createdAt: string;
	updatedAt: string;
};
const columnHelper = createColumnHelper<PhrasePairRow>();

export const columns = [
	columnHelper.accessor('phraseOne', {
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('phraseTwo', {
		cell: (info) => info.getValue(),
	}),
];
