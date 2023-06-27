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
import { useCallback, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Gradient } from '@/utils/gradient';
import Header from '@/components/Header';

const formSchema = z.object({
	inputOne: z.string().min(1).max(20),
	inputTwo: z.string().min(1).max(20),
});

export default function Index() {
	const gradient = new Gradient();
	useEffect(() => {
		gradient.initGradient('#gradient-canvas');
	}, []);
	const { mutateAsync: mutateCreatePhrasePair } = useCreatePhrasePair();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			inputOne: '',
			inputTwo: '',
		},
	});
	const { handleSubmit, completion, isLoading, complete } = useCompletion({
		api: '/api/get-connection-score',
		body: { phraseOne: form.getValues('inputOne'), phraseTwo: form.getValues('inputTwo') },
	});

	const getConnectionScore = useCallback(
		async (c: string) => {
			const completion = await complete(c);
			if (!completion) throw new Error('Failed to get connection score');
			const relevance = JSON.parse(completion);
			console.log(relevance, 'relavance');
			// you should more validation here to make sure the response is valid
			// if (typos?.length && !window.confirm('Typos found… continue?')) return
		},
		[complete],
	);

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

		console.log(connectionScore, 'connectionScore');
		if (connectionScore > 10) {
			toast.error('Connection score is too high');
			return;
		}

		const phraseOne = values.inputOne;
		const phraseTwo = values.inputTwo;
		mutateCreatePhrasePair({ phraseOne, phraseTwo, relevance: connectionScore });
	}

	return (
		<div className="flex-1 flex relative  flex-col justify-center   w-full ">
			<Header />
			<canvas className="absolute w-full h-screen z-[-1]" id="gradient-canvas" data-transition-in />

			<Form {...form}>
				<form className="items-center flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
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
					>
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
}
