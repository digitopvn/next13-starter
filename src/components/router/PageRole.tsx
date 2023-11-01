import { useRouter } from "next/router";
import type { ReactNode } from "react";
import React, { useEffect, useState } from "react";

import { useStorage } from "@/components/context/StorageProvider";
import { useUser } from "@/components/context/UserProvider";
import RolesList from "@/components/roles/RolesList";
import { api } from "@/plugins/trpc/api";

interface IPageRole {
	children?: ReactNode;
}

const PageRole = (props: IPageRole) => {
	const router = useRouter();
	const { user } = useStorage();

	return (
		<>
			<RolesList userId={user?.id || ""} />
			<button
				className="btnMain"
				onClick={() => {
					router.push("/examples/role/test-role-viewer");
				}}
			>
				Đi tới page dành cho Viewer | Serverside Check
			</button>
			<button
				className="btnMain"
				onClick={() => {
					router.push("/examples/role/test-role-admin");
				}}
			>
				Đi tới page dành cho Admin | Serverside Check
			</button>
			<br />
			<br />
			--
			<br />
			<br />
			<button
				className="btnMain"
				onClick={() => {
					router.push("/examples/role/test-role-admin-use-provider");
				}}
			>
				Đi tới page dành cho Admin | Nhưng Clientside Check
			</button>
			<button
				className="btnMain"
				onClick={() => {
					router.push("/examples/role/test-role-viewer-use-provider");
				}}
			>
				Đi tới page dành cho Viewer | Nhưng Clientside Check
			</button>
			{/* role/test-role-admin-use-provider */}
			{props.children}
		</>
	);
};

export default PageRole;
