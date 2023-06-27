import { v4 as uuidv4 } from 'uuid';
import { AppSupabaseClient } from './types';

export async function createPhrasePair(
	supabase: AppSupabaseClient,
	phraseOne: string,
	phraseTwo: string,
	relevance: number,
) {
	const now = new Date();
	const { data, error } = await supabase.from('phrase_pairs').insert([
		{
			id: uuidv4(),
			phraseOne,
			phraseTwo,
			createdAt: now.toISOString(),
			updatedAt: now.toISOString(),
			relevance: relevance,
		},
	]);
	if (error) {
		throw error;
	}
	return data;
}

export async function getPhrasePairs(supabase: AppSupabaseClient) {
	const { data, error } = await supabase.from('phrase_pairs').select('*');
	if (error) {
		throw error;
	}
	return data;
}

type VoteType = 'UPVOTE' | 'DOWNVOTE';

export async function createVote(supabase: AppSupabaseClient, phrasePairId: string, voteType: VoteType) {
	const now = new Date();
	const { data, error } = await supabase.from('vote').insert([
		{
			id: uuidv4(),
			createdAt: now.toISOString(),
			updatedAt: now.toISOString(),
			phrasePairId,
			voteType,
		},
	]);
	if (error) {
		throw error;
	}
	return data;
}

export async function getVotes(supabase: AppSupabaseClient, phrasePairId: string) {
	const { data, error } = await supabase.from('vote').select('*').eq('phrasePairId', phrasePairId);
	if (error) {
		throw error;
	}
	return data;
}

export async function getAllVotes(supabase: AppSupabaseClient) {
	const { data, error } = await supabase.from('vote').select('*');
	if (error) {
		throw error;
	}
	return data;
}
