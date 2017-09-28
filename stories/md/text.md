## Text 文本组件
### Properties

| 属性    | 说明 | 类型 | 默认值 | 必填 |
|-------------|------|----------|--------------|------------|
| className   | 样式名称 | string     | -            |            |
| style       | 样式 | object   | -            |          |
| label       | 要显示的文字 | string     | -            |            |
| color       | 字体颜色 | string     | -            |            |
| fontSize    | 字体大小 | string   | -            |           |
| bold        | 是否加粗 | bool   | false            |           |
### 源代码
```js
<Page>
      <Text label='文字名称' color='#ff00ff' fontSize='.28rem' style={{  border: '1px solid red' }}/>
</Page>
```