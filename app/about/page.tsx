'use client';

import { Gradient } from '@/utils/gradient';
import { useEffect } from 'react';

export default function About() {
	const gradient = new Gradient();
	useEffect(() => {
		gradient.initGradient('#gradient-canvas');
	}, []);
	return (
		<div className=" w-full   flex border h-screen items-center justify-center ">
			<canvas className="absolute w-full h-screen z-[-1]" id="gradient-canvas" data-transition-in />
			<div className="bg-white items-center flex flex-col shadow-md mx-4 mt-10 md:max-w-xl rounded-md p-10">
				<p>
					Welcome! This is a place where human imagination thrives, exploring connections that AI can't grasp. You start by
					entering two words or phrases. If our AI doesn't see a clear link between them – but you do – your unique pair will
					join our growing list of 'human-only' connections. Then, everyone can vote on these pairs, highlighting the
					creative insights that make us uniquely human.
				</p>
			</div>
		</div>
	);
}
