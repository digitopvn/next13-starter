/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
const next = require("next");
const express = require("express");
const http = require("http");
const https = require("https");
const fs = require("fs");
const cors = require("cors");
const { toBool } = require("diginext-utils/dist/object");
const dotenv = require("dotenv").config({ path: ".env" });

const __env = dotenv.parsed ? dotenv.parsed : {};
const basePath = __env.NEXT_PUBLIC_BASE_PATH || "";
const dev = __env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();
// const bodyParser = require('body-parser');
let httpPort = __env.PORT || 3000;
let httpsPort = __env.HTTPS_PORT || 3443;

const useHTTPS = toBool(__env.USE_HTTPS) || false;

const options = useHTTPS
	? {
			/**
			 * IF YOU NEED HTTPS FOR LOCALHOST, UNCOMMENT THIS
			 * AND GENERATE THE key & crt FOLLOW THIS COMMAND:
			 * bash local_certificate/cer.sh
			 * Read more: local_certificate/readme.md
			 */
			key: fs.readFileSync("local_certificate/sap-canvas-maker.zii.vn.key"),
			cert: fs.readFileSync("local_certificate/sap-canvas-maker.zii.vn.crt"),

			// key: fs.readFileSync("local_certificate/localhost.key"),
			// cert: fs.readFileSync("local_certificate/localhost.crt"),
	  }
	: {};

// enable body parser
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
// server.use(bodyParser.json({ limit: '10mb' })); // Use this after the variable declaration
server.use(cors()); // Use this after the variable declaration

async function openWeb(url) {
	try {
		const start = process.platform === "darwin" ? "open" : process.platform === "win32" ? "start" : "xdg-open";
		require("child_process").exec(`${start} ${url}`);
	} catch (error) {
		console.error(`openWeb error`, error);
	}
}

async function openLocal() {
	const { networkInterfaces } = require("os");
	const nets = networkInterfaces();
	let ip = "localhost";

	for (const name of Object.keys(nets)) {
		for (const net of nets[name]) {
			// Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
			if (net.family === "IPv4" && !net.internal) {
				console.log("net.address", net.address);
				if (net.address.indexOf("192.168.") >= 0) {
					ip = net.address;
					break;
				}
			}
		}
		if (ip !== "localhost") break;
	}

	const urlHttp = `http://${ip}:${httpPort}/${basePath}`;

	openWeb(urlHttp);

	const chalk = (await import("chalk")).default;
	console.log(chalk.whiteBright("SERVER IS LISTEN ON:"));
	console.group();
	console.log(chalk.greenBright(urlHttp));

	if (useHTTPS) {
		const urlHttps = `https://${ip}:${httpsPort}/${basePath}`;
		console.log(chalk.yellowBright(urlHttps));
	}
	console.groupEnd();
}

function findPortAvaiable(port, fn) {
	const net = require("net");

	return new Promise((resolve, reject) => {
		const tester = net
			.createServer()
			.once("error", async function (err) {
				// if (err.code != 'EADDRINUSE') resolve(false);
				port++;
				resolve(await findPortAvaiable(port));
			})
			.once("listening", () => {
				tester
					.once("close", () => {
						resolve(port);
						// fn(null, false);
					})
					.close();
			})
			.listen(port);
	});
}

function startServer() {
	app.prepare().then(() => {
		server.all("*", (req, res) => {
			return handle(req, res);
		});
		http.createServer(server).listen(httpPort);
		if (useHTTPS) https.createServer(options, server).listen(httpsPort);

		if (dev) {
			openLocal();
		}
		//
	});
}

async function init() {
	if (!dev) {
		startServer();
		return;
	}
	httpPort = await findPortAvaiable(httpPort);
	if (useHTTPS) httpsPort = await findPortAvaiable(httpsPort);

	startServer();
}

init();
