"use client";

import Head from "next/head";
import { usePathname } from "next/navigation";
import { NextSeo } from "next-seo";

import { AppConfig } from "@/modules/config/AppConfig";

type IMetaProps = {
	title?: string | null | undefined;
	description?: string;
	canonical?: string;
	image?: string;
};

const Meta = (props: IMetaProps) => {
	const pathname = usePathname();

	const title = `${AppConfig.title}${
		props.hasOwnProperty("title") ? `${props.title ? ` | ${props.title}` : ``}` : " | Trang chủ"
	}`;
	const description = `${props.description || AppConfig.description}`;
	const image = `${props.image || AppConfig.getBasePath("/share.webp")}`;

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description}></meta>

				<meta charSet="UTF-8" key="charset" />

				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
				<meta property="og:url" content={AppConfig.getBasePath(pathname)} />
				<meta property="og:image" content={image} />
				<meta property="og:image:width" content="1200" />
				<meta property="og:image:height" content="630" />

				{process.env.NEXT_PUBLIC_FB_APP_ID && (
					<meta property="fb:app_id" content={process.env.NEXT_PUBLIC_FB_APP_ID} />
				)}

				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

				<link rel="apple-touch-icon" href="/images-webp/ios-test.webp" />
				<link rel="apple-touch-startup-image" href="/images-webp/ios-test.webp" />

				<link rel="shortcut icon" href={`${AppConfig.getBasePath("/favicon.ico")}`} />

				<link
					rel="shortcut apple-touch-icon"
					sizes="180x180"
					href={`${AppConfig.getBasePath("/apple-touch-icon.png")}`}
				/>
				<link
					rel="shortcut icon"
					type="image/webp"
					sizes="32x32"
					href={`${AppConfig.getBasePath("/favicon-32x32.webp")}`}
				/>
				<link
					rel="shortcut icon"
					type="image/webp"
					sizes="16x16"
					href={`${AppConfig.getBasePath("/favicon-16x16.webp")}`}
				/>

				<meta
					name="viewport"
					key="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
				/>
			</Head>

			<NextSeo
				title={title}
				description={description}
				canonical={props.canonical}
				openGraph={{
					title,
					description,
					url: props.canonical,
					locale: AppConfig.locale,
					site_name: AppConfig.site_name,
				}}
			/>
		</>
	);
};

export { Meta };

export default Meta;
