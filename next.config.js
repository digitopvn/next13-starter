/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

const transpilePackages = [
	//
	// "diginext-three",
	// "three",
];

const { version, name } = require("./package.json");

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "*",
				port: "",
				pathname: "/**/**",
			},
		],
	},

	experimental: {
		forceSwcTransforms: true,
	},
	eslint: {
		dirs: ["*"],
	},
	publicRuntimeConfig: {
		version,
		name,
	},
	poweredByHeader: false,
	trailingSlash: true,
	basePath: "",

	reactStrictMode: false,
	output: "standalone",

	transpilePackages,

	webpack(config, { dev, isServer }) {
		config.module.rules.push({
			test: /\.svg$/i,
			exclude: [path.resolve("node_modules")],
			use: [
				{
					loader: "raw-loader",
					options: {
						esModule: false,
					},
				},
			],
		});

		return config;
	},
};

module.exports = withBundleAnalyzer(nextConfig);
