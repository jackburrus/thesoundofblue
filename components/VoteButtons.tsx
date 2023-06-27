'use client';

import { useCreateVote } from '@/utils/react-query-hooks';
import { PhrasePairRow } from '@/utils/types';
import { Row } from '@tanstack/react-table';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function VoteButtons({ row }: { row: Row<PhrasePairRow> }) {
	const phrasePairId = row.original.id;

	const { mutateAsync: vote } = useCreateVote();
	return (
		<div className="flex flex-col mr-10 my-2">
			<button
				onClick={() => vote({ phrasePairId: phrasePairId.toString(), voteType: 'UPVOTE' })}
				className="bg-green-100 mb-1 flex justify-center items-center  font-bold py-1 px-4 rounded text-green-500"
			>
				<ChevronUp size={18} />
			</button>
			<button
				onClick={() => vote({ phrasePairId: phrasePairId.toString(), voteType: 'DOWNVOTE' })}
				className="bg-red-100 flex justify-center items-center  font-bold py-1 px-4 rounded text-[#EA3323]"
			>
				<ChevronDown size={18} />
			</button>
		</div>
	);
}
