const FILE_TEMPLATES = {
  '.component.js': require('./js'),
  '.component.scss': require('./scss'),
  '.html': require('./html')
};

const path = require('path');
const fs = require('fs');

const [componentPathArg = '', componentPrefix = 'app'] = process.argv.slice(2);
if (!componentPathArg) return logWrongUsage();

const componentPathArgArray = componentPathArg.split('/');

const componentName = `${componentPrefix}-${componentPathArgArray.slice(-1)[0]}`;
const componentPath = path.join(process.cwd(), componentPathArgArray.slice(0, -1).join('/'));
const componentDirectoryPath = path.join(componentPath, componentName);

if (!componentName) {
  console.warn('no component name'); return logWrongUsage();
}
if (!componentPath) {
  console.warn('no component path'); return logWrongUsage();
}

fs.mkdir(componentDirectoryPath, (err) => {
  if (err && err.code !== 'EEXIST') return console.warn('error creating component directory', err);
  const renderedObj = renderTemplates(FILE_TEMPLATES, componentName);
  console.log(renderedObj);
  writeRenderedFiles(
    renderedObj,
    componentDirectoryPath,
    componentName
  );
});


function renderTemplates(templatesObj = {}, componentName = '') {
  return Object.keys(templatesObj)
    .reduce((result, next) => ({
      ...result,
      [next]: templatesObj[next](componentName)
    }), {})
}

function writeRenderedFiles(filesObject = {}, componentPath = '', componentName) {
  Object.keys(filesObject)
    .forEach(fileExt => {
      const filePath = path.join(componentPath, `${componentName}${fileExt}`);
      const fileData = filesObject[fileExt];
      fs.writeFile(filePath, fileData, (err) => {
        if (err) return console.warn('error writing file', filePath)
      });
    })
}

function logWrongUsage() {
  return console.warn(`usage:
    node ./generate/component ./path/to/component/my-component-name
  `);
}