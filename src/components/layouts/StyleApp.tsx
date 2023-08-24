// import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";
import React from "react";

import GlobalStyle from "@/styles/GlobalStyle";

interface IStyleApp {
	children?: ReactNode;
}

const StyleApp = (props: IStyleApp) => {
	//

	return (
		<>
			<GlobalStyle />

			<main className="content">{props.children}</main>
		</>
	);
};

export default StyleApp;
