import { useMutation } from "@tanstack/react-query";
import React from "react";

import { api } from "@/plugins/trpc/api";

type RoleToggleProps = {
	role: { id: string; name: string };
	userId: string;
	isActive: boolean;
	onToggle: (roleId: string) => void;
};

const RoleToggle: React.FC<RoleToggleProps> = ({ role, userId, isActive, onToggle }) => {
	const updateRoleMutation = api.user.updateRole.useMutation();

	return (
		<div
			className="flex items-center space-x-3 rounded p-2 hover:bg-gray-100"
			onClick={async () => {
				// mutation.mutate();
				await updateRoleMutation.mutateAsync({
					newRoleId: role.id,
				});

				onToggle(role.id);
			}}
		>
			<div className={`h-5 w-5 border ${isActive ? "bg-blue-500" : "bg-white"}`}></div>
			<span className="font-semibold">{role.name}</span>
		</div>
	);
};

export default RoleToggle;
