"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toml_1 = __importDefault(require("toml"));
const fs_1 = require("fs");
const dotenv_1 = require("dotenv");
const axios_1 = __importDefault(require("axios"));
const yargs_1 = __importDefault(require("yargs/yargs"));
const helpers_1 = require("yargs/helpers");
const path_1 = require("path");
(0, dotenv_1.config)(); // import environment variables
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .command('parse <file>', 'parse a file', (yargs) => {
    yargs.positional('file', {
        type: 'string',
        describe: 'the file to parse',
    });
}, (argv) => {
    if (argv.file != undefined) {
        parse(argv.file);
    }
    else {
        throw new Error('No file specified.');
    }
})
    .parse();
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
if (process.env.STRAPI_URL == undefined)
    throw new Error('STRAPI_URL environment variable is not defined. See README.md for more information.');
async function parse(uri) {
    let file;
    try {
        file = (0, fs_1.readFileSync)((0, path_1.resolve)(uri), 'utf-8');
    }
    catch {
        throw new Error('Error reading the file, see README.md for more information.');
    }
    let pages;
    try {
        pages = toml_1.default.parse(file);
    }
    catch {
        throw new Error('Error parsing the file, see README.md for more information.');
    }
    (0, axios_1.default)({
        url: process.env.STRAPI_URL,
        method: 'post',
        data: {
            data: {}
        }
    });
}
