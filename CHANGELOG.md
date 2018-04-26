# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

## [1.0.0] - 2018-04-26
### Added
- hasNext api can tell if there is a follow-up hint

### Fixed
- fix spelling mistakes in readme

### Changed
- callback function takes two parameters `total` and `playedAmount`, representing the total amount of valid hints and the actual played amount of hints


## [0.2.1] - 2018-04-20
### Fixed
- fix issue 1 that mask size does not cover the whole page when the page's height is bigger than window.innerHeight
- forbid scrolling page when guideline is playing
- fix the bug that the top and bottom edge of the arrow is overflow when it is skew
- fix the bug that the arrow direction reverses left and right if the guideline text position is on the top of the guided element
- do not play a guideline if the configuration is empty array

### Changed
- update changelog
- update package keywords and description
- set hint text line-height to 1.25


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
