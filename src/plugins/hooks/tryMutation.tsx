import { showError, showSuccess } from "@/plugins/notifications";
import { api } from "@/plugins/trpc/api";

// Define the structure of the api object or import it if defined elsewhere
type ApiType = typeof api;

// Adjust this definition according to your real world scenario
type MutationResult<TData = any, TError = any> = {
	mutateAsync: (data: any) => Promise<TData | null>;
	isLoading: boolean;
	isError: boolean;
	error: TError | null;
	data: TData | null;
};

// Utilize TRPC types for `router` and `procedure`
export function tryMutation<TRouter extends keyof ApiType, TProcedure extends keyof ApiType[TRouter]>(
	router: TRouter,
	procedure: TProcedure
): MutationResult<any, any> {
	const mutation: any = (api[router] as any)[procedure]?.useMutation();

	const mutateAsync = async (data: any) => {
		try {
			const res = await mutation.mutateAsync(data);
			if (res) {
				showSuccess("Success!");
			}
			return res;
		} catch (error: any) {
			const errorMessage = error.message || "Something went wrong!";
			showError(errorMessage);
			console.error(`tryMutation error:`, error);
			return null;
		}
	};

	return {
		mutateAsync,
		isLoading: mutation.isLoading,
		isError: mutation.isError,
		error: mutation.error,
		data: mutation.data,
	};
}
