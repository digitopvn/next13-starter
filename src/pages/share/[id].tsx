/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/naming-convention */
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Meta from "@/components/layouts/Meta";

const sharePage = (props: any) => {
	const router = useRouter();

	useEffect(() => {
		//
		router.push("/");

		return () => {
			// cleanup
		};
	}, []);

	return (
		<>
			<style global jsx>{`
				html,
				body {
					background-color: black;
					color: white;
				}
			`}</style>

			<Meta image={props?.image} title={null}></Meta>
		</>
	);
};

export default sharePage;

export async function getServerSideProps({ req, res, query }: any) {
	res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");

	const { id } = query;

	const ApiCall = (await import("@/plugins/api-call/ApiCall")).default;
	const _res = await ApiCall({
		path: `/api/v1/auth/customers/thumb-share/${id}`,
		data: id,
		contentType: "json",
	});

	if (_res.status) {
		const { id: id2, image } = _res.data;
		return {
			props: { id: id2, image },
		};
	}
	return {
		props: {},
	};
}
