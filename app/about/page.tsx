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
			<div className="bg-white items-center flex flex-col shadow-md mx-4 mt-10 overflow-y-scroll max-h-[600px] md:max-w-xl rounded-md p-10">
				<h1 className="text-xl font-bold w-full justify-start">Overview</h1>
				<p className="my-2 text-sm">
					Welcome to 'The Sound of Blue', a playful sandbox for your imagination! Have you ever noticed how our minds can
					find connections in the most unexpected places? Here, we turn that magic into a game. You toss us two words or
					phrases, and our very smart robot tries to figure out how they might be linked. But here's the catch - our robot
					isn't as creative as us humans, so if it can't see the connection that you can, your pair gets added to our special
					list. Then, everyone gets to vote on these special connections that only we humans seem to grasp! It's all about
					celebrating the wild, wonderful ways our minds work. Dive in, start connecting, and let's uncover the beauty of
					human thought together!
				</p>
				<h1 className="text-xl font-bold w-full justify-start">How it works</h1>
				<p className="my-2 text-sm">
					Ready to play in our world of words? Here's how it works:
					<ul className="mt-2">
						<li className="mt-2">
							- <span className="font-bold">Think of a Pair:</span> Start by thinking of two words or phrases. They could be as
							ordinary or as extraordinary as you like!
						</li>
						<li className="mt-2">
							{' '}
							- <span className="font-bold">Submit Your Pair:</span> Enter your chosen pair and hit 'Submit'.
						</li>
						<li className="mt-2">
							{' '}
							- <span className="font-bold">AI Evaluation:</span> Our friendly robot will then take a look and try to guess if
							there's a link between your pair. But remember, our robot isn't as imaginative as us!
						</li>
						<li className="mt-2">
							{' '}
							- <span className="font-bold">Join the List:</span> If our robot can't see the connection, congratulations! Your
							pair gets added to our special list of 'human-only' connections.
						</li>
						<li className="mt-2">
							{' '}
							- <span className="font-bold">Cast Your Votes:</span> Now the real fun begins. You and everyone else can vote on
							all the special pairs on the list. The ones with the most votes rise to the top using time decay voting.
						</li>
					</ul>
				</p>
				<h1 className="text-xl font-bold w-full justify-start">Prompt</h1>
				<p className="mt-2 text-sm">
					The prompt used to generate the relevancy score is as follows: "Analyze the connection between the phrases
					[phraseOne] and [phraseTwo]. Describe their relation on a scale from 1 (no relation) to 100 (closely related). Do
					not provide any other text in your response, only the number."
				</p>
				<h1 className="text-xl font-bold w-full justify-start mt-2">Credits</h1>
				<p className="mt-2 text-sm">
					This project was created by{' '}
					<a href="https://www.twitter.com/jackburrus" target="_blank" className="underline">
						Jack Burrus
					</a>{' '}
					as part of his #BuiltInADay series. It is open source and available on{' '}
					<a href="https://github.com/jackburrus/thesoundofblue" target="_blank" className="underline">
						Github
					</a>
					.
				</p>
			</div>
		</div>
	);
}
