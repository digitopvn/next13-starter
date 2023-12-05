import { LoadingOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { createContext, memo, useContext, useMemo } from "react";

import { useStorage } from "@/components/context/StorageProvider";

export const LoadingGateContext = createContext<null>(null);

const LoadingGateProvider = ({ children, ...props }: any) => {
	//
	const { isLoading } = useStorage();

	const loader = useMemo(() => {
		if (isLoading)
			return (
				<>
					<style global jsx>{`
						.gate-loader .ant-modal-content {
							background: none;
						}
					`}</style>

					<Modal
						className="gate-loader"
						open={true}
						centered={true}
						closable={false}
						mask={true}
						style={{
							background: "none",
						}}
						width={0}
						maskClosable={false}
						footer={null}
						title=""
						modalRender={() => {
							return (
								<div className="fixedCenter z-[10000] ">
									<LoadingOutlined style={{ fontSize: 48, color: "#525736" }} spin />
								</div>
							);
						}}
					/>
				</>
			);

		return <></>;
	}, [isLoading]);

	return (
		<LoadingGateContext.Provider value={{}} {...props}>
			{children}
			{loader}
		</LoadingGateContext.Provider>
	);
};

export default memo(LoadingGateProvider);

export const useLoadingGate = () => {
	return useContext(LoadingGateContext);
};
