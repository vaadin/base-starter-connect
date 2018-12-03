if (intern.environment === 'node') {
  // Enable ES modules transpilation, including dependencies
  // from `node_modules/@vaadin` under current working directory.
  const babelPackageOpts = require('../../package.json').babel;
  const path = require('path');
  require('@babel/register')(Object.assign({}, babelPackageOpts, {
    ignore: [
      filepath => {
        const cwd = process.cwd();
        if (!filepath.startsWith(cwd)) {
          return false;
        }

        filepath = filepath.slice(cwd.length);
        const parts = filepath.split(path.sep);
        const nodeModulesIndex = parts.indexOf('node_modules');
        return nodeModulesIndex > -1 &&
          parts[nodeModulesIndex + 1] !== '@vaadin';
      }
    ]
  }));

  // Provide proxyquire to enable mocking dependencies in unit tests
  intern.registerPlugin('proxyquire', () => {
    const proxyquire = require('proxyquire');
    return {proxyquire};
  });

  // Provide Sinon.JS stubbing/mocking framework for unit tests
  intern.registerPlugin('sinon', () => {
    const chai = intern.getPlugin('chai');
    const sinon = require('sinon');
    chai.use(require('sinon-chai'));
    return {sinon};
  });
}
