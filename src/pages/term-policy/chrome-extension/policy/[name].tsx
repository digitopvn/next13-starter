import { capitalizeName } from "diginext-utils/dist/string";
import getStringFromNextJsRouter from "diginext-utils/dist/string/getStringFromNextJsRouter";
import { useRouter } from "next/router";
import React from "react";
// src/pages/chrome-extension/policy/[name].tsx
const PrivacyPolicy = () => {
	const router = useRouter();

	const { query } = router;

	const name = capitalizeName(getStringFromNextJsRouter(query.name));

	if (!name) return <></>;

	return (
		<div className="privacy-policy-container mx-auto mt-20 max-w-3xl rounded-lg bg-gray-900 p-8 text-gray-200 shadow-lg">
			<h1 className="mb-4 text-2xl font-bold">{name} Privacy &amp; Usage Policy</h1>

			<h2 className="my-4 text-xl font-semibold">Introduction</h2>
			<p className="mb-4">
				Thank you for choosing {name}. This policy explains our practices concerning the collection, use, and
				sharing of your information.
			</p>

			<h2 className="my-4 text-xl font-semibold">Data Collection</h2>
			<ul className="mb-4 list-disc pl-5">
				<li className="mb-2">
					<strong className="font-medium">Consent</strong>: By using {name}, you consent to the collection and
					use of your data as described in this policy. Our extension aims to be transparent about any data
					collection activities.
				</li>
				<li className="mb-2">
					<strong className="font-medium">Information We Collect</strong>: {name} collects [Specific Data
					Points: e.g., browser version, time spent on pages]. This data is essential for [Explain the
					functionality: e.g., &ldquo;to enhance user experience by adapting to the browser version&rdquo;].
				</li>
			</ul>

			<h2 className="my-4 text-xl font-semibold">Data Usage</h2>
			<ul className="mb-4 list-disc pl-5">
				<li className="mb-2">
					<strong className="font-medium">Purpose</strong>: The data we collect is used exclusively for [e.g.,
					&ldquo;enhancing user experience, understanding user preferences&rdquo;].
				</li>
				<li className="mb-2">
					<strong className="font-medium">No Unintended Use</strong>: We promise not to use or transfer your
					data for purposes unrelated to the extension&apos;s core functionality.
				</li>
			</ul>

			<h2 className="my-4 text-xl font-semibold">Data Minimization</h2>
			<p className="mb-4">
				We are committed to collecting only the minimal amount of data necessary for our extension&apos;s
				functionality. We avoid collecting personal or sensitive user data unless it&apos;s critical to our
				service.
			</p>

			<h2 className="my-4 text-xl font-semibold">Disclosure &amp; Privacy</h2>
			<ul className="mb-4 list-disc pl-5">
				<li className="mb-2">
					<strong className="font-medium">Privacy Commitment</strong>: We do not share or sell your data to
					third parties. If {name} handles personal or sensitive data, we will:
					<ul className="mt-2 list-disc pl-5">
						<li className="mb-2">Clearly communicate this to you.</li>
						<li className="mb-2">Post an up-to-date and comprehensive privacy policy.</li>
						<li className="mb-2">Provide you an option to revoke access to this data at any time.</li>
					</ul>
				</li>
				<li className="mb-2">
					<strong className="font-medium">Data Retention</strong>: Any user data collected is stored for a
					maximum of [Specific Time Period, e.g., &ldquo;30 days&rdquo;], after which it is permanently
					deleted.
				</li>
			</ul>

			<h2 className="my-4 text-xl font-semibold">Security</h2>
			<p className="mb-4">
				We employ state-of-the-art security measures to ensure the safety and privacy of your data.
			</p>

			<h2 className="my-4 text-xl font-semibold">Changes to This Policy</h2>
			<p>
				From time to time, we may make changes to this policy. We will always notify our users of any changes,
				ensuring transparency and trust.
			</p>
		</div>
	);
};

export default PrivacyPolicy;
