import { builtinModules } from 'module';
import { dts } from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

const external = ['ENV', 'PLUGIN', 'MANIFEST', 'SERVER', 'SHIMS', /node/, /rollup/, /fastify/, ...builtinModules];

const input = {
	index: 'src/index.ts',
	'templates/env': 'src/templates/env.ts',
	'templates/plugin': 'src/templates/plugin.ts',
	'templates/shims': 'src/templates/shims.ts',
	'templates/index': 'src/templates/index.ts',
};

/**@type {import('rollup').RollupOptions[]} */
export default [
	{
		input,
		output: {
			dir: 'dist',
			format: 'esm',
		},
		plugins: [esbuild({ sourceMap: false, minify: false, target: 'ESNext' })],
		external,
	},
	{
		input,
		external,
		output: {
			dir: 'dist',
			format: 'esm',
		},
		plugins: [dts()],
	},
];
