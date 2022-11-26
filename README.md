# docsify-glossary: SD Development Fork

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=stijn-dejongh_docsify-glossary&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=stijn-dejongh_docsify-glossary)

Simple Glossary for Docsify that replaces occurrences of the terms with links to the glossary.
Forked from [TheGreenToaster/docsify-glossary](https://github.com/TheGreenToaster/docsify-glossary) as the original
project was unmaintained for over 3 years, to address a couple of usability issues with the original script.

An example usage can be found here [./example](./example), it is deployed automatically to this [github page](https://stijn-dejongh.github.io/docsify-glossary/#/).

## Installation

1. Insert script into docsify document

```html
<script src="./docsify-glossary.min.js"></script>
```

1. Create a `_glossary.md` file in the root directory
2. Populate the `_glossary.md` file with terms.

## Usage

* Terms must be predicated with a consistent markdown heading to get recognized by the glossary (see configuration)
* Terms in the documentation must be surrounded by space to get replaced by the regular expression
* Terms are replaced with links in the order that they appear in the glossary file.

## Example

1. Run `npm run-script build`
2. Run `docsify serve example`
3. Go to [http://localhost:3000/]()

## Changelog

An overview of all the changes made to this codebase can be found in the [CHANGELOG](./CHANGELOG.md) file included in this repository.

## TODO list

* [x] Bump dependency versions
* [x] add unit tests to the code to make this package more maintainable
* [x] make glossary file name/location configurable, see [feature request #1](https://github.com/TheGreenToaster/docsify-glossary/issues/1)
* [x] make terminology heading depth configurable, see [feature request #1](https://github.com/TheGreenToaster/docsify-glossary/issues/1)
* [ ] fix issue with terminology replacements in page headers/titles, see: [bug report #6](https://github.com/TheGreenToaster/docsify-glossary/issues/6)
* [ ] fix issue with terminology replacements in code blocks, see: [bug report #4](https://github.com/TheGreenToaster/docsify-glossary/issues/4)
* [ ] fix issue with multiple word terms, see: [bug report #13]([bug report #13](https://github.com/TheGreenToaster/docsify-glossary/issues/13))
