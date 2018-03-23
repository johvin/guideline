# New Features Guideline (新功能指引)

[![Version npm][version]](https://www.npmjs.com/package/guideline?activeTab=versions)
[![Dependencies][david]](https://david-dm.org/johvin/guideline)
[![License][license]](https://opensource.org/licenses/MIT)

[version]: https://img.shields.io/npm/v/guideline.svg?style=flat-square
[david]: https://img.shields.io/david/johvin/guideline.svg?style=flat-square
[license]: https://img.shields.io/badge/License-MIT-brightgreen.svg

> this project is designed for websites to guide their users to be familiar with new features that are available online.

## Usage

```js
const guideline = require('guideline');

const visitTimes = parseint(localstorage.getItem('visitTimes')) || 0;

if (visitTimes === 0) {
  guideline([{
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
  }], function () {
    console.log('guideline is over');
  });
}
```

## API

### configuration - guideline(configuration)

The configuration item should be an array, each of which is an object.

#### Configuration Subitem Object

Properties:
- element (HTMLElement, optional) : the guided element. when `element` is null, the guideline text is centered relative to the browser window.
- content (string, required) : the guideline text.
- position (string, optional, defaults to 'bottom') : used to set the location of the guideline text relative to the guided element. enumerated type，value is `'top'` or `'bottom'`.
- style (string, optional) : custom style for the guideline text.


### callback - guideline(configuration, callback)

callback is a function, which will be invoked when the guideline stops.

## License

MIT
