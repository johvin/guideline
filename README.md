# New Features Guideline (新功能指引)

[![Version npm][version]](https://www.npmjs.com/package/guideline?activeTab=versions)
[![Build Status][build]](https://travis-ci.org/johvin/guideline)
[![Dependencies][david]](https://david-dm.org/johvin/guideline)
[![License][license]](https://opensource.org/licenses/MIT)

[version]: https://img.shields.io/npm/v/guideline.svg?style=flat-square
[build]: http://img.shields.io/travis/johvin/guideline/0.2.0_bugfix.svg?style=flat-square
[david]: https://img.shields.io/david/johvin/guideline.svg?style=flat-square
[license]: https://img.shields.io/badge/License-MIT-brightgreen.svg

> This is a simple guideline tool based on which you can quickly implement new features guidelines for website users.

## Usage

There are two ways to play a guideline, a simple way and an advanced way. The simple way is an encapsulation of the advanced way which can do more setting and control the playing of guideline.

*Guideline supports using keyboard shortcuts to control playback. See the related API section for details*

### Simple way

```js
const guideline = require('guideline');

const visitTimes = parseint(localstorage.getItem('visitTimes')) || 0;

if (visitTimes === 0) {
  const guideOptions = [{
    content: 'Welcome, the new features guidelines come online !'
  }, {
    element: document.getElementById('notificationwrapper'),
    content: 'all system messages and notification is here',
    style: 'font-size: 20px; color: red;',
    position: 'top'
  }, {
    element: document.querySelector('.datepicker-hint'),
    content: 'datepicker hint will tell you the datepicker\'s date range restriction',
    position: 'bottom'
  }];

  guideline(guideOptions, function () {
    console.log('guideline is over');
  });
}
```

### Advanced way

```js
const guideline = require('guideline');

// something else ...

const guideOptions = [{
  content: 'Welcome, the new features guidelines come online !'
}, {
  element: document.getElementById('notificationwrapper'),
  content: 'all system messages and notification is here',
  style: 'font-size: 20px; color: red;',
  position: 'top'
}, {
  element: document.querySelector('.datepicker-hint'),
  content: 'datepicker hint will tell you the datepicker\'s date range restriction',
  position: 'bottom'
}];

const gl = new guideline.Guideline(guideOptions, function () {
  console.log('guideline is over');
});

// set hint text maximum width
gl.hintTextMaxWidth = 800
// set hint text font size
gl.hintFontSize = 20

// start the guideline
gl.play();

// autoplay the next hint after 3 seconds
setTimeout(function () {
  gl.next();
}, 3000);
```

## API

### guideline(configuration, callback)

This is the simple way to play a guideline which accepts two parameters whose description are listed in the relevant sections as follows.

### guideline.Guideline Constructor (configuration, callback)

This is the advanced way to play a guideline which parameters are the same as `guideline(configuration, callback)`. It will return a Guideline instance based on whose prototype's method you can do more control during the playing.

### configuration - guideline(configuration)

The configuration item should be an array, each of which is an object.

#### Configuration Subitem Object

Properties:
- element (HTMLElement, optional) : the guided element. when `element` is null, the guideline text is centered relative to the browser window.
- content (string, required) : the guideline text.
- position (string, optional, defaults to 'bottom') : used to set the location of the guideline text relative to the guided element. enumerated type，value is `'top'` or `'bottom'`.
- style (string, optional) : custom style for the guideline text.


### callback - guideline(configuration, callback)

`callback` is a function, which will be invoked when the guideline stops.

### Guideline instance properties

- hintTextMaxWidth (number, defaults to 400) : used to limit the hint text maximum width, unit is pixel.
- hintFontSize (number, defaults to 24) : used to define the hint text font size, unit is pixel.

### Guideline instance method

- play : start the guideline after doing some settings
- prev : play the previous hint
- next : play the next hint, if there's no more hint, stop the guideline and exit
- stop : stop playing the guideline

### Keyboard shortcuts

Guideline supports some keyboard shortcuts to play the next or previous hint as follows.

| keyboard | action |
| --- | --- |
| arrow right | play next |
| enter | play next |
| space | play next |
| arrow left | play previous |
| backspace | play previous |
| esc | stop playing |

## CHANGELOG

[`CHANGELOG`](./CHANGELOG.md)

## License

MIT

## References

- http://ejulianova.github.io/guides/
