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
      └── @markdeck/bundler-i18n: support i18n
      └── @markdeck/bundler-og: generate open graphs
      └── @markdeck/bundler-metadata: generate metadata
  └── @markdeck/serve: like next
  └── @markdeck/deployer: deploy to server
      └── @markdeck/deployer-now: deploy with ZEIT now serverless
  └── @markdeck/HMML: md -> .hmml (Hypermarkdown markup language)
  └── @markdeck/theme: more themes(vanilla, uber, airbnb)
  └── @markdeck/marketplace: a marketplace for themes/layouts
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

### Tools

- https://developers.facebook.com/tools/debug/
- https://cards-dev.twitter.com/validator
