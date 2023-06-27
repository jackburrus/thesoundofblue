'use client';

import { useCreateVote, useGetVotes } from '@/utils/react-query-hooks';
import { PhrasePairRow } from '@/utils/types';
import { Row } from '@tanstack/react-table';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function VoteButtons({ row }: { row: Row<PhrasePairRow> }) {
	const phrasePairId = row.original.id.toString();
	const { data: voteCount, refetch } = useGetVotes(phrasePairId);
	const { mutateAsync: vote } = useCreateVote();

	const handleVote = async (voteType: 'UPVOTE' | 'DOWNVOTE') => {
		await vote({ phrasePairId, voteType });
		await refetch();
	};

	const upvotes = voteCount?.filter((vote) => vote.voteType === 'UPVOTE').length;
	const downvotes = voteCount?.filter((vote) => vote.voteType === 'DOWNVOTE').length;

	return (
		<div className="flex flex-col mr-10 my-2">
			<button
				onClick={() => handleVote('UPVOTE')}
				className="bg-green-100 mb-1 flex justify-center items-center text-[8px] font-bold py-1 px-4 rounded text-green-500"
			>
				<ChevronUp size={18} />
				{upvotes}
			</button>

			<button
				onClick={() => handleVote('DOWNVOTE')}
				className="bg-red-100 flex justify-center items-center font-bold py-1 px-4 rounded text-[#EA3323] text-[8px]"
			>
				<ChevronDown size={18} />
				{downvotes}
			</button>
		</div>
	);
}
