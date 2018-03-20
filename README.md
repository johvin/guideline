## New Features Guideline (新功能指引)

> this project is designed to guide users to new features that are available online.

### Demo

```js
const guideline = require('guideline');

const visittimes = parseint(localstorage.getitem('visittimess')) || 0;

if (visittimes === 0) {
  guideline([{
    element: document.getElementById('notificationwrapper'),
    content: 'all system messages and notification is here',
    style: 'color: red',
    position: 'bottom'
  }, {
    element: document.querySelector('.datepicker-hint'),
    content: 'datepicker hint will tell you the datepicker\'s date range restriction',
    position: 'bottom'
  }], function () {
    console.log('guideline is over');
  });
}
```

### References

- http://ejulianova.github.io/guides/