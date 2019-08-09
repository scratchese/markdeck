<h1 align="center">
💬 next-deck 💬
</h1>
<h4 align="center">
Next.js inspired, zero configuration, markdown to presentation without thinking
</h4>

## Features

- zero configuration, inspired by [zeit/next.js](https://github.com/zeit/next.js)
- blazing fast (less than 0.3s)
- easy to create

## Installation

it's on [npm](https://www.npmjs.com/package/@amazingandyyy/next-deck)

```
$ npm i -g https://www.npmjs.com/package/@amazingandyyy/next-deck
```

## Usage

### Create markdown under `/decks`

```terminal
$ mkir decks
$ touch decks/wafflejs_speech_0904.md
```

*Tips*: add `------` (6 dashes) to seperate different pages, and other thing will be just [markdown](https://guides.github.com/features/mastering-markdown/)

### Export to `/docs`

```terminal
$ npm i -g @amazingandyyy/next-deck
$ deck --help
$ deck export
...
$ tree docs
docs/
├── deck
    └── wafflejs_speech_0904
        ├── 1
        ├── 2
        ├── index.html
        └── nextdeck
            ├── basic.css
            └── nextdeck.js
...

$ npm i -g serve
$ serve ./docs
# http://localhost:5000/deck/wafflejs_speech_0904/ is on
```

then you push to github and turn on **Github Pages**, supporting serving files from `/docs` folder, and the presentation is sharable :) see [demo]()

### Support multiple markdowns under `/decks`

```terminal
$ tree decks
decks
└── sf_node_08_01.md
└── wafflejs_speech_08_07.md
└── twilio_conference_08_07.md

$ deck export
# ... compiling in less than a second
$ tree docs
docs/
├── deck
│   ├── sf_node_08_01
│   │   ├── 1
│   │   ├── 2
│   │   ├── 3
│   │   ├── 4
│   │   ├── index.html
│   │   └── nextdeck
│   │       ├── basic.css
│   │       └── nextdeck.js
│   ├── wafflejs_speech_08_07
│   │   ├── 1
│   │   ├── 2
│   │   ├── index.html
│   │   └── nextdeck
│   │       ├── basic.css
│   │       └── nextdeck.js
│   └── twilio_conference_08_07
...
# done!
```

## To do

- add more themes
- add more page designs
- add new demo deck
- more configurable, add `--output` or `--src` or `--theme` flags, right now the default is equivalent

```terminal
$ deck export --src ./decks --output ./docs --theme basic
```

- guideline of creating sharable themes
- launch on product hunt

## Resource

this project is generated from [amazingandyyy/modern-js-project](https://github.com/amazingandyyy/modern-js-project)

## License

[MIT](https://raw.githubusercontent.com/amazingandyyy/next-deck/master/license)

## Suggestions

- [PR](https://github.com/amazingandyyy/next-deck/pulls) is highly welcome
- feel free to open [issues](https://github.com/amazingandyyy/next-deck/issues) as many as possible, it doesn't need to be in details, just general idea is good enough.
