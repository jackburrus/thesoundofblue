import { Database } from '@/lib/database.types';
import { SupabaseClient } from '@supabase/supabase-js';

export type AppSupabaseClient = SupabaseClient<Database>;
export type Table<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];

export type PhrasePairTable = Table<'phrase_pairs'>;
export type PhrasePairRow = {
	id: number;
	phraseOne: string;
	phraseTwo: string;
	relevance: number;
	createdAt: string;
	updatedAt: string;
};
