const CracoLessPlugin = require('craco-less');
const {
    whenDev,
    whenProd,
    when
} = require('@craco/craco')
const CracoVtkPlugin = require("craco-vtk");
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const {
    BundleAnalyzerPlugin
} = require("webpack-bundle-analyzer");
const FastRefreshCracoPlugin = require('craco-fast-refresh')
const reactHotReloadPlugin = require('craco-plugin-react-hot-reload')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const webpack = require('webpack');
const path = require('path');
module.exports = {  
    babel: {
        presets: [
            [
                '@babel/preset-env',
                {
                    modules: false, // 对ES6的模块文件不做转化，以便使用tree shaking、sideEffects等
                    useBuiltIns: 'entry', // browserslist环境不支持的所有垫片都导入
                    corejs: {
                        version: 3, // 使用core-js@3
                        proposals: true,
                    },
                },
            ],
        ],
        // plugins: [
        //     ['import', {
        //         libraryName: 'antd',
        //         libraryDirectory: 'es',
        //         style: 'css'
        //     }],
        //     ['@babel/plugin-proposal-decorators', {
        //         legacy: true
        //     }]
        // ]
    },
    webpack: {
        alias: {
            "@": path.resolve("src"),
            "@img":path.resolve("src/static"),
            "@page":path.resolve("src/pages")
        },
        plugins: [
            // new webpack.HotModuleReplacementPlugin(),
            new DashboardPlugin(),
            new AntdDayjsWebpackPlugin(),
            ...whenProd(() => [
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            warnings: false,
                            drop_debugger: true,
                            drop_console: true,
                        },
                    },
                    sourceMap: false,
                    parallel: true,
                }),
                // new CompressionWebpackPlugin({
                //     algorithm: 'gzip',
                //     test: new RegExp(
                //         '\\.(' + ['js', 'css'].join('|') +
                //         ')$'
                //     ),
                //     threshold: 1024,
                //     minRatio: 0.8
                // }),
                new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

                new BundleAnalyzerPlugin(),
                new SimpleProgressWebpackPlugin(),

            ], [])

        ],
        //抽离公用模块
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        chunks: 'initial',
                        minChunks: 2,
                        maxInitialRequests: 5,
                        minSize: 0
                    },
                    vendor: {
                        test: /node_modules/,
                        chunks: 'initial',
                        name: 'vendor',
                        priority: 10,
                        enforce: true

                    }
                }
            }
        },
        configure: (webpackConfig, {
            env,
            paths
        }) => {
            paths.appBuild = 'dist' // 配合输出打包修改文件目录
            webpackConfig.output = {
                ...webpackConfig.output,
                path: path.resolve(__dirname, 'dist'), // 修改输出文件目录
                publicPath: '/'
            }
            return webpackConfig
        }
    },
    plugins: [{
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#ff5400'
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
        {
            plugin: CracoVtkPlugin()
        },
    ],
    devServer: {
        port: 7000,
        // proxy: {
        //     '/api': {
        //         target: 'https://placeholder.com/',
        //         changeOrigin: true,
        //         secure: false,
        //         xfwd: false,
        //     }
        // }
    }
};