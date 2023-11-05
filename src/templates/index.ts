import { plugin } from 'PLUGIN';
import { env } from 'ENV';
import { fastify } from 'fastify';

export const path = env('SOCKET_PATH', false);
export const host = env('HOST', '0.0.0.0');
export const port = parseInt(env('PORT', !path && '3000'));

const server = fastify({ logger: true });

await server.register(plugin);

await server.listen({ host, port, path });

console.log(`Listening on ${path ? path : host + ':' + port}`);

export { server };
