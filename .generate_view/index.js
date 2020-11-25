const fs = require('fs');
const { view, test } = require('./view_templates.js');

// grab view name from terminal argument
const [name] = process.argv.slice(2);
if (!name) throw new Error('You must include a view name.');

const dir = `./src/views/${name}/`;

// throw an error if the file already exists
if (fs.existsSync(dir)) throw new Error('A view with that name already exists.'); 

// create the folder
fs.mkdirSync(dir);

function writeFileErrorHandler(err) {
  if (err) throw err;
}

// view.js
fs.writeFile(`${dir}/${name}.js`, view(name), writeFileErrorHandler);
// test.js
fs.writeFile(`${dir}/${name}.test.js`, test(name), writeFileErrorHandler);
// index.css
fs.writeFile(`${dir}/${name}.css`, '', writeFileErrorHandler);
