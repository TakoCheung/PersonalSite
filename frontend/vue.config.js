// vue.config.js
// module.exports = {
//   chainWebpack: config => {
//     config.module
//       .rule('vue')
//       .use('vue-loader')
//       .tap(options => ({
//         ...options,
//         compilerOptions: {
//           isCustomElement: tagName => {
//             return tagName === 'vue-advanced-chat' || tagName === 'emoji-picker'
//           }
//         }
//       }))
//   }
// }

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    client: {
      progress: true
    },
  }
})