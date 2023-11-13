import getAllFiles from "diginext-utils/dist/file/getAllFiles";
import path from "path";

export default function handler(req: Request, res: any) {
	if (req.method === "GET") {
		let ROOT_DIR_ECO = "src/pages";

		let files = getAllFiles(ROOT_DIR_ECO)
			.filter(
				(x) =>
					![
						//
						"pages/_app.tsx",
						"pages/_document.tsx",
						"pages/api",
						"pages/index.tsx",
					].find((k) => x.indexOf(k) >= 0)
			)
			.map((x) => x.replace(".tsx", "").replace(".ts", "").replace("src/pages/", "/").replace("/index", ""));

		if (process.env.NODE_ENV == "production") {
			ROOT_DIR_ECO = path.join(process.cwd(), ".next", "server", "pages");

			files = getAllFiles(ROOT_DIR_ECO)
				.filter(
					(x) =>
						![
							//
							"pages/_app",
							"pages/_document",
							"pages/api",
							"pages/index",
						].find((k) => x.indexOf(k) >= 0)
				)
				.filter((x) => [".html"].find((k) => x.indexOf(k) >= 0))
				.map((x) =>
					x
						//
						.replace(".tsx", "")
						.replace(".ts", "")
						.replace(".html", "")
						.replace("src/pages/", "/")
						.replace("/index", "")
						.replace(path.join(process.cwd(), ".next", "server", "pages"), "")
				);
		}

		return res.status(200).json({
			statusCode: 200,
			status: true,
			data: { listPage: files },
		});
		// Process a GET request
	} else {
		// Handle any other HTTP method
	}

	return res.status(400).json({
		status: false,
	});
}
