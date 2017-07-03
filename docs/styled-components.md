# styled-components
[https://www.styled-components.com/docs/advanced](https://www.styled-components.com/docs/advanced)
## 为什么用这个组件
* 
## 常规写法
```
const Title = styled.h1`
	font-size: 1.5em;
	text-align: center;
	color: palevioletred;
`;
```
## 属性
```
const Button = styled.button`
	/* Adapt the colours based on primary prop */
	background: ${props => props.primary ? 'palevioletred' : 'white'};
	color: ${props => props.primary ? 'white' : 'palevioletred'};

	font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid palevioletred;
	border-radius: 3px;
`;

render(
	<div>
		<Button>Normal</Button>
		<Button primary>Primary</Button>
	</div>
);
```
##　设置任何组件的样式
```
// 一个组件
const Link = ({ className, children }) => (
	<a className={className}>
		{children}
	</a>
)

const StyledLink = styled(Link)`
	color: palevioletred;
	font-weight: bold;
`;

render(
	<div>
		<Link>Unstyled, boring Link</Link>
		<br />
		<StyledLink>Styled, exciting Link</StyledLink>
	</div>
);
```
## 扩展样式
```
const Button = styled.button`
	color: palevioletred;
	font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid palevioletred;
	border-radius: 3px;
`;

// We're extending Button with some extra styles
const TomatoButton = Button.extend`
	color: tomato;
	border-color: tomato;
`;

render(
	<div>
		<Button>Normal Button</Button>
		<TomatoButton>Tomato Button</TomatoButton>
	</div>
);
```
### withComponent 很少情况用改变元素名称
下面Link和TomatoLink会把button元素改成a元素
```
const Button = styled.button`
	display: inline-block;
	border-radius: 3px;
`;

const Link = Button.withComponent('a')

const TomatoLink = Link.extend`
	color: tomato;
	border-color: tomato;
`;

render(
	<div>
		<Button>Normal Button</Button>
		<Link>Normal Link</Link>
		<TomatoLink>Tomato Link</TomatoLink>
	</div>
);
```
##　属性
```
const Input = styled.input.attrs({
	// we can define static props
	type: 'password',

	// or we can define dynamic ones
	margin: props => props.size || '1em',
	padding: props => props.size || '1em'
})`
	color: palevioletred;
	font-size: 1em;
	border: 2px solid palevioletred;
	border-radius: 3px;

	/* here we use the dynamically computed props */
	margin: ${props => props.margin};
	padding: ${props => props.padding};
`;

render(
	<div>
		<Input placeholder="A small text input" size="1em" />
		<br />
		<Input placeholder="A bigger text input" size="2em" />
	</div>
);
```
## 动画
```
/ keyframes returns a unique name based on a hash of the contents of the keyframes
const rotate360 = keyframes`
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
`;

// Here we create a component that will rotate everything we pass in over two seconds
const Rotate = styled.div`
	display: inline-block;
	animation: ${rotate360} 2s linear infinite;
	padding: 2rem 1rem;
	font-size: 1.2rem;
`;

render(
	<Rotate>&lt; 💅 &gt;</Rotate>
)
```
## 主题
略
## Refs
```
const Input = styled.input`
	padding: 0.5em;
	margin: 0.5em;
	color: palevioletred;
	background: papayawhip;
	border: none;
	border-radius: 3px;
`;

const Form = () => (
	<Input
		placeholder="Hover here..."
		innerRef={x => this.input = x}
		onMouseEnter={() => this.input.focus()}
	/>
);

render(
	<Form />
);
```
## 媒体查询
```
const Content = styled.div`
	background: papayawhip;
	height: 3em;
	width: 3em;

	@media (max-width: 700px) {
		background: palevioletred;
	}
`;

render(
	<Content />
);
```