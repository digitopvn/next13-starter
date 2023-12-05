import { toBool } from "diginext-utils/dist/object";
import { createContext, memo, useContext } from "react";

import { useUser } from "@/components/context/UserProvider";
import { env } from "@/env.mjs";
import { api } from "@/plugins/trpc/api";

export const DebugAuthContext = createContext(undefined);

const DebugAuthProvider = ({ children, ...props }: any) => {
	//

	const { status } = useUser();

	const { data } = api.user.getProfile.useQuery(
		undefined, // no input
		{ enabled: status == "authenticated" }
	);

	if (!toBool(env.NEXT_PUBLIC_DEBUG)) return <> {children}</>;

	return (
		<DebugAuthContext.Provider value={{}} {...props}>
			{/* // */}
			{children}
			<pre className=" bottom-0 h-[300px] w-[500px] whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
		</DebugAuthContext.Provider>
	);
};

export default memo(DebugAuthProvider);

export const useDebugAuth = (props = {}) => {
	return useContext(DebugAuthContext);
};
