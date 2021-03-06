---
layout: docs/index.pug
permalink: /docs/index.html
---
#
## Miayam
--------
### The Brutalist Blog Site Built & Designed By Muhammad D. R.

A blog site to store thoughts and ideas. Built and designed solely by yours
truly. It stays being true to itself. An entity that is an inhabitant of the
web. HTML, CSS, JavaScript and everything in between bundled together. It's
ugly, brutal, a dead simple site, a sore to the eyes, but having no more than
is really needed.

This project also includes a starter pack to build a blog site with
[`Eleventy`](https://www.11ty.dev/){.a-anchor}. Look into
[`init`](https://github.com/miayam/miayam/tree/init){.a-anchor} branch.

### Table of Contents
- [Introduction](#introduction){.a-anchor}
- [Usage](#usage){.a-anchor}
- [Special Thanks](#special-thanks){.a-anchor}
- [The Reason Why I Migrate From Jekyll To Eleventy](#the-reason-why-i-migrate-from-jekyll){.a-anchor}

### Introduction {id="introduction"}
A starter project to rebuild [miayam.github.io](https://miayam.github.io){.a-anchor} from the
ground up using `Eleventy` and friends. It is a foundation on which
new [miayam.io](https://miayam.io){.a-anchor} will be built. Removing Jekyll
entirely from the code base 💩.

What I need for a brutalist blog site:
- A simple design, component based design that's easy to change and work with.
It doesn't have to be `React`, `Angular`, `Vue` or `Svelt`.
- Performance. A super fast jellyfish. 100% lighthouse score.
- SEO.
- PWA. Well, I just want to display pictures of cute girls when offline.

Therefore, this starter project must be:
- [Boring](#boring){.a-anchor}
- [Atomic](#atomic){.a-anchor}
- [As Little Assets As Possible](#as-little-assets-as-possible){.a-anchor}

### Boring {#boring}
I believe in boring technology. Shiny new technology will be obselete in no
time, but boring tech will not. `Pug` for building presentational component.
`SCSS` for styling. `Vanilla JS` for manipulating the DOM, scripting repetitive tasks
and configuration.

### Atomic {#atomic}
[Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/){.a-anchor} is a way to go.
It makes the design **modular** that can be easily **managed and updated**. Thanks to
Daniel Tonon for
[this great article](https://css-tricks.com/abem-useful-adaptation-bem/){.a-anchor}.
He encourages us to combine modified [`BEM`](https://www.smashingmagazine.com/2018/06/bem-for-beginners/){.a-anchor} naming convention with atomic design
methodology. He also wrote pros and cons for his approach and let us decide
and manage the trade off.

Here is the file structure:

```
src
└── components
    ├── atoms
    |    └── button
    |       ├── index.pug
    |       ├── _index.scss
    |       └── index.js
    |── molecules
    |── organisms
    └── templates
```

`components` is an entry point in which `Eleventy` looks for layouts.

### As Little Assets As Possible {#as-little-assets-as-possible}
`Webpack` is a bundle manager + task runner for this project.
Any changes to `components/templates/**/*/index.js` or `components/templates/**/*/_index.scss` is
watched and rebuilt by `Webpack`. `Webpack` bundles `JavaScript` and `SCSS` code in multiple entry points
reside in `components/templates` which will be injected on every template by `HtmlWebpackPlugin`.
`Eleventy` will do the rest.

Here is the file structure:
```
src
└── components 
    ├── atoms
    ├── molecules
    ├── organisms
    └── templates
         ├── base
         |  └── index.pug
         ├── 404
         |  ├── index.pug
         |  ├── _index.scss
         |  └── index.js
         └── home
            ├── index.pug
            ├── _index.scss
            └── index.js
```

Here is the snippet from `webpack.common.js`.
```js
const ENTRY_POINTS = [
    'home',
    '404'
];

const multipleHtmlPlugins = ENTRY_POINTS.map(name => {
    return new HtmlWebpackPlugin({
        template: `${basePath}/components/templates/base/index.pug`,
        filename: `${basePath}/components/templates/${name}/index.pug`,
        chunks: [`${name}`],
        inject: false,
        hash: true,
        templateParameters: {
            // For now, disable analytics for
            // starter project landing page
            analytics: name !== 'home'
        }
    });
});

module.exports = {
    entry: ENTRY_POINTS.reduce((prev, curr) => {
        return {
            ...prev,
            [curr]: `./src/components/templates/${curr}/index.js`
        }
    }, {}),
    plugins: [
        ...multipleHtmlPlugins,
        ... // The rest.
    ]
    ... // The rest.
};
```

Here is how we inject assets on base template (`components/templates/base/index.pug`):
```pug
body
    //- Inject assets. 6 spaces is necessary, so that `HtmlWebpackPugPlugin` can
    //- translate this snippet to proper pug syntax.
    <%= htmlWebpackPlugin.files.css.map((css) => (
       `link(href=\'${css}\', rel='stylesheet')`).join('\n      ')`
    )) %>
    <%= htmlWebpackPlugin.files.js.map((js) => (
        `script(src=\'${js}\', type='text/javascript', async)`).join('\n      ')`
    )) %>
```

Therefore, every template will have unique minified, production ready assets that's only
needed by pages that include it. *About* page will not load assets required by *Home* page.
As little assets as possible.

### Usage {#usage}
- [Requirement](#requirement){.a-anchor}
- [Development](#development){.a-anchor}
- [Production](#production){.a-anchor}

### Requirement {#requirement}
You must install [nvm](https://github.com/nvm-sh/nvm){.a-anchor}. You will be using Node version set in `.nvmrc`.

After you have installed `nvm`, run this command:
```
$ nvm install
$ nvm use
```

### Development {#development}
Install all the dependencies:

```
$ npm run install
```

After that, run this command:

```
$ npm run start
```

`Webpack` bundles the assets, `Eleventy` will do the rest.

Open `localhost:1992` to see the result.


### Production {#production}
To build production ready bundle, run this command:

```
$ npm run build
```

You can host it on `Github Pages`, `Netlify`, or else.

### Special Thanks {#special-thanks}
- Almighty God
- [https://github.com/clenemt/eleventy-webpack](https://github.com/clenemt/eleventy-webpack){.a-anchor}
- [https://pustelto.com](https://pustelto.com){.a-anchor}


### The Reason Why I Migrate From Jekyll to Eleventy {#the-reason-why-i-migrate-from-jekyll}
At first, [miayam.io](https://miayam.io){.a-anchor} was a personal blog site built with
[Jekyll](https://jekyllrb.com/){.a-anchor} using a theme I pick carelessly without thinking.
2 years later since its inception, I almost forget half of the code. Ruby seems
foreign to me. The more I tinker with it, the more befuddled I am. So, I decided to
burn it down and rebuild it from the ground up.

I was looking for an alternative to [Jekyll](https://jekyllrb.com/){.a-anchor} written in
`JavaScript` because I am a boring web developer you could find anywhere else. I have
tried [Gatsby](https://www.gatsbyjs.com/){.a-anchor} and wound up getting bored. All those shiny
new technologies [Gatsby](https://www.gatsbyjs.com/){.a-anchor} has to offer are not really what
I need. I have tried [Hexo](https://hexo.io/){.a-anchor}, it had similar ambience with
[Jekyll](https://jekyllrb.com/){.a-anchor} but it didn't spark joy.

And then, there was [Eleventy](https://www.11ty.dev/){.a-anchor}... It really is like a magical glove that
just fit my brain perfectly. It does one thing and does it well. A simple SSG (Static Site Generator)
that helps provide minimum barebone for the next generation of [miayam.io](https://miayam.io){.a-anchor}.
And for good reason, the batteries are not included.
