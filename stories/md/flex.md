## Flex组件
### Properties

| 属性    | 说明 | 类型 | 默认值 | 必填 |
|-------------|------|----------|--------------|------------|
| className   | 样式名称 | string     | -            |            |
| style       | 样式 | object   | -            |          |
| column      | 垂直排列 | bool     | -            |            |
| horizontal  | 水平居中对齐 | bool     | -            |            |
| vertical    | 垂直居中对齐 | bool   | -            |           |
| HW          | 水平和垂直都居中对齐 | bool     | -            |            |
| flex1       | flex-grow为1，就是放大倍数为1 | bool   | -            |          |
### 源代码
```js
<Page>
      <Flex style={object('Styles', { height: '2rem', border: '1px solid red' })}
        column={boolean('column', false)}
        flex1={boolean('flex1', false)}
        horizontal={boolean('horizontal', false)}
        HW={boolean('HW', false)}
        vertical={boolean('vertical', false)}
        className={text('className', '')}
      ><span>span1</span><span>span2</span></Flex>
</Page>
```