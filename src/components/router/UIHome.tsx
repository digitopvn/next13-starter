import type { ReactNode } from "react";
import React, { useEffect, useState } from "react";

interface IUIHome {
	children?: ReactNode;
}

const UIHome = (props: IUIHome) => {
	return <>{props.children}</>;
};

export default UIHome;
