## Carousel组件
### Properties

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| selectedIndex |  手动设置当前显示的索引  |  number  |  0  |
| dots | 是否显示面板指示点 | Boolean   | true |
| vertical | 垂直显示(web 为内容，rn 为 pagination) | Boolean   | false |
| autoplay | 是否自动切换 | Boolean   | false |
| infinite | 是否循环播放 | Boolean   | false |
| afterChange  | 切换面板后的回调函数     | (current: number): void  | 无
| dotStyle  | 指示点样式    | Object  | 无
| dotActiveStyle  | 当前激活的指示点样式     | Object  | 无
| easing (`web only`) | 缓动函数，你可以使用[这里](https://github.com/chenglou/tween-functions)提供的其他函数 | Function   | easeOutCirc |
| swipeSpeed  (`web only`)     | 滑动灵敏度     |  number | 5
| beforeChange  (`web only`)     | 切换面板前的回调函数     | (from: number, to: number): void | 无
| onScrollBeginDrag (`rn only`) | 见 react-native scrollView onScrollBeginDrag | (): void | 无 |
| bounces (`rn only`) | 见 react-native scrollView bounces       |   Boolean      | true |
| pagination (`rn only`) | 自定义 pagination     |   (props) => React.ReactNode      |  |
### 源代码
```js
<Carousel
      autoplay={false}
      selectedIndex={0}
      swipeSpeed={35}
      beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
      afterChange={index => console.log('slide to', index)}
    >
      <Flex style={{ height: 200, background: '#ff00ff' }}>

      </Flex>
      <Flex style={{ height: 200, background: '#ff003d' }}>

      </Flex>
      <Flex style={{ height: 200, background: '#3d3dff' }}>

      </Flex>
</Carousel>
```