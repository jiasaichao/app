## 路径
### 画矩形
#### 填充颜色的矩形
* fillRect(x,y,width,height); 方法绘制“已填色”的矩形。默认的填充颜色是黑色。
* fillStyle 设置填充颜色;
画两个矩形实例
``` javascript
var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	ctx.fillStyle="#FF0000";
	ctx.fillRect(0,0,150,75);
	ctx.fillStyle="#FFFF00";
	ctx.fillRect(10,00,150,75);
```
### 画圆形（或部分圆）jquery.GesturePasswd
* arc(x,y,r,sAngle,eAngle,counterclockwise)
  * x	圆的中心的 x 坐标。
  * y	圆的中心的 y 坐标。
  * r	圆的半径。
  * sAngle	起始角，以弧度计。（弧的圆形的三点钟位置是 0 度）。
  * eAngle	结束角，以弧度计。
counterclockwise	可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。   

![](http://www.w3school.com.cn/i/arc.gif)
```
arc(100,75,50,0*Math.PI,1.5*Math.PI)
```
实例
``` javascript
ctx.beginPath();
ctx.lineWidth=10;//圆边框宽度
ctx.strokeStyle='#0000FF'//颜色
ctx.arc(50,50,50,0,2*Math.PI);
ctx.stroke();
```
### 划线
* moveTo(x,y) 定义线条开始坐标
* lineTo(x,y) 定义线条结束坐标