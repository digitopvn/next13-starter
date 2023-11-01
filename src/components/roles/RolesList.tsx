import React, { useEffect, useState } from "react";

import RoleToggle from "@/components/roles/RoleToggle";
import { api } from "@/plugins/trpc/api";

const RolesList: React.FC<{ userId: string }> = ({ userId }) => {
	const {
		data: roles,
		isLoading: isQueryLoading,
		isError,
		error,
	} = api.role.getAll.useQuery(
		undefined // no input
	);

	const { data: userRoles, refetch } = api.user.getRole.useQuery(
		undefined // no input
	);

	const [activeRoles, setActiveRoles] = useState<string[]>(userRoles?.map((x) => x.id) || []);

	const handleToggle = (roleId: string) => {
		setActiveRoles((prevRoles) =>
			prevRoles.includes(roleId) ? prevRoles.filter((id) => id !== roleId) : [...prevRoles, roleId]
		);

		refetch();
	};

	useEffect(() => {
		if (userRoles) setActiveRoles(userRoles?.map((x) => x.id) || []);
	}, [userRoles]);

	return (
		<div className="mt-5 space-y-2">
			{roles?.map((role) => (
				<RoleToggle
					key={role.id}
					role={role}
					userId={userId}
					isActive={activeRoles.includes(role.id)}
					onToggle={handleToggle}
				/>
			))}
		</div>
	);
};

export default RolesList;
