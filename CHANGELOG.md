# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] -> [1.0.1]

### Added

- NPM publish workflow using [npm-publish-action](https://github.com/marketplace/actions/publish-to-npm)
- README usage description expanded with configuration example

### Fixed

- word concatenations are no longer replaced (bug with 'full stop'-regex)
- alternate glossary location is taken into account by generated links

### Removed

- Removed the TODO list from the main readme file

## [0.0.1] -> [1.0.0]
created by [Stijn Dejongh](https://github.com/stijn-dejongh).

### Added

- Jest runner and basic tests
- ESLint and configuration
- make the plugin configurable
- Section with improvements added to README file
- SonarQube definition
- Basic github workflow definition
- make terminology heading depth configurable, see [feature request #1](https://github.com/TheGreenToaster/docsify-glossary/issues/1)

### Fixed

- Replaced deprecated packages with security vulnerabilities
- Issue with multiple terminology replacements
- fix issue with terminology replacements in page headers/titles, see: [bug report #6](https://github.com/TheGreenToaster/docsify-glossary/issues/6)
- fix issue with terminology replacements in code blocks, see: [bug report #4](https://github.com/TheGreenToaster/docsify-glossary/issues/4)
- fix issue with multiple word terms, see: [bug report #13]([bug report #13](https://github.com/TheGreenToaster/docsify-glossary/issues/13))

### Changed

- Updated directory structure to fit common code conventions
- Add unit tests
- Run configurations altered
- Bumped node version to version 18

### Removed

- Webpack module builder

## [0.0.1]
created by [TheGreenToaster](https://github.com/TheGreenToaster/docsify-glossary).

