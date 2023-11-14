export const showDialog = (id: string) => {
	if (!document?.getElementById(id)) return;

	const div = document?.getElementById(id) as HTMLDialogElement;
	if (!div) return;

	div.showModal?.();
};

export const hideDialog = (id: string) => {
	if (!document?.getElementById(id)) return;

	(document?.getElementById(id) as HTMLDialogElement)?.close?.();

	const div = document?.getElementById(id) as HTMLDialogElement;
	if (!div) return;

	div.close?.();
};
