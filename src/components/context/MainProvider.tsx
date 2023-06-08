/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useContext, useEffect, useRef, useState } from "react";

type MainContextType = {};

export const MainContext = React.createContext<MainContextType | null>(null);

interface Props {
	isPrivate?: boolean;
	children?: React.ReactNode;
}

const MainProvider: React.FC<Props> = ({ children, isPrivate }) => {
	useEffect(() => {
		// effect

		return () => {};
	}, []);

	return <MainContext.Provider value={{}}>{children}</MainContext.Provider>;
};

export default MainProvider;

export const useMain = () => {
	const context = useContext(MainContext);
	if (!context) {
		throw new Error("useMain has to be used within <MainContext.Provider>");
	}
	return context;
};
