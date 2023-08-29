import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import { useEffect } from "react";

import type { IRoleProvider } from "@/components/context/RoleProvider";
import type { IUserProvider } from "@/components/context/UserProvider";
import { Meta } from "@/components/layouts/Meta";

const AdminProvider = dynamic(() => import("@/components/context/compose/AdminProvider"), { ssr: false });

interface IMainProps extends IRoleProvider, IUserProvider {
	meta?: { title?: string; description?: string };
	children?: ReactNode;
}

const AdminPage = (props: IMainProps) => {
	const title = props.meta?.title || "";

	const router = useRouter();

	useEffect(() => {
		(async () => {
			const gaPage = (await import("@/plugins/tracking")).gaPage;
			const gaIds = (await import("@/plugins/tracking")).gaIds;
			try {
				if (gaIds?.length) {
					gaPage(router.asPath, title);
				}
			} catch (error) {
				console.error(`metname error`, error);
			}
		})();
		return () => {};
	}, []);

	return (
		<>
			<Meta title={title} description={props.meta?.description} />

			<SessionProvider>
				<AdminProvider {...props}>{props.children}</AdminProvider>
			</SessionProvider>
		</>
	);
};

export default AdminPage;
