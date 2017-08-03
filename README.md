# math-katex Plugin

[![Build Status](https://travis-ci.org/j13z/reveal.js-math-katex-plugin.svg?branch=master)](https://travis-ci.org/j13z/reveal.js-math-katex-plugin)

A [reveal.js](https://github.com/hakimel/reveal.js) plugin that renders mathematical formulas inside slides using
 [KaTeX](https://github.com/Khan/KaTeX).

- Lightweight rendering, thanks to KaTeX
- Marks syntax errors on the slide
- Renders all formulas when presentation loads (no re-rendering when slide changes)


## Plugin setup

1. Download the latest release ([tar.gz](https://github.com/j13z/reveal.js-math-katex-plugin/releases/download/v0.5.0/reveal.js-math-katex-0.5.0.tar.gz) or [zip](https://github.com/j13z/reveal.js-math-katex-plugin/releases/download/v0.5.0/reveal.js-math-katex-0.5.0.zip)) and extract it into the `plugin` directory of your reveal.js presentation.

2. Tell reveal.js to use the plugin:

    ```javascript
    Reveal.initialize({
        // … other configuration …

    	dependencies: [
            { src: 'plugin/math-katex/math-katex.js', async: true }
    	]
    });
    ```

A build of KaTeX is included with the plugin.


## Usage

> **TL;DR:**  See the [example](example.html).

There are two usage modes:

1. TeX-style, wrapped in `$…$` or `$$…$$`. Works in Markdown, too
2. Wrapped in HTML elements with class `formula` or `math`. (Don’t also use dollar syntax when using a class.)

The rendered TeX-style formulas also get a class `formula` added so that you can style them. `$…$` formulas in addition get class `inline`, `$$…$$` class `display`.


### TeX style (dollars)

- Use `$$…$$` for display-style (block) formulas: `$$\frac{1}{1 + e^{-x}}$$`

- Use `$…$` for in-line formulas: e.g. `$P(A \mid B)$`

Escape literal dollar characters with `\$`.

*As an alternative:* If you have many slides that use literal dollar characters, it may be easier to explicitly activate formula rendering *per slide*: Set `math.enableGlobally` to `false` and then activate formula replacements on each slide (`<section>`) by setting the `data-math` attribute (no value required).


### Wrapped in an element

Wrap the formula in an element with class formula (or math):

`<div class="formula display"> \frac{1}{1 + e^{-x}} </div>`

Display mode is in-line by default, add class `display` if needed.


### Exclude elements

You can exclude elements from formula rendering by:

1. Adding the class `math-ignored` to an element or its (direct) parent
1. Adding the element type to the `math.ignoredElements` array on the configuration object (default: `pre`, `code`)



## Optional configuration

```javascript
Reveal.initialize({
    // … presentation configuration …

    // `math-katex` plugin:

    // *Optional* configuration:
    math: {
        // Uncomment to disable syntax error notifications
        // notificationsEnabled: false   // default: true

        // Elements to ignore for math rendering (defaults shown):
        // ignoredElements: [ 'pre', 'code' ]

        // Set `enableGlobally` to `false` to avoid excessive
        // escaping of dollar characters. You will then need to
        // activate `$…$`-style replacements per slide with a
        // `data-math` attribute (formulas wrapped in elements
        // are still activated everywhere).
        //
        // enableGlobally: false

        // In case you need to load KaTeX from a different
        // location (relative or absolute URL):
        // katexScript:     'path/to/katex/katex.min.js',
        // katexStylesheet: 'path/to/katex/katex.min.css'
    },

    // Specify the plugin as a dependency:
	dependencies: [
        { src: 'plugin/math-katex/math-katex.js', async: true }
	]
});
```

## Example

To run the example in your browser, clone or download this repository and install reveal.js using npm (Node.js required):

From the repository root directory: `$ npm install reveal.js`

If you don't have Node.js installed: Download reveal.js and copy it into a new directory named `node_modules`.



## Tests

Run tests (requires Node.js): `$ npm install && npm test`

Tests use Mocha + Chai via [mocha-phantomjs](https://github.com/nathanboktae/mocha-phantomjs).
