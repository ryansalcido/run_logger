module.exports = {
	"env": {
		"browser": true,
		"es6": true,
		"node": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended"
	],
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 11,
		"sourceType": "module"
	},
	"plugins": ["react"],
	"settings": {
		"react": {
			"version": "detect"
		}
	},
	"rules": {
		"indent": ["error", "tab", { "SwitchCase": 1}],
		"quotes": ["error", "double"],
		"semi": ["error", "always"],
		"eol-last": ["error", "never"],
		"comma-dangle": ["error", "never"]
	}
};