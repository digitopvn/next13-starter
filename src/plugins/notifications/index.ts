/* eslint-disable import/no-extraneous-dependencies */
const showSuccess = async (message: any) => {
	const { success } = (await import("antd")).notification;
	success({
		message,
	});
};

const showError = async (message: any) => {
	const { error } = (await import("antd")).notification;
	error({
		message,
	});
};

const showInfo = async (message: any) => {
	const { info } = (await import("antd")).notification;
	info({
		message,
	});
};

const showNotifications = (messages: Array<any>, isError?: boolean) => {
	if (isError) {
		messages.forEach((message) => {
			showError(message);
		});
	} else {
		messages.forEach((message) => {
			showSuccess(message);
		});
	}
};

export { showError, showInfo, showNotifications, showSuccess };
