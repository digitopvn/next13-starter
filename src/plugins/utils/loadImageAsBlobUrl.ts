export default async function loadImageAsBlobUrl(imageUrl: string) {
	try {
		const response = await fetch(imageUrl);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const imageBlob = await response.blob();
		const blobUrl = URL.createObjectURL(imageBlob);
		return blobUrl;
	} catch (e) {
		console.error(e);
		return null;
	}
}
