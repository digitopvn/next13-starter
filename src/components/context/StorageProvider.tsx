import { createContext, memo, useContext, useState } from "react";

import type { IUser } from "@/components/context/UserProvider";

interface IContext {
	token: any;
	setToken: (props: any) => void;
	user: IUser | null;
	setUser: (props: IUser | null) => void;

	isLoading: boolean;
	setIsLoading: (props: any) => void;

	isShowUpdate: boolean;
	setIsShowUpdate: (props: any) => void;

	isShowLogin: boolean;
	setIsShowLogin: (props: any) => void;

	isShowImages: boolean;
	setIsShowImages: (props: any) => void;

	srcImages: string;
	setSrcImages: (props: any) => void;
}

export const StorageContext = createContext<IContext | null>(null);

const StorageProvider = (props: any) => {
	//

	const [isShowUpdate, setIsShowUpdate] = useState(false);

	const [isShowImages, setIsShowImages] = useState(false);

	const [srcImages, setSrcImages] = useState("");

	const [isShowLogin, setIsShowLogin] = useState(false);

	const [token, setToken] = useState();
	const [user, setUser] = useState<IUser | null>({
		status: "loading",
	});

	const [isLoading, setIsLoading] = useState(false);

	return (
		<StorageContext.Provider
			value={{
				token,
				setToken,
				user,
				setUser,
				isLoading,
				setIsLoading,
				isShowUpdate,
				setIsShowUpdate,
				isShowLogin,
				setIsShowLogin,
				isShowImages,
				setIsShowImages,
				srcImages,
				setSrcImages,
			}}
			{...props}
		></StorageContext.Provider>
	);
};

export default memo(StorageProvider);

export const useStorage = () => {
	const context = useContext(StorageContext);
	if (!context) {
		throw new Error("useStorage has to be used within <StorageContext.Provider>");
	}
	return context;
};
