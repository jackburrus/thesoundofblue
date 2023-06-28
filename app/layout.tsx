import { Toaster } from 'react-hot-toast';
import './globals.css';
import AppProviders from './AppProviders';
import Header from '@/components/Header';
import { Metadata } from 'next';
import { Gradient } from '@/utils/gradient';
import { Comfortaa } from 'next/font/google';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';

const siteConfig = {
	title: 'The Sound of Blue',
	description: `The Sound of Blue" is an  exploration into the complex tapestry of human thought and creativity. This platform invites users to propose two seemingly unrelated phrases, and our AI calculates a 'relevance score' representing its interpretation of their connection. Phrase pairs that fall below a threshold set by the AI — but meaningful to us — are compiled for users to upvote or downvote, democratically surfacing connections uniquely human. It's a fascinating blend of cognitive science, AI capabilities, and community engagement, offering a novel perspective on the kaleidoscopic ways we, as humans, perceive and connect ideas.`,
};

const comfortaa = Comfortaa({
	subsets: ['latin-ext'],
});

export const metadata: Metadata = {
	title: 'The Sound of Blue',
	description: siteConfig.description,
	keywords: [
		'Cognitive Science',
		'Artificial Intelligence',
		'Human Cognition',
		'Abstract Thinking',
		'Thought Experiment',
		'Creative Thinking',
		'Human Creativity',
		'Cognitive Creativity',
	],
	authors: [
		{
			name: 'jackburrus',
			url: 'https://github.com/jackburrus',
		},
	],
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://thesoundofblue.xyz',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'The Sound of Blue',
		description: siteConfig.description,
		images: ['https://thesoundofblue.xyz/logos/Opengraph.png'],
		creator: '@jackburrus',
	},
	icons: {
		icon: '/logos/favicon.ico',
		shortcut: '/logos/16.png',
		apple: '/logos/16.png',
	},
	metadataBase: new URL('https://thesoundofblue.xyz'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<AppProviders>
				<body>
					<Header />

					<main className={`min-h-screen  flex flex-col items-center ${comfortaa.className}`}>{children}</main>
					<Toaster />
					<Footer />
					<Analytics />
				</body>
			</AppProviders>
		</html>
	);
}
