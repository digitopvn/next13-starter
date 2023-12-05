import { useRouter } from "next/router";

import ApiCall from "@/plugins/api-call/ApiCall";

export default function Home({ listPage = [], ...props }) {
	const router = useRouter();

	if (listPage?.length == 0) return <>fetch list of pages error</>;

	return (
		<>
			<div className="holder flex h-full flex-col items-center justify-center gap-2 p-4 dark:text-white">
				<h1 className="title">list of pages:</h1>

				{listPage?.map((item, index) => {
					return (
						<button
							key={index}
							onClick={(params) => {
								router.push(`${item}`);
							}}
							className="btn btn-secondary  lowercase"
						>
							<p className="2xl">{item}</p>
						</button>
					);
				})}
			</div>
		</>
	);
}

export async function getServerSideProps() {
	const res = await ApiCall({
		method: "GET",
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/fetchPages`,
	});

	if (res.data) {
		const { listPage } = res.data;
		return {
			props: { listPage },
		};
	}

	return {
		props: {}, // will be passed to the page component as props
	};
}
