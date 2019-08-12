# Ideas

## To-do

- add `deck init`
- mobile friendly
- improve whole page refrech and better support fullscreen
- keep it simple
- reduce bundle size
- launch on product hunt

## Markdeck project ultimate goal

```
github.com/markdeck-project
  └── @markdeck/core: abstract markdown into multiple htmls
  └── @markdeck/bundler: like parcel build
  └── @markdeck/serve: like next
  └── @markdeck/now: deploy with ZEIT now serverless
  └── @markdeck/HMML: md -> .hmml (Hypermarkdown markup language)
  └── @markdeck/theme: more themes(vanilla, uber, airbnb)
  └── @markdeck/marketplace: a market place for themes
  └── @markdeck/studio: a online WYSIWYG editor
```

## Suggestions

- [PR](https://github.com/amazingandyyy/markdeck/pulls)/[issues](https://github.com/amazingandyyy/markdeck/issues) are highly welcome

## More intuitive CLI

### Babel command

```
babel script.js --out-file script-compiled.js
babel src --out-dir lib
```

### Next js

```
next
next start
next build
next export

package.json
{
  "scripts": {
    "dev": "next",
    "build": "next build",
    "export": "npm run build && next export",
    "start": "next start"
  }
}
```
