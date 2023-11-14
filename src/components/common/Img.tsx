import type { ImgHTMLAttributes } from "react";
import React, { useEffect, useState } from "react";

import asset from "@/plugins/asset";
import loadImageAsBlobUrl from "@/plugins/utils/loadImageAsBlobUrl";

function getImageDimensions(file): Promise<{ width: number; height: number }> {
	return new Promise((resolve, reject) => {
		const img = new Image();

		// Set up event listeners to return the dimensions
		img.onload = function () {
			resolve({
				width: img.width,
				height: img.height,
			});
		};

		img.onerror = reject;

		// Start loading the image
		img.src = file;
	});
}

const Img = ({ src, ...props }: ImgHTMLAttributes<HTMLImageElement>) => {
	const [imgSrc, setImgSrc] = useState(asset("/assets/images-webp/logo-icon.svg"));

	const [width, setWidth] = useState(64);
	const [height, setHeight] = useState(64);

	useEffect(() => {
		// effect

		(async () => {
			if (!src) return;
			const res = await loadImageAsBlobUrl(src);
			if (res) {
				setImgSrc(res);

				(async () => {
					const dimensions = await getImageDimensions(res);
					if (dimensions) {
						setWidth(dimensions.width);
						setHeight(dimensions.height);
					}
				})();
			}
		})();
	}, [src]);

	return <>{imgSrc ? <img alt="" width={width} height={height} {...props} src={imgSrc} /> : <></>}</>;
};

export default Img;
