# Nuit de l'Info 2022 - Codelab

This project uses:

- [Next.js](https://nextjs.org/)
- [Strapi](https://strapi.io/)
- [TRPC](https://trpc.io/)
- [DALL-E](https://openai.com/blog/dall-e/)
- [GPT-3](https://openai.com/blog/gpt-3-apps/)
- [Chakra UI](https://chakra-ui.com/)
- [ReCharts](https://recharts.org/en-US/)

## CMS (Strapi)

### Images

All images were generated on [OpenAI's DALL-E website](https://labs.openai.com/).

Then, the images were uploaded manually on Strapi.

Work was done to ensure the images correspond to the text prompt.

## Parser / Generator

This is a parser for GPT-3's output. It takes the output of GPT-3, parse it and send it tothe Strapi API.

### Format of the output

An array of this object:

```json
{
    "number": "*page number*",
    "story": "*generated story between quotes*",
    "option1": {
        "desc": "*option description between quotes*",
        "positive": "*whether the option is useful for the fight against AIDS (true/false)*",
        "redirects": "*number of the page it redirects to*"
    },
    "option2" {
        "desc": "*option description between quotes*",
        "positive": "*whether the option is useful for the fight against AIDS (true/false)*",
        "redirects": "*number of the page it redirects to*"
    }
}
```

### Environment variables

```env
STRAPI_URL = *...*
STRAPI_ADMIN_JWT = *...*
DEEPL_KEY = *...*
```

### How to use

1) Head to the [OpenAI playground](https://beta.openai.com/playground)
2) Copy one of the prompts inside and let GPt-3 generate the text for you
3) Input the prompt inside a `[generator] process.json` file
4) Run the generator with `[generator] translate ./process.json` to translate with DeepL
5) Upload the resulted files after having done checks with `[generator] upload ./translated.json`

**Note**: Ideally please use the latest prompt file.

### Aditional commands / tooling

The following command can be used:

- `[generator] stories`: to get all the stories from your entry file
- `[generator] texts`: to get all the texts and options from your entry file
