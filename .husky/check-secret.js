const { exec } = require("child_process");
const { detectPrivateKeyByFilePath } = require("diginext-utils/dist/file/detectPrivateKeyByFilePath");

async function runCommand(command, cb, fnError, fnStdout, fnStderr) {
	(async () => {
		const chalk = (await import("chalk")).default;

		return new Promise((resolve, reject) => {
			console.log(command);

			exec(command, (error, stdout, stderr) => {
				if (error) {
					console.log(chalk.red(`error: ${error.message}`));
					if (fnError) fnError(error);
					resolve(false);
					return;
				}
				if (stderr) {
					console.log(chalk.red(`stderr: ${stderr}`));
					if (fnStderr) fnError(fnStderr);
					resolve(false);
					return;
				}

				if (stdout) {
					console.log(chalk.cyan(`stdout: ${stdout}`));
					if (fnStdout) fnError(fnStdout);
				}

				stdout = stdout || "";
				if (cb) cb(stdout);
				resolve(stdout);
			});
		});
	})();
}

function run(command) {
	return new Promise((resolve, reject) => {
		runCommand(command, async function (e) {
			resolve(e);
		});
	});
}

const getFileChanged = async (params) => {
	return await run("git diff --cached --name-only");
};

const checkPrivateKey = async (params) => {
	const list = await getFileChanged();

	const arr = `${list}`.split("\n").filter((x) => x);

	let result = true;

	const _gitPath = (await run("git rev-parse --show-toplevel"))
		//
		.split("\n")
		.filter((x) => x)[0];

	const _list = [];

	for (let i = 0; i < arr.length; i++) {
		const _path = arr[i];

		if (detectPrivateKeyByFilePath(`${_gitPath}/${_path}`)) {
		} else {
			_list.push(_path);
			result = false;
		}
	}

	return {
		status: result,
		list: _list,
	};
};

(async () => {
	const result = await checkPrivateKey();

	if (result.status) {
	} else {
		throw new Error(
			`FOUND PRIVATE KEY OR SECRET IN ENV, PLEASE IGNORE THEM BEFORE PUSH TO GIT!\n\n${JSON.stringify(
				result
			)}\n\n`
		);
	}
})();
