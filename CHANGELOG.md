# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).


## [0.2.0] - 2018-03-23
### Added
- add an arrow shape from the guide text to the guided element
- add release script in `build` directory
- add Change log
- support umd modular solution

### Changed
- update the setting of webpack configuration
- update package.json to add "bugs" item and add "release" script command
- remove unnecessary published files, such as yarn.lock, webpack.config.js and etc.
- update README.md to add API instructions


## [0.1.0] - 2018-03-20
### Added
- the configuration supports not setting the guided element, in which case the guideline text is centered relative to the browser window
- highlight the guided element with the animation of breathing
- support setting custom style of the guideline text
- support setting the location of the guideline text relative to the guided element, top or bottom
- calculate the location of the guideline text automatically
