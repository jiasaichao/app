var webpack = require('webpack');
var path = require('path');
//const ip = require('ip').address();
module.exports = {
    entry: {
        index: [
            // 'react-hot-loader/patch',
            // 'webpack-dev-server/client?http://' + ip + ':8094',
            // 'webpack/hot/only-dev-server',
            "./src/index.jsx"
        ],
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, './wwwroot/js'),
        filename: "[name].bundle.js"
    },
    // output: {
    //     path: path.resolve(__dirname, './wwwroot/js'),
    //     filename: "[name].[chunkHash:8].js",
    //     publicPath: '',
    //     chunkFilename: "[name].[chunkHash:8].js",
    // },
    //
    //  plugins: [
    //         /**DefinePlugin 允许您创建可以在编译时配置的全局常量。这可以让开发版本和发布版本之间的不同行为非常有用。
    //          * 例如，你可能使用全局常量可以确定是否记录所需的地方;也许你执行日志记录在开发版本中但不是在发布版本中。这是这种场面 DefinePlugin 方便。
    //          * http://webpack.github.io/docs/list-of-plugins.html#defineplugin
    //         */
    //         new webpack.DefinePlugin({
    //             PRODUCTION: true,
    //         })
    //     ],
    plugins: [
        // 单独打包输出第三方组件，和webpack生成的运行时代码
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor'/*,'manifest'*/]
        }),
    ],
    // Enable sourcemaps for debugging webpack's output.
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx"]
    },
 devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules|bower_components/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                options: {
                    runtimeCompat: true
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            }
        ]

        // preLoaders: [
        //     // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        //     { test: /\.js$/, loader: "source-map-loader" }
        // ]
    },
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
