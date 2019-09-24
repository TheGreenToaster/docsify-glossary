# docsify-glossary
Simple Glossary for Docsify that replaces occurrences of the terms with links to the glossary.

## Install
1. Insert script into docsify document
```html
<script src="//unpkg.com/docsify-glossary/dist/docsify-glossary.min.js"></script>
```
1. Create a `_glossary.md` file in the root directory
1. Populate the `_glossary.md` file with terms.

## Usage
* Terms must be predicated with `##### ` to get recognized by the glossary
* Terms in the documentation must be surrounded by space to get replaced by the regular expression
* Terms are replaced with links in the order that they appear in the glossary file.

## Example 
1. Run `npm run-script build`
1. Run `docsify serve example`
1. Go to [http://localhost:3000/]()