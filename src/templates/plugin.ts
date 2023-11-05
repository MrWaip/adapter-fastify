import 'SHIMS';

import { env } from 'ENV';
import { manifest, prerendered } from 'MANIFEST';
import { Server } from 'SERVER';

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Readable } from 'node:stream';

import { getRequest } from '@sveltejs/kit/node';
import serveStaticPlugin from '@fastify/static';
import fp from 'fastify-plugin';

const server = new Server(manifest);
await server.init({ env: process.env as Record<string, string> });
const body_size_limit = parseInt(env('BODY_SIZE_LIMIT', '524288'));

const dir = path.dirname(fileURLToPath(import.meta.url));

export const plugin = fp(async (instance) => {
	const prerenderedPath = path.join(dir, 'prerendered');

	// serve client
	await instance.register(serveStaticPlugin, {
		root: path.join(dir, 'client'),
		etag: true,
		preCompressed: true,
		wildcard: false,
		setHeaders: (res, pathname) => {
			if (pathname.includes(`/${manifest.appPath}/immutable/`) && res.statusCode === 200) {
				res.setHeader('cache-control', 'public,max-age=31536000,immutable');
			}
		},
	});

	// allow return prerendered
	await instance.register(serveStaticPlugin, {
		root: prerenderedPath,
		etag: true,
		preCompressed: true,
		serve: false,
		extensions: ['html'],
		decorateReply: false,
		wildcard: false,
	});

	// prerendered
	instance.addHook('onRequest', (req, res, done) => {
		const url = req.url;

		if (prerendered.has(url)) {
			if (url.endsWith('/')) {
				return res.sendFile(url + 'index.html', prerenderedPath);
			} else {
				return res.sendFile(`${url}.html`, prerenderedPath);
			}
		}

		const location = url.at(-1) === '/' ? url.slice(0, -1) : url + '/';

		if (prerendered.has(location)) {
			return res.redirect(308, location);
		}

		done();
	});

	// SSR
	instance.addHook('preHandler', async (req, res) => {
		if (req.routeOptions.url) {
			return;
		}

		let request: Request;

		try {
			request = await getRequest({
				base: `${req.protocol}://${req.hostname}`,
				request: req.raw,
				bodySizeLimit: body_size_limit,
			});
		} catch (err) {
			res.status((err as { status?: number }).status || 400);
			return res.send('Invalid request body');
		}

		const fetchLikeResponse = await server.respond(request, {
			platform: { req: req.raw },
			getClientAddress: () => req.ip,
		});

		res.status(fetchLikeResponse.status);
		res.headers(Object.fromEntries(fetchLikeResponse.headers));

		if (!fetchLikeResponse.body) {
			return res.send();
		}

		return res.send(Readable.fromWeb(fetchLikeResponse.body));
	});
});
