import { Database } from '@/lib/database.types';
import { SupabaseClient } from '@supabase/supabase-js';

export type AppSupabaseClient = SupabaseClient<Database>;
