import React from "react";

const TermsOfService = () => {
	return (
		<div className="container mx-auto mt-20 max-w-3xl rounded-lg bg-gray-900 p-8 text-white shadow-lg">
			<h1 className="my-8 text-center text-3xl font-bold">Terms of Service</h1>
			<section>
				<h2 className="mb-3 mt-6 text-xl font-semibold">1. Agreement to Terms</h2>
				<p className="mb-4 text-gray-300">
					By accessing or using our app, you agree to be bound by these terms. If you disagree with any part
					of the terms, you do not have permission to access the app.
				</p>
			</section>
			<section>
				<h2 className="mb-3 mt-6 text-xl font-semibold">2. Facebook Login</h2>
				<p className="mb-4 text-gray-300">
					Our app uses Facebook Login for authentication. By logging in, you grant us access to your public
					profile, which we use solely for the purpose of personalizing your experience in our app.
				</p>
			</section>
			<section>
				<h2 className="mb-3 mt-6 text-xl font-semibold">3. Prohibited Uses</h2>
				<p className="mb-4 text-gray-300">
					You may not use our app in any way that breaches any applicable local, national, or international
					law or regulation, or in any way that is unlawful or fraudulent, or has any unlawful or fraudulent
					purpose or effect.
				</p>
			</section>
			<section>
				<h2 className="mb-3 mt-6 text-xl font-semibold">4. Termination</h2>
				<p className="mb-4 text-gray-300">
					We may terminate or suspend access to our app immediately, without prior notice or liability, for
					any reason whatsoever, including, without limitation, if you breach the Terms.
				</p>
			</section>
			<section>
				<h2 className="mb-3 mt-6 text-xl font-semibold">5. Changes to Terms</h2>
				<p className="mb-4 text-gray-300">
					We reserve the right, at our sole discretion, to modify or replace these Terms at any time. It is
					your responsibility to check these Terms periodically for changes.
				</p>
			</section>
			<section>
				<h2 className="mb-3 mt-6 text-xl font-semibold">6. Contact Information</h2>
				<p className="mb-4 text-gray-300">If you have any questions about these Terms, please contact us.</p>
			</section>
		</div>
	);
};

export default TermsOfService;
