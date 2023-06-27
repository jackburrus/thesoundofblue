import LeaderBoardTable from '@/components/Leaderboard';
import { getPhrasePairs } from '@/utils/supabase-queries';
import { columns } from '@/utils/table-columns';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
export default async function LeaderBoard() {
	const supabase = createServerComponentClient({ cookies });
	const data = await getPhrasePairs(supabase);

	return <LeaderBoardTable data={data} />;
}
