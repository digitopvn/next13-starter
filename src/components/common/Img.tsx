import type { ImgHTMLAttributes } from "react";
import React, { useEffect, useState } from "react";

import asset from "@/plugins/asset";
import loadImageAsBlobUrl from "@/plugins/utils/loadImageAsBlobUrl";

interface ImageData {
	img: string;
	width: number;
	height: number;
}

const CACHED: Record<string, ImageData> = {};

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
		setImgSrc(asset("/assets/images-webp/logo-icon.svg"));
		setWidth(64);
		setHeight(64);

		(async () => {
			if (!src) return;

			if (CACHED[src]) {
				const cache = CACHED[src];
				if (cache) {
					setImgSrc(cache.img);
					setWidth(cache.width);
					setHeight(cache.height);
					return;
				}
			}

			const res = await loadImageAsBlobUrl(src);
			if (res) {
				setImgSrc(res);

				(async () => {
					const dimensions = await getImageDimensions(res);
					if (dimensions) {
						setWidth(dimensions.width);
						setHeight(dimensions.height);
					}

					CACHED[src] = {
						img: res,
						width: dimensions.width,
						height: dimensions.height,
					};
				})();

				return;
			}
		})();
	}, [src]);

	return (
		<>
			{imgSrc ? (
				<>
					<style jsx>{`
						img {
							object-fit: contain;
						}
					`}</style>

					<img alt="" width={width} height={height} {...props} src={imgSrc} />
				</>
			) : (
				<></>
			)}
		</>
	);
};

export default Img;
