import path from 'path';
import { Command } from 'commander';
import { serve } from '@note-js/local-api';

const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '2525')
  .action(async (filename = 'notebook.js', options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(parseInt(options.port), path.basename(filename), dir, !isProduction);
      console.log(
        `Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file.`
      );
    } catch (error: any) {
      if (error.code === 'EADDRINUSE') {
        console.error('Port is in use. Try running on a different port.');
      } else {
        console.log('Heres the problem', error.message);
      }
      process.exit(1);
    }
  }
);