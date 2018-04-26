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

makePkg();

fs.writeFileSync('dist/guideline.js', fs.readFileSync('index.js'));

function makePkg() {
  const pkg = require('../package.json');
  pkg.main = 'guideline.js';
  fs.writeFileSync(`dist/package.json`, JSON.stringify(pkg, null, 2));
}


console.log('\n\npackage.json and README are both ready !!!');
