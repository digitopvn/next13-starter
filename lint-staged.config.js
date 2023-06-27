module.exports = {
	"**/*": () => "npm run check-secret",
	"*.{js,jsx,ts,tsx}": ["eslint --fix", "eslint"],
	"**/*.ts?(x)": () => "npm run check-types",
};
