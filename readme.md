<div align="center" style="margin-top: 30px; margin-bottom: 30px">
    <img src="https://user-images.githubusercontent.com/7886068/62777794-60331580-ba63-11e9-9e32-4b937a81ab08.png" width="250px"/>
</div>

<p align="center">
Next.js inspired, zero configuration, markdown to presentation without thinking
</p>

## Demos

Check out https://amazingandyyy.com/markdeck/deck/wafflejs_speech_0904/

you can build this in less than 3 mins.

## Features

- zero configuration, inspired by [zeit/next.js](https://github.com/zeit/next.js)
- blazing fast (less than 0.3s)
- easy to create
- package size only 5.4 kB

## Installation

it's on [npm](https://www.npmjs.com/package/@amazingandyyy/markdeck)

```
$ npm i -g @amazingandyyy/markdeck@latest
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
$ npm i -g @amazingandyyy/markdeck
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
        └── markdeck
            ├── basic.css
            └── markdeck.js
...

$ npm i -g serve
$ serve ./docs
# http://localhost:5000/deck/wafflejs_speech_0904/ is on
```

then you push to github and turn on **Github Pages**, supporting serving files from `/docs` folder, and the presentation is sharable :) see [demo](https://www.amazingandyyy.com/markdeck/deck/wafflejs_speech_0904/)

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
│   │   └── markdeck
│   │       ├── basic.css
│   │       └── markdeck.js
│   ├── wafflejs_speech_08_07
│   │   ├── 1
│   │   ├── 2
│   │   ├── index.html
│   │   └── markdeck
│   │       ├── basic.css
│   │       └── markdeck.js
│   └── twilio_conference_08_07
...
# done!
```

## To do

- add more themes
- add more page designs
- add `deck init`
- add `deck start`
- add new demo deck
- more configurable, add `--output` or `--src` or `--theme` flags, right now the default is equivalent

```terminal
$ deck export --src ./decks --output ./docs --theme basic
```

- guideline of creating sharable themes
- launch on product hunt
- improve whole page refrech and better support fullscreen
- make it simple and reduce bundle size

## Resource

this project is generated from [amazingandyyy/modern-js-project](https://github.com/amazingandyyy/modern-js-project)

## License

[MIT](https://raw.githubusercontent.com/amazingandyyy/markdeck/master/license)

## Suggestions

- [PR](https://github.com/amazingandyyy/markdeck/pulls) is highly welcome
- feel free to open [issues](https://github.com/amazingandyyy/markdeck/issues) as many as possible, it doesn't need to be in details, just general idea is good enough.


<div align="center" style="margin-top: 30px;">
    <img src="https://user-images.githubusercontent.com/7886068/62777794-60331580-ba63-11e9-9e32-4b937a81ab08.png" height="50px"/>
</div>