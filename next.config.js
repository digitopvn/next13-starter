/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");
const million = require("million/compiler");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

const transpilePackages = [
	//
	// "diginext-three",
	// "three",
];

const { version } = require("./package.json");

/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		dirs: ["*"],
	},
	publicRuntimeConfig: {
		version,
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

const millionConfig = {
	auto: true,
	// if you're using RSC:
	// auto: { rsc: true },
};

module.exports = million.next(withBundleAnalyzer(nextConfig), millionConfig);
