<div align="center" style="margin-top: 30px; margin-bottom: 30px">
    <img src="https://user-images.githubusercontent.com/7886068/62842733-069c3800-bc69-11e9-8941-a848612906e3.png"/>
</div>

<p align="center">
Build SEO-ready slides with zero configuration.
</p>

Demo:

https://www.amazingandyyy.com/markdeck/demo/docs/deck/presentation

## Highlights

- zero configuration, inspired by [nextjs](https://github.com/zeit/next.js)
- SEO ready for every single slide
- blazing fast
- no tutorials, only [demo](https://github.com/amazingandyyy/markdeck/tree/master/demo)
- force you to focus on content, without worried about fancy animations or layouts

## Perfect Preview on social network(fb/twitter/slack...etc)

![tweet](https://user-images.githubusercontent.com/7886068/62908651-f69a5c00-bd2d-11e9-8cd8-3b546dc2f13e.png)


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

### Production / SEO

```
$ deck export --assets images --url https://github.com/amazingandyyy/markdeck/tree/master/demo/docs --optimize
```

## Screenshots

![2](https://user-images.githubusercontent.com/7886068/62842694-ad340900-bc68-11e9-8fd8-ba3e7b0dfd12.png)
![3](https://user-images.githubusercontent.com/7886068/62842695-ad340900-bc68-11e9-8c44-14636f3cc461.png)

## License

MIT - as always
