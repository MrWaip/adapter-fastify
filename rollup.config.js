import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { builtinModules } from 'node:module';

import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import { resolve } from 'node:path';

// {
// 	external,
// 	input,
// 	output: {
// 		dir: 'dist',
// 	},
// 	plugins: [
// esbuild({
// 	sourceMap: false,
// 	minify: false,
// 	tsconfig: 'tsconfig.json',
// }),
// 	],
// },
// {
// 	input,
// 	external,
// 	output: {
// 		dir: 'dist/types',
// 	},
// 	plugins: [dts()],
// },

// const esb = esbuild({
// 	sourceMap: false,
// 	minify: false,
// 	tsconfig: 'tsconfig.json',
// });

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
