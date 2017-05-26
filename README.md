## 程序目录

```
.
├── build                    # 编译后文件所在目录
│   ├── dev                  # 开发环境编译后目录
|   └── prod                 # 生产环境编译后目录
├── docs                     # 文档
├── src                      # 程序源文件
│   ├── assets               # 静态文件
│   ├── components           # 全局可复用的表现组件(Presentational Components)
│   ├── containers           # 全局可复用的容器组件
│   ├── store                # Redux指定块
│   │   ├── createStore.js   # 创建和使用redux store
│   │   └── reducers.js      # Reducer注册和注入
│   ├── routes               # 主路由和异步分割点
│   │   ├── index.js         # 用store启动主程序路由
│   │   ├── Root.js          # 为上下文providers包住组件
│   │   └── Home             # 不规则路由
│   │       ├── index.js     # 路由定义和代码异步分割
│   │       ├── assets       # 组件引入的静态资源
│   │       ├── components   # 直观React组件
│   │       ├── container    # 连接actions和store
│   │       ├── modules      # reducers/constants/actions的集合
│   │       └── routes **    # 不规则子路由(** 可选择的)
│   └── template             # 模板文件生成build用
└── tests                    # 单元测试
```