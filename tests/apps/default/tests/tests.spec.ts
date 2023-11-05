import { expect, test } from '@playwright/test';

test('Page has h1 with SvelteKit app', async ({ page }) => {
	await page.goto('./', { waitUntil: 'networkidle' });
	expect(await page.textContent('h1')).toContain('SvelteKit app');
});

test('Page has h1 with NoPrerendered', async ({ page }) => {
	await page.goto('./noprerendered', { waitUntil: 'networkidle' });
	expect(await page.textContent('h1')).toContain('NoPrerendered');
});

test('Api handler return It is api', async ({ request }) => {
	const response = await request.post('./api');
	expect(await response.text()).toContain('It is api');
});

test('check static files', async ({ request }) => {
	const response = await request.get('./robots.txt');
	expect(await response.text()).toContain('# https://www.robotstxt.org/robotstxt.html');
});

test.only('Sverdle work', async ({ page }) => {
	await page.goto('./sverdle', { waitUntil: 'networkidle' });

	await page.keyboard.type('zuzim');

	await page.keyboard.press('Enter');

	await page.pause();
});
