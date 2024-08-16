const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
const buildConf = require('./build.config')
const packageConf = require('./package.json')
const path = require('path')
/*
* npm install --save-dev compression-webpack-plugin
* */
module.exports = {
    productionSourceMap: process.env.NODE_ENV !== 'production',
    assetsDir: './',
    publicPath: './',
    outputDir: 'index',
    devServer: {
        port: 3000,
        proxy: {
            '/v1': {
                // target: 'http://127.0.0.1:4000',
                target: 'https://www.VIyour.com',
                // target: 'http://usdt-power.6666.ml',
                changeOrigin: true,
            },
            '/api': {
                target: 'http://app.vicaro.in/',
                changeOrigin: true,
            }
        }
    },
    configureWebpack:config =>{
      let resolve = {
        alias: {
          'assets': '@/assets',
        }
      }
      let optimization = {}

      if (process.env.NODE_ENV === 'production') {
        optimization = {
          /**
           * runtimeChunk可选值有：true或'multiple'或'single'
           * true或'multiple'会有每个入口对应的chunk。不过一般情况下
           * 考虑到要模块初始化，设置为single就够多数情况下使用啦。
           * 详情见官网：https://webpack.docschina.org/configuration/optimization/#optimizationruntimechunk
           * */
          runtimeChunk: 'single',
          /**
           * 以前是CommonsChunkPlugin，现在换成optimization.splitChunks。普通项目下方的配置就足够用啦
           * 详情见官网：https://webpack.docschina.org/configuration/optimization/#optimizationsplitchunks
           * */
          splitChunks: {
            chunks: 'all', // 可选值：all，async 和 initial。all功能最强大，所以咱们就使用all
            maxInitialRequests: Infinity, // 最大并行请求数，为了以防万一，设置无穷大即可
            minSize: 20000, // 引入的模块大于20kb才做代码分割，官方默认20000，这里不用修改了
            maxSize: 80000, // 若引入的模块大于80kb，则告诉webpack尝试再进行拆分
            cacheGroups: {
              vendors: {
                test: /[\\/]node_modules[\\/]/, // 使用正则匹配node_modules中引入的模块
                priority: -10, // 优先级值越大优先级越高，默认-10，不用修改
                name(module) { // 设定分包以后的文件模块名字，按照包名字替换拼接一下
                  const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                  return `npm.${packageName.replace('@', '')}`
                },
              },
            },
          }
        }
      }

      return {
        resolve: resolve,
        optimization: optimization
      }
    },
    chainWebpack(config) {
        config.when(process.env.NODE_ENV !== 'development', config => {
            config.set('externals', buildConf.cdns.reduce((p, a) => {
                p[a.name] = a.scope
                return p
            }, {}))
        })

        config.plugin('html')
            .tap(args => {
                if (buildConf.title) {
                    args[0].title = buildConf.title
                }
                if (buildConf.cdns.length > 0) {
                    args[0].cdns = buildConf.cdns.map(conf => {
                        if (conf.path) {
                            conf.js = `${buildConf.baseCdnUrl}${conf.path}`
                        } else {
                            conf.js = `${buildConf.baseCdnUrl}/${conf.name}/${packageConf.dependencies[conf.name].replace('^', '')}/${conf.name}.min.js`
                        }

                        return conf
                    })
                }
                return args
            })

        config.plugin('ScriptExtHtmlWebpackPlugin').after('html').use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /single\..*\.js$/
        }]).end()


    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtorem({
                        rootValue: 37.5,
                        propList: ['*']
                    })
                ]
            }
        }
    }
}
