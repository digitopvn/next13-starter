/* eslint-disable @typescript-eslint/naming-convention */
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

// const class = dynamic(() => import('url'), {ssr:false});

// src/pages/term-policy/facebook/user-delete-data.tsx
const user_delete_data = () => {
	return (
		<>
			<div className="data-deletion-container mx-auto mt-8 max-w-3xl rounded-lg bg-gray-900 p-8 text-gray-200 shadow-lg">
				<h2 className="my-4 text-xl font-semibold">User Data Deletion</h2>
				<p className="mb-4">
					If you wish to delete your data and remove your account, we provide a simple and straightforward way
					for users to request the deletion of their data directly within the application. Follow the steps
					below to delete the data associated with your Facebook login:
				</p>
				<ol className="list-decimal pl-5">
					<li className="mb-2">Navigate to the settings page within our application.</li>
					<li className="mb-2">Locate the &apos;Delete Account&apos; section.</li>
					<li className="mb-2">Follow the instructions to submit a data deletion request.</li>
				</ol>
				<p className="mb-4">
					Upon receiving a deletion request, we will ensure that all your data is removed from our records
					within a reasonable timeframe in accordance with our data retention policy and applicable laws and
					regulations.
				</p>
				<p className="mb-4">
					If you have used Facebook to log into our application, you may also remove our app&apos;s access to
					your Facebook data via the Facebook App Settings page.
				</p>
				<p className="mb-4">
					For more information or assistance with data deletion, please contact our support team at
					hello@wearetopgroup.com.
				</p>
			</div>
		</>
	);
};

export default user_delete_data;
