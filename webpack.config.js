module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "./wwwroot/js/index.bundle.js",//filename: "./wwwroot/js/[name].bundle.js" 不知道为啥显示main而不是应该显示的文件名称index
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.tsx?$/, loader: "ts-loader" }
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
        "./react": "React",
        "react-dom": "ReactDOM",
        "./ReactDOM": "ReactDOM",
        "./reactDOM": "ReactDOM"
    }
};