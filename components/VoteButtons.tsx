'use client';

import { useCreateVote } from '@/utils/react-query-hooks';
import { PhrasePairRow } from '@/utils/types';
import { Row } from '@tanstack/react-table';

export default function VoteButtons({ row }: { row: Row<PhrasePairRow> }) {
	const phrasePairId = row.original.id;

	const { mutateAsync: vote } = useCreateVote();
	return (
		<div className="flex flex-col">
			<button
				onClick={() => vote({ phrasePairId: phrasePairId.toString(), voteType: 'UPVOTE' })}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			>
				Upvote
			</button>
			<button
				onClick={() => vote({ phrasePairId: phrasePairId.toString(), voteType: 'DOWNVOTE' })}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			>
				Downvote
			</button>
		</div>
	);
}
