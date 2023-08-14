import { QRCode } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";

import { AppConfig } from "@/modules/config/AppConfig";
import asset from "@/plugins/asset";

const QrUrl = () => {
	const router = useRouter();

	const [url, setUrl] = useState("");

	const main = useMemo(() => {
		switch (url) {
			case "":
				return <></>;

			default:
				return (
					<QRCode
						//
						value={url || "-"}
						size={400}
						color={"#ffffff"}
						icon={asset("/assets/images/logo-icon.svg")}
						iconSize={80}
					/>
				);

				break;
		}
		return <></>;
	}, [url]);

	useEffect(() => {
		(async () => {
			const __url = AppConfig.getBaseUrl(router.asPath);

			setUrl(__url);
		})();

		return () => {};
	}, []);

	return <>{main}</>;
};

export default QrUrl;
