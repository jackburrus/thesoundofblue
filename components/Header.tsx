import Link from 'next/link';

export default function Header() {
	return (
		<header className=" w-full py-2 md:p-6 flex justify-between items-center">
			<Link href="/" className="z-20 text-sm sm:mb-0">
				The Sound of Blue
			</Link>
			<div className="flex space-x-4">
				<Link href="/about" className="z-20 text-sm sm:mb-0">
					About
				</Link>
				<Link href="/" className="z-20 text-sm sm:mb-0">
					Submit
				</Link>
				<Link href="/leaderboard" className="z-20 text-sm sm:mb-0">
					Leaderboard
				</Link>
			</div>
		</header>
	);
}
