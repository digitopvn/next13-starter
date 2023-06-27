module.exports = {
	"*.{js,jsx,ts,tsx}": ["eslint --fix", "eslint"],
	"**/*.ts?(x)": () => "npm run check-types",
	"*": () => "npm run check-secret",
	"*": () => "npm run format",
};
