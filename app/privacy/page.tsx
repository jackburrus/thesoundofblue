import Link from 'next/link';
import React from 'react';

export default function PrivacyPage() {
	return (
		<div className="mx-auto flex flex-col p-10 mt-20">
			<Link href={'/'}>
				<h2 className=" text-md font-fira font-extrabold  uppercase tracking-wide text-primary-500 ">The Sound of Blue</h2>
			</Link>
			<h1 className="mb-2 text-3xl">Privacy Policy</h1>
			<p className="mb-4">
				This Privacy Policy explains how we collect, use, and disclose your personal information when you visit our website.
				By using our website, you consent to the terms of this policy.
			</p>
			<p className="font-bold">1. Information We Collect</p>
			<p className="mb-4">
				We may collect personal information such as your name, email address, and other contact information when you
				voluntarily provide it to us through our website.
			</p>
			<p className="font-bold">2. How We Use Your Information</p>
			<p className="mb-4">
				We use your personal information to respond to your inquiries, to provide you with information about our products
				and services, and to improve the content and functionality of our website.
			</p>
			<p className="font-bold">3. Cookies and Other Tracking Technologies</p>
			<p className="mb-4">
				We use cookies and other tracking technologies to collect information about your use of our website. This
				information may include your IP address, browser type, operating system, and other information about your device. We
				use this information to improve the content and functionality of our website and to personalize your experience.
			</p>
			<p className="font-bold">4. Sharing Your Information</p>
			<p className="mb-4">
				We do not sell or share your personal information with third parties except as required by law or as necessary to
				fulfill your requests.
			</p>
			<p className="font-bold">5. Security</p>
			<p className="mb-4">
				We take reasonable measures to protect your personal information from unauthorized access, disclosure, or use.
			</p>
			<p className="font-bold">6. Children’s Privacy</p>
			<p className="mb-4">
				Our website is not intended for children under the age of 13. We do not knowingly collect personal information from
				children under the age of 13.
			</p>
			<p className="font-bold">7. Changes to this Privacy Policy</p>
			<p className="mb-4">
				We may update this Privacy Policy from time to time. We will post the updated policy on our website and will
				indicate the date of the most recent update.
			</p>
			<p className="font-bold">8. Contact Us</p>
			<p>
				If you have any questions about this Privacy Policy, please contact us at{' '}
				<a className="text-blue-500 hover:underline" href="mailto:jack@tickertalk.ai">
					jack@tickertalk.ai
				</a>
				.
			</p>
		</div>
	);
}
