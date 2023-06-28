import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
	return (
		<header className=" fixed text-white px-5 top-0 z-50 w-full py-2 md:p-6 bg-transparent flex justify-between items-center">
			<div className="flex flex-row items-center ">
				<Link href="/" className="z-20 text-xs md:text-sm sm:mb-0">
					<Image src={'/logos/128.png'} width={40} height={40} alt="Logo of the sound of blue" />
				</Link>
				<Link href="/" className="z-20 text-xs md:text-sm sm:mb-0">
					The Sound of Blue
				</Link>
			</div>

			<div className="flex space-x-4">
				<Link href="/about" className="z-20 text-sm sm:mb-0">
					About
				</Link>
				{/* <Link href="/" className="z-20 text-sm sm:mb-0">
					Submit
				</Link> */}
				<Link href="/leaderboard" className="z-20 text-sm sm:mb-0">
					Leaderboard
				</Link>
			</div>
		</header>
	);
}
