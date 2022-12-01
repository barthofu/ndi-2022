# GPT-3 parser

This is a parser for GPT-3's output. It takes the output of GPT-3, parse it and send it tothe Strapi API.

## Format of the output

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

## Environment variables

```env
STRAPI_URL = *url of the Strapi API*
```

## How to use

1) Head to the [OpenAI playground](https://beta.openai.com/playground)
2) Copy one of the prompts inside and let GPt-3 generate the text for you
3) Input the prompt inside a `process.toml` file

**Note**: Ideally please use the latest prompt file.
