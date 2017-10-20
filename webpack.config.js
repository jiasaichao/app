var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// `npm install ip` 获取本机 ip 用于配置服务器
const ip = require('ip').address();
const port = '8099';
module.exports = {
    entry: {
        index: [
            'react-hot-loader/patch',
            // 开启 React 代码的模块热替换(HMR)

            'webpack-dev-server/client?http://' + ip + ':' + port,
            // 为 webpack-dev-server 的环境打包代码
            // 然后连接到指定服务器域名与端口，可以换成本机ip

            'webpack/hot/only-dev-server',
            // 为热替换(HMR)打包好代码
            // only- 意味着只有成功更新运行代码才会执行热替换(HMR)


            './src/dev.jsx'
            // 我们 app 的入口文件
        ],
        vendor: ['react', 'react-dom', 'react-router-dom', 'react-hot-loader']
    },
    output: {
        path: path.resolve(__dirname, './build/dev'),
        publicPath: '/',
        filename: '[name].bundle.js'
    },
    // output: {
    //     path: path.resolve(__dirname, './wwwroot/js'),
    //     filename: "[name].[chunkHash:8].js",
    //     publicPath: '',
    //     chunkFilename: "[name].[chunkHash:8].js",
    // },
    //
    // plugins: [
    //     new webpack.optimize.CommonsChunkPlugin({
    //         names: ['vendor'/*,'manifest'*/],
    //     }),
    // ],
    // Enable sourcemaps for debugging webpack's output.
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ['vendor'/*,'manifest'*/],
        // }),
        new HtmlWebpackPlugin({
            templateContent: '<!DOCTYPE html><html>' +
            '<head>' +
            '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>' +
            '<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">' +
            '<link href="css/global.css" rel="stylesheet" />' +
            '<link href="css/kitchen-sink.css" rel="stylesheet" />' +
            '<title></title>' +
            '<meta charset="utf-8" />' +
            '</head>' +
            '<body>' +
            '<div id="app"></div>' +
            '<script src="js/cdoJS/Utility.js"></script>' +
            '<script src="js/cdoJS/CDO.js"></script>' +
            '<script src="js/cdoJS/HttpClient.js"></script>' +
            '<script src="js/cdoJS/MD5.js"></script>' +
            '<script src="js/ClientEngine.js"></script>' +
            //'<script type="text/javascript" src="js/vendor.bundle.js"></script>'+
            //'<script src="js/index.bundle.js"></script>'+
            '<script type="text/javascript">' +
            '</script>' +
            '</body>' +
            '</html>'
            // template: path.resolve(__dirname, './src/template/index.html'),
            // inject: 'body'
        }),
        new webpack.HotModuleReplacementPlugin(),
        // 开启全局的模块热替换(HMR)
        new webpack.NamedModulesPlugin(),
        // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ],
    devtool: "source-map",
    devServer: {    // 开启服务器
        contentBase: path.resolve(__dirname, './build/dev'),
        publicPath: '/',
        historyApiFallback: true,
        clientLogLevel: 'none',
        host: ip,
        port: port,
        open: true,
        hot: true,
        inline: true,
        compress: true,
        stats: {
            colors: true,
            errors: true,
            warnings: true,
            modules: false,
            chunks: false
        }
    },
    resolve: {
        // 用于查找模块的目录
        extensions: [
            '.js', '.json', '.jsx'
        ]
        // 使用的扩展名
    },
    module: {
        // loaders: [] // 2.x 兼容
        rules: [    // rules 代替 loaders 
            // {
            //     enforce: 'pre',  // 前置执行
            //     test: /\.(js|jsx)$/,
            //     include: APP_PATH,
            //     loader: 'eslint-loader',
            //     options: {
            //         configFile: defPath.ESLINT_PATH   // 指定 eslint 的配置文件路径
            //     }
            // },
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, './src'),
                loader: 'babel-loader'
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                include: path.resolve(__dirname, './src/assets/svg'),
                // options: {
                //     runtimeCompat: true
                // }
            }, {
                test: /\.(png|jpg)$/,
                loader: "url-loader?limit=8192"
              }, {
                test: /\.css$/,
                loader: "css-loader"
            }
            // {
            //     test: /\.(js|jsx)$/,
            //     use: ["source-map-loader"],
            //     enforce: "pre"
            // }
            // {   // 向应用特定文件中注入变量，应用中可以直接使用 baseUrl
            //     test: require.resolve(defPath.REQUEST_PATH),
            //     loader: 'imports-loader?baseUrl=>' + JSON.stringify(API[process.env.NODE_ENV || 'development'])
            // }
        ]
    },
    // module: {
    //     loaders: [
    //         {
    //             test: /\.svg$/,
    //             loader: 'svg-sprite'
    //         },
    //         {
    //             test: /\.jsx?$/,
    //             exclude: /(node_modules|bower_components)/,
    //             loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
    //             query: {
    //                 presets: ['react', 'es2015', 'stage-0']
    //             }
    //         },
    //         // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
    //         { test: /\.tsx?$/, loader: "ts-loader" },
    //         {
    //             test: /\.js$/,
    //             exclude: /node_modules/,
    //             loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
    //             query: {
    //                 presets: ['react', 'es2015', 'stage-0']
    //             }
    //         }
    //     ],

    //     preLoaders: [
    //         // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
    //         { test: /\.js$/, loader: "source-map-loader" }
    //     ]
    // },
    // When importing a module whose path matches one of the following, just assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our dependencies, which allows browsers to cache those libraries between builds.
    // 当导入的模块的路径与匹配下列内容之一，只是承担相应的全局变量存在并改用该。这是重要的因为它可以使我们避免捆绑所有我们依赖项，允许浏览器缓存这些库生成之间。
    // externals: {
    //     "react": "React",
    //     "./React": "React",
    //     "react-dom": "ReactDOM",
    //     "./ReactDOM": "ReactDOM"
    // }
};