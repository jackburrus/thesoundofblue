import { HeartIcon } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
	return (
		<footer className="fixed bottom-0 flex  text-sm  justify-between bg-transparent text-white w-full py-4 px-6">
			<div>
				<p className="flex flex-row">
					Made with <HeartIcon className=" mt-1 mx-2" fill="red" color="red" size={16} /> by{' '}
					<a href="https://www.twitter.com/jackburrus" target="_blank" className="underline ml-1">
						Jack Burrus
					</a>
				</p>
			</div>
			<div className="flex space-x-4">
				<Link href="/terms" target="_blank" className="underline">
					Terms
				</Link>
				<Link href="/privacy" target="_blank" className="underline">
					Privacy
				</Link>
			</div>
		</footer>
	);
}
