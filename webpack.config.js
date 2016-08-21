var webpack = require('webpack');
var path = require('path');
module.exports = {
    entry: {
        index: "./src/index.jsx",
        //vendor: ['react', 'react-dom', 'react-router']
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
    // plugins: [
    //     new webpack.optimize.CommonsChunkPlugin({
    //         names: ['vendor'/*,'manifest'*/],
    //     }),
    // ],
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx"]
    },

    module: {
        loaders: [
            {
        test: /\.svg$/,
        loader: 'svg-sprite'
      },
            {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
          query: {
             presets: ['react', 'es2015', 'stage-0']
          }
        },
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.tsx?$/, loader: "ts-loader" },
             {
        test: /\.js$/,
        exclude: /node_modules/,
          loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
          query: {
             presets: ['react', 'es2015', 'stage-0']
          }
      }
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    // When importing a module whose path matches one of the following, just assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our dependencies, which allows browsers to cache those libraries between builds.
    // 当导入的模块的路径与匹配下列内容之一，只是承担相应的全局变量存在并改用该。这是重要的因为它可以使我们避免捆绑所有我们依赖项，允许浏览器缓存这些库生成之间。
    externals: {
        "react": "React",
        "./React": "React",
        "react-dom": "ReactDOM",
        "./ReactDOM": "ReactDOM"
    }
};