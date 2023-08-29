/* eslint-disable import/extensions */
import React from "react";

import ApiProvider from "@/components/context/ApiProvider";
import Compose from "@/components/context/compose/Compose";
import ListenerProvider from "@/components/context/ListenerProvider";
import LoadingGateProvider from "@/components/context/LoadingGate";
import MainProvider from "@/components/context/MainProvider";
import RoleProvider from "@/components/context/RoleProvider";
import StorageProvider from "@/components/context/StorageProvider";
import UserProvider from "@/components/context/UserProvider";

// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import { persistor, store } from "@/modules/redux/store";

const AdminProvider = (props: any) => {
	return (
		<Compose
			components={[
				//
				// Provider,
				// PersistGate,
				StorageProvider,
				ApiProvider,
				LoadingGateProvider,
				UserProvider,
				RoleProvider,
			]}
			// store={store}
			// persistor={persistor}
			// loading={null}
			{...props}
		></Compose>
	);
};

export default AdminProvider;
