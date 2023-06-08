import type { ReactNode } from "react";

type IComposeProps = {
	children: ReactNode;
	components: Array<ReactNode>;
};

const Compose = (props: IComposeProps) => {
	const { components = [], children, ...rest } = props;

	return (
		// use reduceRight as reduce() but all the items will be reversed
		<>
			{components.reduceRight((acc: any, ProviderComponent: any, index: number) => {
				return (
					<ProviderComponent {...rest} key={index}>
						{acc}
					</ProviderComponent>
				);
			}, children)}
		</>
	);
};

export default Compose;
