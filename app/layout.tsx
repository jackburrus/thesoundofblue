import { Toaster } from 'react-hot-toast';
import './globals.css';
import AppProviders from './AppProviders';
import Header from '@/components/Header';
import { Metadata } from 'next';
import { Gradient } from '@/utils/gradient';

const siteConfig = {
	title: 'The Sound of Blue',
	description: `The Sound of Blue" is a captivating exploration into the complex tapestry of human thought and creativity. This innovative platform invites users to propose two seemingly unrelated phrases, and our AI calculates a 'relevance score' representing its interpretation of their connection. Phrases with the lowest scores — those connections most elusive to AI but meaningful to us — are compiled for users to upvote or downvote, democratically surfacing connections uniquely human. It's a fascinating blend of cognitive science, AI capabilities, and community engagement, offering a novel perspective on the kaleidoscopic ways we, as humans, perceive and connect ideas.`,
};

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
		images: [], //TODO CREATE OPEN GRAPH IMAGES
		creator: '@jackburrus',
	},
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon-16x16.png',
		apple: '/apple-touch-icon.png',
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<AppProviders>
				<body>
					{/* <Header /> */}

					<main className="min-h-screen  flex flex-col items-center">{children}</main>
					<Toaster />
				</body>
			</AppProviders>
		</html>
	);
}
