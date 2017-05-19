# html-webpack-plugin
插件地址：https://www.npmjs.com/package/html-webpack-plugin  
这个插件用来简化创建服务于 webpack bundle 的 HTML 文件，尤其是对于在文件名中包含了 hash 值，而这个值在每次编译的时候都发生变化的情况。你既可以让这个插件来帮助你自动生成 HTML 文件，也可以使用 lodash 模板加载生成的 bundles，或者自己加载这些 bundles。
## Installation
使用 npm 安装这个插件 `npm install html-webpack-plugin@2 --save-dev`
## Basic Usage
这个插件可以帮助生成 HTML 文件，在 body 元素中，使用 script 来包含所有你的 webpack bundles，只需要在你的 webpack 配置文件中如下配置：
```
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpackConfig = {
  entry: 'index.js',
  output: {
    path: 'dist',
    filename: 'index_bundle.js'
  },
  plugins: [new HtmlWebpackPlugin()]
}
```
这将会自动在 dist 目录中生成一个名为 index.html 的文件，内容如下：
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Webpack App</title>
  </head>
  <body>
    <script src="index_bundle.js"></script> 
  </body>
</html>
```
如果你有多个 webpack 入口点，它们都会被包含在生成的 script 元素中。

如果有任何的 CSS 资源包含在 webpack 输出中（例如，使用 ExtractTextPlugin 提炼出的 css ），这些将会使用 link 包含在 HTML 页面的 head 元素中。
## Configuration
可以进行一系列的配置，支持如下的配置信息

* title: 用来生成页面的 title 元素
* filename: 输出的 HTML 文件名，默认是 index.html, 也可以直接配置带有子目录。
* template: 模板文件路径，支持加载器，比如 html!./index.html
* inject: true | 'head' | 'body' | false  ,注入所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
* favicon: 添加特定的 favicon 路径到输出的 HTML 文件中。
* minify: {} | false , 传递 html-minifier 选项给 minify 输出
* hash: true | false, 如果为 true, 将添加一个唯一的 webpack 编译 hash 到所有包含的脚本和 CSS 文件，对于解除 cache 很有用。
* cache: true | false，如果为 true, 这是默认值，仅仅在文件修改之后才会发布文件。
* showErrors: true | false, 如果为 true, 这是默认值，错误信息会写入到 HTML 页面中
* chunks: 允许只添加某些块 (比如，仅仅 unit test 块)
* chunksSortMode: 允许控制块在添加到页面之前的排序方式，支持的值：'none' | 'default' | {function}-default:'auto'
* excludeChunks: 允许跳过某些块，(比如，跳过单元测试的块)  

下面的示例演示了如何使用这些配置。

```
{
  entry: 'index.js',
  output: {
    path: 'dist',
    filename: 'index_bundle.js',
    hash: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      filename: 'assets/admin.html'
    })
  ]
}
```
 

 

## 生成多个 HTML 文件    
通过在配置文件中添加多次这个插件，来生成多个 HTML 文件。

```
{
  entry: 'index.js',
  output: {
    path: 'dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin(), // Generates default index.html 
    new HtmlWebpackPlugin({  // Also generate a test.html 
      filename: 'test.html',
      template: 'src/assets/test.html'
    })
  ]
}
```
 

 

##　编写自定义模板
如果默认生成的 HTML 文件不适合你的需要看，可以创建自己定义的模板。方便的方式是通过 inject 选项，然后传递给定制的 HTML 文件。html-webpack-plugin 将会自动注入所有需要的 CSS, js, manifest 和 favicon 文件到标记中。

```
plugins: [
  new HtmlWebpackPlugin({
    title: 'Custom template',
    template: 'my-index.html', // Load a custom template 
    inject: 'body' // Inject all scripts into the body 
  })
]
```
 

my-index.html 文件

```
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
  </body>
</html>
```
 

如果你有模板加载器，可以使用它来解析这个模板。

```
module: {
  loaders: [
    { test: /\.hbs$/, loader: "handlebars" }
  ]
},
plugins: [
  new HtmlWebpackPlugin({
    title: 'Custom template using Handlebars',
    template: 'my-index.hbs',
    inject: 'body'
  })
]
```
 

另外，如果你的模式是一个字符串，可以使用 templateContent 传递它。
```
plugins: [
  new HtmlWebpackPlugin({
    inject: true,
    templateContent: templateContentString
  })
]
```

如果 inject 特性不适合你的需要，你希望完全控制资源放置。 可以直接使用 lodash 语法，使用  default template 作为起点创建自己的模板。

templateContent 选项也可以是一个函数，以便使用其它语言，比如 jade：

```
plugins: [
  new HtmlWebpackPlugin({
    templateContent: function(templateParams, compilation) {
      // Return your template content synchronously here 
      return '..';
    }
  })
]
```
 

或者异步版本

```
plugins: [
  new HtmlWebpackPlugin({
    templateContent: function(templateParams, compilation, callback) {
      // Return your template content asynchronously here 
      callback(null, '..');
    }
  })
]
```
 

注意，如果同时使用 template 和 templateContent ，插件会抛出错误。

变量 o 在模板中是在渲染时传递进来的数据，这个变量有如下的属性：

htmlWebpackPlugin: 这个插件的相关数据
　　htmlWebpackPlugin.files: 资源的块名，来自 webpack 的 stats 对象，包含来自 entry 的从 entry point name 到 bundle 文件名映射。
```
"htmlWebpackPlugin": {
  "files": {
    "css": [ "main.css" ],
    "js": [ "assets/head_bundle.js", "assets/main_bundle.js"],
    "chunks": {
      "head": {
        "entry": "assets/head_bundle.js",
        "css": [ "main.css" ]
      },
      "main": {
        "entry": "assets/main_bundle.js",
        "css": []
      },
    }
  }
}
```
 如果在 webpack 配置文件中，你配置了 publicPath，将会反射正确的资源

htmlWebpackPlugin.options: 传递给插件的配置。
webpack: webpack 的 stats 对象。
webpackConfig: webpack 配置信息。
过滤块
可以使用 chunks 来限定特定的块。
```
plugins: [
  new HtmlWebpackPlugin({
    chunks: ['app']
  })
]
```

还可以使用 excludeChunks 来排除特定块。
```
plugins: [
  new HtmlWebpackPlugin({
    excludeChunks: ['dev-helper']
  })
]
```

事件
通过事件允许其它插件来扩展 HTML。
```
html-webpack-plugin-before-html-processing
html-webpack-plugin-after-html-processing
html-webpack-plugin-after-emit
```
使用方式：
```
compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
  htmlPluginData.html += 'The magic footer';
  callback();
});
```
## 参考链接
[http://www.cnblogs.com/haogj/p/5160821.html](http://www.cnblogs.com/haogj/p/5160821.html)
[http://www.cnblogs.com/haogj/p/5649670.html](http://www.cnblogs.com/haogj/p/5649670.html)