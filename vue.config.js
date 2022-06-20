const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
const buildConf = require('./build.config')
const packageConf = require('./package.json')
const path = require('path')

module.exports = {
    productionSourceMap: process.env.NODE_ENV !== 'production',
    assetsDir: './',
    publicPath: './',
    outputDir: 'index',
    devServer: {
        port: 12345,
        proxy: {
            '/v1': {
                target: 'http://192.168.100.6:8087',
                // target: 'http://usdt-power.6666.ml',
                changeOrigin: true,
            },
            '/api': {
                target: 'http://app.vicaro.in/',
                changeOrigin: true,
            }
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
            }
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
