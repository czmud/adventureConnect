module.exports = {
	extends: ['airbnb-typescript-prettier'],
	plugins: ['import', 'prettier'],
	parserOptions: {
		tsconfigRootDir: __dirname,
		// project: ["./tsconfig.json"],
	},
	env: {
		node: true,
	},
	ignorePatterns: ['.eslintrc.js', '*.test.ts', 'client/**/*'],
	rules: {
		'prettier/prettier': 'error',
		'no-useless-constructor': 'off',
		'no-underscore-dangle': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'no-bitwise': 'off',
		'no-plusplus': 'off',
		'no-continue': 'off',
		'no-console': 'off',
		'no-param-reassign': 'off',
		'import/no-cycle': 'off',
		'import/prefer-default-export': 'off',
		'max-classes-per-file': 'off',
		'no-nested-ternary': 'off',
		'@typescript-eslint/interface-name-prefix': 'off',
		'import/no-unresolved': 'off', // eslint can't figure out tsconfig paths for some reason
		'class-methods-use-this': 'off',
		'@typescript-eslint/no-var-requires': 0,
	},
	settings: {
		'import/extensions': ['.ts'],
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/resolver': {
			typescript: {},
		},
	},
};
