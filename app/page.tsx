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
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';

const formSchema = z.object({
	inputOne: z.string().min(1).max(20),
	inputTwo: z.string().min(1).max(20),
});

export default function Index() {
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
		<div className="flex-1 flex  flex-col justify-center   w-full mt-24">
			<Form {...form}>
				<form className="items-center flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex flex-col md:flex-row items-center w-full justify-evenly  ">
						<FormField
							control={form.control}
							name="inputOne"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input className="m-5 md:m-0   h-40 w-60" {...field} placeholder="Input One" />
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
										<Input className="m-5 md:m-0 h-40 w-60" {...field} placeholder="Input Two" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button className="mt-10" type="submit">
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
}
