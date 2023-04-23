// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => ({
        ...options,
        compilerOptions: {
          isCustomElement: tagName => {
            return tagName === 'vue-advanced-chat' || tagName === 'emoji-picker'
          }
        }
      }))
  }
}

