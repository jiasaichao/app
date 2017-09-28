## Page组件
### Properties

|   属性    |     说明     |  类型  | 默认值  | 必填 |
| --------- | ------------ | ------ | ------- | ---- |
| className | 样式名称     | string | -       |      |
| style     | 样式         | object | -       |      |
| title     | 标题         | string | -       |      |
| backName  | 返回名称     | string | -       |      |
| headBg    | 头部背景色   | string | #108ee9 |      |
| headColor | 头部文字颜色 | string | #fff    |      |
### 源代码
```js
<Page headBg='#108ee9' headColor='#fff' backName='返回' title='page-页面'>
      <p>布局在一个100%宽和高，且溢出隐藏的body里，为了方便与统一布sd局</p>
</Page>
```