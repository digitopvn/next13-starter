import type { ReactNode } from "react";
import React, { useEffect, useState } from "react";

interface IUIHome {
	children?: ReactNode;
}

const UIHome = (props: IUIHome) => {
	return (
		<div className="p-8">
			<h1 className="text-2xl">👋 Hello, World!</h1>
			{props.children}
		</div>
	);
};

UIHome.propTypes = {};

export default UIHome;
