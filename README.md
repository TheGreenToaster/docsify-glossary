# docsify-glossary: SD Development Fork

Simple Glossary for Docsify that replaces occurrences of the terms with links to the glossary.
Forked from [TheGreenToaster/docsify-glossary](https://github.com/TheGreenToaster/docsify-glossary) as the original
project was unmaintained for over 3 years, to address a couple of usability issues with the original script.

## Installation

1. Insert script into docsify document

```html
<script src="//unpkg.com/docsify-glossary/dist/docsify-glossary.min.js"></script>
```

1. Create a `_glossary.md` file in the root directory
2. Populate the `_glossary.md` file with terms.

## Usage

* Terms must be predicated with `##### ` to get recognized by the glossary
* Terms in the documentation must be surrounded by space to get replaced by the regular expression
* Terms are replaced with links in the order that they appear in the glossary file.

## Example

1. Run `npm run-script build`
2. Run `docsify serve example`
3. Go to [http://localhost:3000/]()

## Changelog

An overview of all the changes made to this codebase can be found in the [CHANGELOG](./CHANGELOG.md) file included in this repository.
