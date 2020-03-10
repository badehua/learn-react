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
  fixBabelImports,
  addDecoratorsLegacy
} = require("customize-cra");

module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css'
    }),
    addDecoratorsLegacy() // 使用装饰器时报错，添加此代码并启用experimentalDecorators配置
  )
};