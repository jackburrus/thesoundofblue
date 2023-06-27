'use client';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import LogoutButton from './logout-button';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useCompletion } from 'ai/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCreatePhrasePair } from '@/utils/react-query-hooks';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Gradient } from '@/utils/gradient';
import Header from '@/components/Header';
import { BadgeCheck, XCircle } from 'lucide-react';

const formSchema = z.object({
	inputOne: z.string().min(1).max(20),
	inputTwo: z.string().min(1).max(20),
});

const WELCOME_MESSAGE = `Welcome! This is a place where human imagination thrives, exploring connections that AI can't grasp. You start by
entering two words or phrases. If our AI doesn't see a clear link between them – but you do – your unique pair
will join our growing list of 'human-only' connections. Then, everyone can vote on these pairs,
highlighting the creative insights that make us uniquely human.`;

const REJECTION_MESSAGE = `Thank you for your submission! However, our AI found a stronger connection between your phrases than expected. The purpose of 'The Sound of Blue' is to celebrate the unique and abstract connections that humans make - the ones that AI can't quite understand. Please try again with another pair of words or phrases. Let's uncover more connections that truly highlight the power of human imagination!`;

const CONFIRMATION_MESSAGE = `Great job! Your pair of words or phrases has stumped our AI - it couldn't find a strong connection. This means your unique insight has been added to our list! Now, users from all over can vote on your connection, letting us together uncover the beautiful intricacies of human thought. Thanks for contributing to 'The Sound of Blue' and keep those creative connections coming!`;

export default function Index() {
	const gradient = new Gradient();
	useEffect(() => {
		gradient.initGradient('#gradient-canvas');
	}, []);
	const { mutateAsync: mutateCreatePhrasePair, isLoading } = useCreatePhrasePair();
	const [activeMessage, setActiveMessage] = useState(WELCOME_MESSAGE);
	// const [activeMessage, setActiveMessage] = useState(CONFIRMATION_MESSAGE);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			inputOne: '',
			inputTwo: '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		// fetch the data from the api here
		const connectionScoreResponse = await fetch('/api/get-connection-score', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ phraseOne: values.inputOne, phraseTwo: values.inputTwo }),
		});
		const connectionScore = await connectionScoreResponse.json();
		//turn connection score into a number

		if (connectionScore > 10) {
			// toast.error('Connection score is too high');
			setActiveMessage(REJECTION_MESSAGE);
			return;
		}
		setActiveMessage(CONFIRMATION_MESSAGE);
		const phraseOne = values.inputOne;
		const phraseTwo = values.inputTwo;
		mutateCreatePhrasePair({ phraseOne, phraseTwo, relevance: connectionScore });
	}

	return (
		<div className="flex-1 flex relative  flex-col justify-center   w-full ">
			{/* <Header /> */}
			<canvas className="absolute w-full h-screen z-[-1]" id="gradient-canvas" data-transition-in />

			<Form {...form}>
				<form className="items-center flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
					<div className="bg-white items-center flex flex-col shadow-md mx-4 mt-10 md:max-w-xl rounded-md p-10">
						{activeMessage === CONFIRMATION_MESSAGE && <BadgeCheck className="mb-5" size={36} color={'#4caf50'} />}
						<p className={`text-xs ${activeMessage === REJECTION_MESSAGE && 'text-red-400'} `}>{activeMessage}</p>
						{activeMessage === CONFIRMATION_MESSAGE && (
							<Link className="mt-5" href="/leaderboard">
								<Button className="text-xs ">Check out the leaderboard!</Button>
							</Link>
						)}
					</div>
					<div className="flex flex-col md:flex-row items-center w-full justify-evenly  ">
						<FormField
							control={form.control}
							name="inputOne"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											className="m-5 text-white text-4xl md:m-0 bg-transparent border-b-2 placeholder:text-white  h-40 w-60"
											{...field}
											placeholder="Input One"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="inputTwo"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											className="m-5 text-white text-4xl md:m-0 bg-transparent border-b-2 placeholder:text-white  h-40 w-60"
											{...field}
											placeholder="Input Two"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button
						variant={'default'}
						className="bg-blue-100 px-10 mb-1 mt-10 flex justify-center items-center text-[8px] font-bold py-1  rounded text-blue-300 hover:text-white hover:bg-blue-300 transition-all duration-200 ease-in-out"
						type="submit"
						disabled={isLoading}
					>
						{isLoading ? (
							<div className="w-6 h-6 rounded-full animate-spin border-y-2 border-solid border-blue-200 border-t-transparent shadow-md" />
						) : (
							'Submit'
						)}
					</Button>
				</form>
			</Form>
		</div>
	);
}
