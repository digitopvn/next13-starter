// import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";
import React from "react";

interface IStyleCms {
	children?: ReactNode;
}

const StyleCms = (props: IStyleCms) => {
	//

	return (
		<>
			<main className="content">{props.children}</main>
		</>
	);
};

export default StyleCms;
