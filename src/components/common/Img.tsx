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

function getImageDimensions(file: string): Promise<{ width: number; height: number }> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve({ width: img.width, height: img.height });
		img.onerror = reject;
		img.src = file;
	});
}

async function fetchImage(src: string): Promise<ImageData> {
	if (CACHED[src]) {
		return CACHED[src] as ImageData;
	}

	const blobUrl = await loadImageAsBlobUrl(src);
	if (!blobUrl) throw new Error("Failed to load image");

	const dimensions = await getImageDimensions(blobUrl);
	const imageData = { img: blobUrl, ...dimensions };

	CACHED[src] = imageData;
	return imageData;
}

const Img: React.FC<ImgHTMLAttributes<HTMLImageElement>> = ({ src, ...props }) => {
	const [imgSrc, setImgSrc] = useState(asset("/assets/images-webp/logo-icon.svg"));
	const [width, setWidth] = useState(64);
	const [height, setHeight] = useState(64);

	useEffect(() => {
		if (!src) return;

		setImgSrc(asset("/assets/images-webp/logo-icon.svg"));
		setWidth(64);
		setHeight(64);

		fetchImage(src)
			.then(({ img, width: _width, height: _height }) => {
				setImgSrc(img);
				setWidth(_width);
				setHeight(_height);
			})
			.catch(console.error); // Add better error handling as needed
	}, [src]);

	return imgSrc ? (
		<>
			<style jsx>{`
				img {
					object-fit: contain;
				}
			`}</style>
			<img alt="" width={width} height={height} {...props} src={imgSrc} />
		</>
	) : null;
};

export default Img;
