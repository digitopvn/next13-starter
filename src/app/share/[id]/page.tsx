import { AppConfig } from "@/modules/config/AppConfig";

export const metadata = {
	title: AppConfig.title,
	description: AppConfig.description,
};

// src/app/share/[id]/pages.tsx
export default function Page() {
	return <h1>Hello, Home page!</h1>;
}

// // or Dynamic metadata
// export async function generateMetadata({}) {
// 	return {
// 		title: "...",
// 	};
// }
