import { builtinModules } from 'node:module';

import esbuild from 'rollup-plugin-esbuild';

const external = ['ENV', 'HANDLER', 'MANIFEST', 'SERVER', 'SHIMS', ...builtinModules];

/**@type {import('rollup').RollupOptions[]} */
export default [
	{
		input: {
			index: 'src/index.ts',
			'templates/env': 'src/templates/env.ts',
			'templates/plugin': 'src/templates/plugin.ts',
			'templates/shims': 'src/templates/shims.ts',
			'templates/index': 'src/templates/index.ts',
		},
		output: {
			dir: 'dist',
			format: 'esm',
		},
		plugins: [esbuild({ sourceMap: false, minify: false, target: 'ESNext' })],
		external,
	},
];
