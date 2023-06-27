import VoteButtons from '@/components/VoteButtons';
import { createColumnHelper } from '@tanstack/react-table';

type PhrasePairRow = {
	id: number;
	phraseOne: string;
	phraseTwo: string;
	relevance: number;
	createdAt: string;
	updatedAt: string;
};
const columnHelper = createColumnHelper<PhrasePairRow>();

export const columns = [
	columnHelper.display({
		id: 'voteButtons',
		cell: (props) => <VoteButtons {...props} />,
	}),
	columnHelper.accessor('phraseOne', {
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('phraseTwo', {
		cell: (info) => info.getValue(),
	}),
];
