# @mrwaip/adapter-fastify

## Usage

Install with `npm i -D @mrwaip/adapter-fastify`, then add the adapter to your `svelte.config.js`:

```js
/// file: svelte.config.js
import adapter from '@mrwaip/adapter-fastify';

export default {
	kit: {
		adapter: adapter(),
	},
};
```

## Other

All concepts are same like with [@sveltejs/adapter-node](https://kit.svelte.dev/docs/adapter-node)
