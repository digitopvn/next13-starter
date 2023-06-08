export default function handleError(params: any) {
	//
	return {
		ok: false,
		status: false,
		error: true,
		...params,
	};
}
