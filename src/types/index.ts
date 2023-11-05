import { Adapter } from "@sveltejs/kit";

export type AdapterFastifyOptions = {
  out?: string;
  precompress?: boolean;
  envPrefix?: string;
  polyfill?: boolean;
};

export type AdapterFastify = (opts?: AdapterFastifyOptions) => Adapter;
