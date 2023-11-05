import type { PlaywrightTestConfig } from '@playwright/test';

const { CI } = process.env;

const applicationUrl = 'http://localhost:3000';
const base = '/base/example';

const config: PlaywrightTestConfig = {
	webServer: [
		{
			command: 'npm run preview',
			port: 3000,
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
			use: {
				baseURL: `${applicationUrl}${base}/`,
				headless: false,
			},
		},
	],
	testDir: 'tests',
	timeout: 10000,
	retries: CI ? 2 : 0,
};

export default config;
