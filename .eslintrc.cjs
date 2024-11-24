module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react-hooks/recommended",
		"plugin:react/recommended"
	],
	ignorePatterns: ["dist", ".eslintrc.cjs", "*.d.ts"],
	parser: "@typescript-eslint/parser",
	
	plugins: ["react-refresh"],
	rules: {
		"react-refresh/only-export-components": [
			"warn",
			{ allowConstantExport: true },
      
		],

		"react-hooks/rules-of-hooks": "off",
		"react-refresh/only-export-components": "off",
		"react-hooks/exhaustive-deps": "off",
		"readonly": "off",
		"react/react-in-jsx-scope": "off",
    	"@typescript-eslint/no-unused-vars": "off",
		"@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/no-namespace": "off",
		"no-mixed-spaces-and-tabs": "off",
		"indent": ["error", "tab", { "ignoredNodes": ["PropertyDefinition"] }],
		"quotes": ["error", "double"],
		"semi": [1, "always"],
		"@typescript-eslint/member-delimiter-style": [
            "warn",
            {
                "multiline": {
                    "delimiter": "semi",
                    "requireLast": true
                },
                "singleline": {
                    "delimiter": "semi",
                    "requireLast": false
                }
            }
        ]
	},

	globals: {
		"React": "writable"
	}
};
