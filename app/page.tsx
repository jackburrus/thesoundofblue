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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCreatePhrasePair } from '@/utils/react-query-hooks';

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

	function onSubmit(values: z.infer<typeof formSchema>) {
		// fetch the data from the api here
		const relevance = 0; //TODO GET RELEVANCE
		console.log(values);
		const phraseOne = values.inputOne;
		const phraseTwo = values.inputTwo;
		mutateCreatePhrasePair({ phraseOne, phraseTwo, relevance: 0 });
	}

	return (
		<div className="flex-1 flex border border-cyan-500 flex-col justify-center   w-full mt-24">
			<Form {...form}>
				<form className="items-center flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex flex-row border border-green-500 w-full justify-evenly  ">
						<FormField
							control={form.control}
							name="inputOne"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input className="   h-40 w-60" {...field} placeholder="Input One" />
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
										<Input className="h-40 w-60" {...field} placeholder="Input Two" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	);
}
