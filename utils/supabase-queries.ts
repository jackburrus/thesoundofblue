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
