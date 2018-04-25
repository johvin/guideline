const fs = require('fs');
const adjustMD = require('adjust-md-for-publish');

adjustMD({
  filename: 'README.md',
  destname: 'dist/README.md',
  filterSection: [
    'CHANGELOG',
    'References'
  ]
});

function makePkg() {
  const pkg = require('../package.json');
  pkg.main = 'guideline.js';
  fs.writeFileSync(`dist/package.json`, JSON.stringify(pkg, null, 2));
}

makePkg();

console.log('\n\npackage.json and README are both ready !!!');
