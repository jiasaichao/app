const webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        bundle: [
            'react',
            'react-dom',
            //其他库
            ],
    },
    output: {
        path: path.resolve(__dirname, './build'),
        publicPath: '/',
        filename: '[name].js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            path: './build/bundle.manifest.json',
            name: '[name]_library',
            context: __dirname,
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,    // 不美化输出
            compress: {
                warnings: false, // 不保留警告
                drop_debugger: true, // 不保留调试语句
                drop_console: true // 不保留控制台输出信息
            },
            mangle: {           // 跳过这些，不改变命名
                except: ['$super', '$', 'exports', 'require']
            },
            space_colon: false,
            comments: false     // 不保留注释
        }),
    ]
};
