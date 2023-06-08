import { useEventEmitter } from "ahooks";
import type { ReactNode } from "react";
import { createContext, useContext } from "react";

interface IListenerContext {
	[x: string]: any;
}

export const ListenerContext = createContext<IListenerContext | null>(null);

type IListenerProviderProps = { children: ReactNode };
const ListenerProvider = (props: IListenerProviderProps) => {
	const listener = useEventEmitter<undefined>();

	return <ListenerContext.Provider value={listener}>{props.children}</ListenerContext.Provider>;
};

export default ListenerProvider;

export const useListener = () => {
	const context = useContext(ListenerContext);
	if (!context) {
		throw new Error("useListener has to be used within <ListenerContext.Provider>");
	}

	return context;
};
