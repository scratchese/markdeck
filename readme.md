<div align="center" style="margin-top: 30px; margin-bottom: 30px">
    <img src="https://user-images.githubusercontent.com/7886068/62777794-60331580-ba63-11e9-9e32-4b937a81ab08.png" width="250px"/>
</div>

<p align="center">
Build SEO-ready slides with zero configuration.
</p>

Demo:

https://amazingandyyy.com/markdeck/deck/wafflejs_speech_0904/

## Highlights

- zero configuration, inspired by [nextjs](https://github.com/zeit/next.js)
- SEO ready for every single slide
- blazing fast
- no tutorials, only [demo](https://github.com/amazingandyyy/markdeck/tree/master/demo)
- force you to focus on content, without worried about fancy animations or layouts

## Usage

### Install globally

```
$ npm i -g @amazingandyyy/markdeck
```

### Project structure

leave your markdown under `decks/` folder

```
$ tree .
.
└── decks
    └── presentation.md
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
├── decks
│   └── presentation.md
└── docs
    └── deck
        └── presentation
            └──index.html
            ...
```

Go to repo setting and turn on **Github Pages** to serve `/docs` folder, and the presentation is sharable for free :)

## Screenshot

![1](https://user-images.githubusercontent.com/7886068/62819284-cffadc00-bb07-11e9-9cc1-5d69261fe2d5.png)
![2](https://user-images.githubusercontent.com/7886068/62819283-cffadc00-bb07-11e9-8927-d4219e8dbcad.png)

## License

MIT - as always
