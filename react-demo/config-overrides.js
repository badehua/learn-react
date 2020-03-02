// const { injectBabelPlugin } = require('react-app-rewired')
// module.exports = function override(config, env) {
//   config = injectBabelPlugin(
//     ["import", {libraryName: 'antd', libraryDirectory: 'es', style: 'css'}],
//     config
//   )
//   return config
// }

// The "injectBabelPlugin" helper has been deprecated as of v2.0. 
// You can use customize-cra plugins in replacement
const {
  override,
  fixBabelImports
} = require("customize-cra");

module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css'
    })
  )
};