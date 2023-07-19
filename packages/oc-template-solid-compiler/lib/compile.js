'use strict';

const createCompile = require('oc-generic-template-compiler').createCompile;
const compileStatics = require('oc-statics-compiler');
const getInfo = require('oc-template-solid').getInfo;
const solid = require('vite-plugin-solid');
const { viteView, viteServer } = require('oc-vite-compiler');

const verifyTypeScriptSetup = require('./verifyConfig');
const solidOCProviderTemplate = require('./solidOCProviderTemplate');
const htmlTemplate = require('./htmlTemplate');

const compiler = createCompile({
  compileView: (options, cb) =>
    viteView(
      {
        ...options,
        plugins: [solid()],
        viewWrapper: ({ viewPath }) => solidOCProviderTemplate({ viewPath }),
        htmlTemplate,
        externals: getInfo().externals
      },
      cb
    ),
  compileServer: viteServer,
  compileStatics,
  getInfo
});

const hasTsExtension = (file) => !!file.match(/\.tsx?$/);

// OPTIONS
// =======
// componentPath
// componentPackage,
// logger,
// minify
// ocPackage
// publishPath
// verbose,
// watch,
// production
module.exports = function compile(options, callback) {
  const viewFileName = options.componentPackage.oc.files.template.src;
  const serverFileName = options.componentPackage.oc.files.data;
  const usingTypescript = hasTsExtension(viewFileName) || hasTsExtension(serverFileName);

  if (usingTypescript) {
    verifyTypeScriptSetup(options.componentPath);
  }

  return compiler(options, callback);
};
