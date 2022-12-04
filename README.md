# docsify-glossary: SD Development Fork

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=stijn-dejongh_docsify-glossary&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=stijn-dejongh_docsify-glossary)

Simple Glossary for Docsify that replaces occurrences of words in text with links to the glossary definitions.
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

## Plugim Usage

* Terms must be predicated with a consistent markdown heading to get recognized by the glossary (see configuration)
* Terms are replaced with links in the order that they appear in the glossary file.
  * This is especially relevant for nested terminology ( e.g. _API_ and _API Usage_)

## Running the code

In order to run the code, you will need a node set-up on your local machine.
We recommend using [Node Version Manager](https://npm.github.io/installation-setup-docs/installing/using-a-node-version-manager.html) to make this easier.

### Building the code

1. Globally install [docsify](https://docsify.js.org/#/quickstart): `npm i docsify-cli -g` 
2. From the project root directory, run: `npm install`
3. To build the code, run: `npm run ci`
4. THis will compile, test, and package the plugin

### View the example website

Once the code has been built, you can launch the example website illustrating the use of the glossary.
In order to do so: 
3. Go to [http://localhost:3000/]()

## Changelog
Simple Glossary for Docsify
An overview of all the changes made to this codebase can be found in the [CHANGELOG](./CHANGELOG.md) file included in this repository.

## TODO list

* [x] Bump dependency versions
* [x] add unit tests to the code to make this package more maintainable
* [x] make glossary file name/location configurable, see [feature request #1](https://github.com/TheGreenToaster/docsify-glossary/issues/1)
* [x] make terminology heading depth configurable, see [feature request #1](https://github.com/TheGreenToaster/docsify-glossary/issues/1)
* [x] fix issue with terminology replacements in page headers/titles, see: [bug report #6](https://github.com/TheGreenToaster/docsify-glossary/issues/6)
* [ ] fix issue with terminology replacements in code blocks, see: [bug report #4](https://github.com/TheGreenToaster/docsify-glossary/issues/4)
* [x] fix issue with multiple word terms, see: [bug report #13]([bug report #13](https://github.com/TheGreenToaster/docsify-glossary/issues/13))


1. copy the latest version of the code into the example website: `cp ./dist/@stijn-dejongh/docsify-glossary* ./example`
2. Run `docsify serve example`