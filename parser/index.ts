import toml from 'toml';
import { readFileSync, writeFileSync } from 'fs';
import { config } from 'dotenv';
import axios from 'axios';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { resolve } from 'path';

config(); // import environment variables

yargs(hideBin(process.argv))
  .option(
    'outputFile',
    {
      alias: 'o',
      type: 'string',
      description: 'The output file to save the texts',
      default: 'output.txt'
    }
  )
  .command(
    'upload <file>',
    'parse and upload a file',
    (yargs) => {
      yargs.positional('file', {
        type: 'string',
        describe: 'the file to upload',
      });
    },
    (argv) => {
      if (argv.file != undefined) {
        upload(parse(argv.file as string));
      } else {
        throw new Error('No file specified.');
      }
    })
  .command(
    'texts <file>',
    'parse file and get stories and options',
    (yargs) => {
      yargs.positional('file', {
        type: 'string',
        describe: 'the file to parse',
      });
    },
    (argv) => {
      if (argv.file != undefined) {
        if (argv.outputFile != undefined) {
          const text = texts(parse(argv.file as string));
          const file = resolve(argv.outputFile as string);
          writeFileSync(file, text);
          console.log(`Texts saved to ${file}`);
        } else {
          console.log(texts(parse(argv.file as string)));
        }
      } else {
        throw new Error('No file specified.');
      }
    }
  )
  .command(
    'stories <file>',
    'parse file and get stories',
    (yargs) => {
      yargs.positional('file', {
        type: 'string',
        describe: 'the file to parse',
      });
    },
    (argv) => {
      if (argv.file != undefined) {
        if (argv.outputFile != undefined) {
          const text = stories(parse(argv.file as string));
          const file = resolve(argv.outputFile as string);
          writeFileSync(file, text);
          console.log(`Stories saved to ${file}`);
        } else {
          console.log(stories(parse(argv.file as string)));
        }
      } else {
        throw new Error('No file specified.');
      }
    }
  )
  .demandCommand(1, 'Please specify a command.')
  .help()
  .parse()

/*
Format of a page:
```toml
[[page]]
number = *page number*
story = *generated story between quotes*

[option1]
desc = *option description between quotes*
positive = *whether the option is useful for the fight against AIDS (true/false)*
redirects = *number of the page it redirects to*

[option2]
desc = *option description between quotes*
positive = *whether the option is useful for the fight against AIDS (true/false)*
redirects = *number of the page it redirects to*
```
*/

if (process.env.STRAPI_URL == undefined) throw new Error('STRAPI_URL environment variable is not defined. See README.md for more information.');


type Page = {
  number: number;
  story: string;
  option1: {
    desc: string;
    positive: boolean;
    redirects: number;
  };
  option2: {
    desc: string;
    positive: boolean;
    redirects: number;
  };
}

function parse (uri: string): Page[] {
  return require(uri) as Page[];

  // let file: string;
  // try {
  //   file = readFileSync(resolve(uri), 'utf-8');
  // } catch {
  //   throw new Error('Error reading the file, see README.md for more information.');
  // }

  // try {
  //   return toml.parse(file) as Page[];
  // } catch {
  //   throw new Error('Error parsing the file, see README.md for more information.');
  // }
}

async function upload(data: Page[]) {
  axios({
    url: process.env.STRAPI_URL,
    method: 'post',
    data: {
      data: {
        
      }
    }
  })
}

function texts(pages: Page[]): string {
  let texts: string = '';

  for (let page of pages) {
    texts += `${page.story}\n${page.option1.desc}\n${page.option2.desc}\n\n`;
  }

  return texts;
}

function stories(pages: Page[]): string {
  let texts: string = '';

  for (let page of pages) {
    texts += `${page.story}\n\n`;
  }

  return texts;
}