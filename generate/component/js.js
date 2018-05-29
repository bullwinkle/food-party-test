module.exports = name => {
  const NameInUpperCamelCase = name
    .replace(name[0], name[0].toUpperCase())
    .replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); })
  ;

  return `import styles from './${name}.component.scss';
import template from './${name}.html';

export const ${NameInUpperCamelCase}Component = {
  template,
  styles,
  bindings: {},
  controller: class ${NameInUpperCamelCase}ComponentController {
    constructor () {
      "ngInject";
      console.log(this);
    }
  }
};



if (module.hot) module.hot.accept('./${name}.component.scss');
`
};
