import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

let service: esbuild.Service;

const bundle = async (userInput: string) => {
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
    });
  }

  try {
    const result = await service.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(userInput)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
      jsxFactory: '_rct.createElement',
      jsxFragment: '_rct.Fragment'
    });

    return {
      code: result.outputFiles[0].text,
      error: ''
    }
  } catch (error: any) {
    return {
      code: '',
      error: error.message
    }
  }
};

export default bundle;