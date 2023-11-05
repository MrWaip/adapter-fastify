import type { PlaywrightTestConfig } from '@playwright/test';

const { CI } = process.env;

const applicationUrl = CI ? 'http://localhost:3000' : 'https://localhost.ozonru.me:3000';
const systemUrl = CI ? 'http://localhost:84' : 'https://localhost.ozonru.me:84';
const base = '/apps/example';

const config: PlaywrightTestConfig = {
	webServer: [
		{
			command: CI ? 'npm run preview' : 'npm run dev',
			port: 84,
			stdout: 'pipe',
			env: {
				VITE_BASE_URL: base,
				VITE_HOST_URL: applicationUrl,
				VITE_ASSETS_URL: `${applicationUrl}${base}`,
			},
		},
	],
	projects: [
		{
			name: 'Application',
			grepInvert: [/@system/, CI ? undefined! : /@build/].filter(Boolean),
			use: {
				baseURL: `${applicationUrl}${base}/`,
			},
		},
		{
			name: 'System',
			grep: /@system/,
			use: {
				baseURL: systemUrl,
			},
		},
	],
	testDir: 'tests',
	timeout: CI ? 10000 : 3000,
	retries: CI ? 2 : 0,
};

export default config;
