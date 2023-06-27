import { useMutation } from 'react-query';
import { createPhrasePair, createVote } from './supabase-queries';
import supabaseClient from './supabase-browser';
import { toast } from 'react-hot-toast';
export const useCreatePhrasePair = () => {
	return useMutation(
		async ({ phraseOne, phraseTwo, relevance }: { phraseOne: string; phraseTwo: string; relevance: number }) => {
			return createPhrasePair(supabaseClient, phraseOne, phraseTwo, relevance);
		},
		{
			onSuccess: () => {
				toast.success('Phrase pair created!');
			},
			onError: (error: Error) => {
				toast.error(error.message);
			},
		},
	);
};

export const useCreateVote = () => {
	return useMutation(
		async ({ phrasePairId, voteType }: { phrasePairId: string; voteType: 'UPVOTE' | 'DOWNVOTE' }) => {
			return createVote(supabaseClient, phrasePairId, voteType);
		},
		{
			onSuccess: () => {
				toast.success('Vote created!');
			},
			onError: (error: Error) => {
				toast.error(error.message);
			},
		},
	);
};
