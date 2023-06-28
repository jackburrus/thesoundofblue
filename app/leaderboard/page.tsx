import LeaderBoardTable from '@/components/Leaderboard';
import { getAllVotes, getPhrasePairs } from '@/utils/supabase-queries';
import { columns } from '@/utils/table-columns';
import { PhrasePairTable, VoteTable } from '@/utils/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

function calculateNetVotes(votes: VoteTable[]): number {
	let netVotes = 0;
	for (let vote of votes) {
		if (vote.voteType === 'UPVOTE') {
			netVotes += 1;
		} else if (vote.voteType === 'DOWNVOTE') {
			netVotes -= 1;
		}
	}
	return netVotes;
}

type PhrasePairWithScore = PhrasePairTable & {
	netVotes: number;
	votes: VoteTable[];
	// score: number;
};

function calculateScore(phrasePair: PhrasePairWithScore): number {
	const netVotes = calculateNetVotes(phrasePair.votes);
	const createdAt = new Date(phrasePair.createdAt);
	const hoursSinceCreated = (new Date().getTime() - createdAt.getTime()) / 3600000;
	return netVotes / (hoursSinceCreated + 1); // Add 1 to prevent division by zero
}

function mapVotesToPhrasePairs(votes: VoteTable[], phrasePairs: PhrasePairTable[]) {
	return phrasePairs.map((phrasePair) => {
		const votesForPair = votes.filter((vote) => vote.phrasePairId === phrasePair.id);
		const netVotes = calculateNetVotes(votesForPair);
		const phrasePairWithVotes = {
			...phrasePair,
			votes: votesForPair,
			netVotes,
		};
		const score = calculateScore(phrasePairWithVotes);
		return {
			...phrasePair,
			votes: votesForPair,
			netVotes,
			score,
		};
	});
}

export const dynamic = 'force-dynamic';

export default async function LeaderBoard() {
	const supabase = createServerComponentClient({ cookies });
	const data = await getPhrasePairs(supabase);
	const votes = await getAllVotes(supabase);
	const dataWithVotes = mapVotesToPhrasePairs(votes, data);
	const sortedByScore = dataWithVotes.sort((a, b) => b.score - a.score);
	return <LeaderBoardTable data={sortedByScore} />;
}
