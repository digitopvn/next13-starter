module.exports = {
	"*.{js,jsx,ts,tsx}": ["eslint --fix", "eslint"],
	"**/*.ts?(x)": () => "npm run check-types",
	"**/*": () => "npm run check-secret",
	"*.{json,yaml}": ["prettier --write"],
};
