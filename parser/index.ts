import { writeFileSync } from 'fs';
import { config } from 'dotenv';
import Axios from 'axios';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { resolve } from 'path';
import { Agent } from 'http';
import { Agent as SAgent } from 'https';

config(); // import environment variables

yargs(hideBin(process.argv))
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
      }).option(
        'outputFile',
        {
          alias: 'o',
          type: 'string',
          description: 'The output file to save the texts',
          default: 'output.txt'
        }
      )
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
      }).option(
        'outputFile',
        {
          alias: 'o',
          type: 'string',
          description: 'The output file to save the texts',
          default: 'output.txt'
        }
      )
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
  .command(
    'translate <file>',
    'parse file and translate content',
    (yargs) => {
      yargs.positional('file', {
        type: 'string',
        describe: 'the file to parse',
      }).option(
        'outputFile',
        {
          alias: 'o',
          type: 'string',
          description: 'The output file to save the texts',
          default: 'translated.json'
        }
      )
    },
    (argv) => {
      if (argv.file != undefined) {
        if (argv.outputFile != undefined) {
          translate(parse(argv.file as string)).then((translated) => {
            const file = resolve(argv.outputFile as string);
            writeFileSync(file, JSON.stringify(translated, null, 2));
            console.log(`Translation saved to ${file}`);
          })
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
  console.log('started to upload');

  const axios = Axios.create({
    baseURL: process.env['STRAPI_URL'] + '/api',
    headers: {
      Authorization: `Bearer ${process.env['STRAPI_ADMIN_JWT']}`
    },
    httpAgent: new Agent({ family: 4 })
  })

  const res = await axios({
    url: '/stories',
    method: 'get',
  }) as { data: { meta: { pagination: { total: number }}}}
  const count = res['data']['meta']['pagination']['total']
  console.log('got count');

  const treated: number[] = [];

  for (const page of data) {
    const res = await axios({
      url: '/pages',
      method: 'post',
      data: {
        data: {
          number: page.number,
          text: page.story,
          options: [
            {
              text: page.option1.desc,
              positive: page.option1.positive,
              redirect: page.option1.redirects
            },
            {
              text: page.option2.desc,
              positive: page.option2.positive,
              redirect: page.option2.redirects
            }
          ]
        }
      }
    })
    treated.push(res.data.data.id);
  }

  await axios({
    url: '/stories',
    method: 'post',
    data: {
      data: {
        number: count + 1,
        pages: treated
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

async function translate(pages: Page[]): Promise<Page[]> {
  console.log('contacting DeepL API to translate');

  const axios = Axios.create({
    baseURL: 'https://api-free.deepl.com/v2/translate',
    headers: {
      Authorization: `DeepL-Auth-Key ${process.env['DEEPL_KEY']}`,
      Accept: 'application/json',
      'accept-encoding': '*'
    },
    httpAgent: new SAgent({ family: 4 })
  })

  let final: Page[] = [];

  async function trans(text: string) {
    const res = await axios({
      method: 'post',
      params: {
        text: text,
        target_lang: 'FR'
      }
    })
    return res.data.translations[0].text;
  }

  for (let page of pages) {
    const story = await trans(page.story);
    const option1desc = await trans(page.option1.desc)
    const option2desc = await trans(page.option2.desc)
    page.story = story;
    page.option1.desc = option1desc;
    page.option2.desc = option2desc;
    final.push(page);
  }

  return final;
}