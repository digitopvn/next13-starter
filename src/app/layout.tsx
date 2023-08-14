import "@/modules/config/configProduction";
console.log(1);
import type { Metadata } from "next";
import { Suspense } from "react";

import { AppConfig } from "@/modules/config/AppConfig";
import { fbPixelIds, gaIds, gtmIds } from "@/plugins/tracking";

export const metadata: Metadata = {
	title: AppConfig.title,
	description: AppConfig.description,
	openGraph: {
		title: AppConfig.title,
		description: AppConfig.description,
		locale: AppConfig.locale,
		images: [`/api/og?title=${AppConfig.title}`],
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang={AppConfig.locale}>
			<head>
				{process.env.NEXT_PUBLIC_FB_APP_ID && (
					<meta property="fb:app_id" content={process.env.NEXT_PUBLIC_FB_APP_ID} />
				)}
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
				<link rel="apple-touch-icon" href={`${AppConfig.getBasePath("/apple-touch-icon.png")}`} />
				<link rel="apple-touch-startup-image" href={`${AppConfig.getBasePath("/apple-touch-icon.png")}`} />
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

				{/* // gtag */}
				{gaIds?.length ? (
					<>
						<script
							async
							id="googletagmanager"
							src={`https://www.googletagmanager.com/gtag/js?id=${gaIds[0]}`}
						/>
						<script
							id="gtag-init"
							async
							dangerouslySetInnerHTML={{
								__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            ${gaIds
				.map((id: string) => {
					return `gtag('config', '${id}');`;
				})
				.join("\n")}
          `,
							}}
						/>
					</>
				) : (
					<></>
				)}

				{/* gtm */}
				{gtmIds?.length ? (
					<>
						{gtmIds.map((id: string, index: number) => {
							return (
								// eslint-disable-next-line @next/next/next-script-for-ga
								<script
									key={index}
									dangerouslySetInnerHTML={{
										__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${id}');`,
									}}
								></script>
							);
						})}
					</>
				) : (
					<></>
				)}

				{/* fb pixel */}
				{fbPixelIds?.length ? (
					<>
						<script
							id="fb-pixel"
							dangerouslySetInnerHTML={{
								__html: `
                            !function(f,b,e,v,n,t,s)
                            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                            n.queue=[];t=b.createElement(e);t.async=!0;
                            t.src=v;s=b.getElementsByTagName(e)[0];
                            s.parentNode.insertBefore(t,s)}(window, document,'script',
                            'https://connect.facebook.net/en_US/fbevents.js');
                            ${fbPixelIds
								.map((id: string) => {
									return `fbq('init', '${id}');`;
								})
								.join("\n")}
                            fbq('track', 'PageView');
          `,
							}}
						/>
					</>
				) : (
					<></>
				)}
			</head>

			<body>
				{/* gtm */}
				{gtmIds?.length ? (
					<>
						{gtmIds.map((id: string, index: number) => {
							return (
								<noscript
									key={index}
									dangerouslySetInnerHTML={{
										__html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${id}"
                        height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
									}}
								></noscript>
							);
						})}
					</>
				) : (
					<></>
				)}

				{/* fb pixel */}
				{fbPixelIds?.length ? (
					<>
						{fbPixelIds.map((id: string, index: number) => {
							return (
								<noscript
									key={index}
									dangerouslySetInnerHTML={{
										__html: `<img height="1" width="1" style="display:none"
                                    src="https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1"
                                    />`,
									}}
								></noscript>
							);
						})}
					</>
				) : (
					<></>
				)}

				<Suspense fallback={null}>{children}</Suspense>
			</body>
		</html>
	);
}
