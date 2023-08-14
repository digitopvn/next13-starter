// The easiest solution to mock `next/navigation`: https://github.com/vercel/next.js/issues/7479
export const useRouter = () => {
	return {
		basePath: ".",
	};
};
