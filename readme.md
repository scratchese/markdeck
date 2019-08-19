<div align="center" style="margin-top: 30px; margin-bottom: 50px">
    <img width="400px" src="https://user-images.githubusercontent.com/7886068/62908798-b1c2f500-bd2e-11e9-9fcc-9ad02bb2433b.png"/>
</div>

<p align="center">
Build SEO-ready slides with zero configuration.
</p>

<p align="center">
   <a href="https://github.com/amazingandyyy/markdeck/blob/master/LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-green.svg" />
   </a>
   <a href="https://circleci.com/gh/amazingandyyy/markdeck">
      <img src="https://circleci.com/gh/amazingandyyy/markdeck.svg?style=svg" />
   </a>
   <a href="https://www.npmjs.com/package/@amazingandyyy/markdeck">
      <img src="https://badge.fury.io/js/%40amazingandyyy%2Fmarkdeck.svg" />
   </a>
</p>

Demo:

https://amazingandyyy.com/markdeck/demo/docs/deck/presentation

## Highlights

- zero configuration, inspired by [nextjs](https://github.com/zeit/next.js)
- SEO ready for every single slide
- blazing fast
- no tutorials, only [demo](https://github.com/amazingandyyy/markdeck/tree/master/demo)
- force you to focus on content, without worried about fancy animations or layouts
- [perfect preview](https://github.com/amazingandyyy/markdeck/issues/6) on social network(fb/twitter/slack...etc)

## Usage

### Install globally

```
$ npm i -g @amazingandyyy/markdeck
```

### Simple Project structure

leave your markdown under `decks/` folder

```
$ tree .
.
└── decks/
    └── presentation.md
    └── presentation.css (the exact same name as markdown, so you can easily override the theme css)
```

### Present locally

```
$ deck
...
# alive on http://localhost:1234/deck/presentation/
```

### Export & Share
```
$ deck export
$ tree .
.
├── decks/
│   └── presentation.md
│   └── images/
│       └── andy.png
└── docs/
    └── deck/
        └── presentation/
            └──index.html
            ...
$ deck export --optimize
```

### Github Pages

Go to repo setting and turn on **Github Pages** to serve `/docs` folder, and the presentation is sharable for free :)

### Production Build / SEO-ready

```
$ deck export --optimize
<!-- you might also want to setup assets for static assets -->
$ deck export --assets images --url https://github.com/amazingandyyy/markdeck/tree/master/demo/docs --optimize
```

## Screenshots

![2](https://user-images.githubusercontent.com/7886068/62842694-ad340900-bc68-11e9-8fd8-ba3e7b0dfd12.png)
![3](https://user-images.githubusercontent.com/7886068/62842695-ad340900-bc68-11e9-8c44-14636f3cc461.png)

## License

MIT
