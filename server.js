const next = require("next");
const express = require("express");
const http = require("http");
const cors = require("cors");
// const https = require("https");
// const dev = process.env.NODE_ENV !== "production";
const dotenv = require("dotenv").config({ path: ".env" });
const __env = dotenv.parsed ? dotenv.parsed : {};

const app = next({ dev: false });
const handle = app.getRequestHandler();
const server = express();
const httpPort = __env.PORT || 3000;

// const httpsPort = 3443;
// const options = dev
// 	? {
// 			/**
// 			 * IF YOU NEED HTTPS FOR LOCALHOST, UNCOMMENT THIS
// 			 * AND GENERATE THE key & crt FOLLOW THIS COMMAND:
// 			 * bash local_certificate/cer.sh
// 			 * Read more: local_certificate/readme.md
// 			 */
// 			// key: fs.readFileSync("local_certificate/localhost.key"),
// 			// cert: fs.readFileSync("local_certificate/localhost.crt"),
// 	  }
// 	: {};

// enable body parser
// server.use(express.urlencoded({ extended: true }));
// server.use(express.json());
// server.use(bodyParser.json({ limit: '10mb' })); // Use this after the variable declaration
// server.use(cors()); // Use this after the variable declaration

server.use(express.static(`${__dirname}/public`, { maxAge: "365d", redirect: false }));
server.use(express.static(`${__dirname}/.next/static`, { maxAge: "365d", redirect: false }));
server.use(express.static(`${__dirname}/_next/static`, { maxAge: "365d", redirect: false }));
app.prepare().then(() => {
	server.all("*", (req, res) => {
		return handle(req, res);
	});

	http.createServer(server).listen(httpPort);

	// initPrisma();
});

const initPrisma = async () => {
	try {
		await new Promise((resolve, reject) => {
			setTimeout(resolve, 1000);
		});

		const { exec } = require("child_process");
		exec("npm run prisma:push", (error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`);
			}
			console.log(`Output: ${stdout}`);
			if (stderr) {
				console.error(`stderr: ${stderr}`);
			}

			import("./prisma/seed.mjs")
				.then((seed) => {
					// if you're exporting something from seed.mjs, you can access it with seed.default or seed.exportedFunctionOrVariable
				})
				.catch((error) => {
					console.error("Error importing seed script:", error);
				});
		});
	} catch (error) {
		console.error(`npm run prisma:push error`, error);
	}
};
