## Animate
用于对任何单个对象进行动画处理的组件。
### Props
* data={ Object } | 必填  
要进行动画处理的键的对象。当这些值被更改时, 此对象中的每个值都将被内插 (除非在忽略支柱中找到它的键)
* default={ Object }
动画初始状态
* duration={ Number } | 500
The duration in milliseconds for each item to animate
* easing={ string | function } | easeCubicOut
A string that references a d3-ease function, or a custom easing function that receives a progress decimal and returns a new progress decimal.
* onRest={ Function } | () => null
A function that is called every time the animation sequence is completed.
* ignore={ []String } | false
Any keys found in this array will not be interpolated, and instead will be immediately set to the new value
* flexDuration={ Boolean } | false
Avoid dropping frames at all cost by dynamically increasing the duration of the animation loop becomes overwhelmed.
* immutable={ Boolean } | true
By default, strict equality === between the old data and new data is used to detect when an animation should occur. If you wish, you can disable immutable mode which falls back to using JSON.stringify to determine if an animation should occur.