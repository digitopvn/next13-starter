/* eslint-disable class-methods-use-this */
import Document, { Head, Html, Main, NextScript } from "next/document";

import { AppConfig } from "@/modules/config/AppConfig";
import { fbPixelIds, gaIds, gtmIds } from "@/plugins/tracking";

class MyDocument extends Document {
	render() {
		return (
			<Html lang={AppConfig.locale}>
				<Head>
					{/* // gtag */}
					{gaIds?.length ? (
						<>
							<script defer id="googletagmanager" src={`https://www.googletagmanager.com/gtag/js?id=${gaIds[0]}`} />
							<script
								id="gtag-init"
								defer
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
				</Head>
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

					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
