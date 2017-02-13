import { NavBar, List, Container, Button, Icon, Animate, Gesture } from "../components/index";
import React from 'react';
import { Motion, spring } from 'react-motion';
class Sort extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {

        return (
            <div>
                {this.props.items.map((value, index) => {
                    return React.cloneElement(this.props.children(value, index), {
                        'data-sortid': index, key: index, onDropCapture: this.drop, onDragLeaveCapture: this.dragleave,
                        onDragOverCapture: this.dragover, onDragEnterCapture: this.dragenter,
                        onDragCapture: this.drag, onDragStartCapture: this.dragstart, draggable: 'true'
                    });
                })}
            </div>
        )
    }
    dragstart = (e) => {
        //debugger;
        //dataTransfer.setData()方法设置数据类型和拖动的数据
        e.dataTransfer.setData("number", e.target.dataset.sortid);
        console.log('拖动开始', e.target.innerHTML);
    }
    drag = (e) => {
        //console.log('拖动到了本元素', e.target.innerHTML);
    }
    dragenter = (e) => {
        e.target.style.fontSize = '28px'
        console.log('拖入元素', e.target.innerHTML);
    }
    dragleave = (e) => {
        e.target.style.fontSize = '16px'
        console.log('离开拖动元素', e.target.innerHTML);
    }
    dragover = (e) => {
        e.preventDefault();
        //console.log('可被释放', e.target.innerHTML);
    }
    drop = (e) => {
        e.preventDefault();
        //移动到的id
        let addid = parseInt(e.target.closest('[data-sortid]').dataset.sortid);
        let delid = parseInt(e.dataTransfer.getData("number"));
        if (addid == delid) {
            return;
        }
        //debugger;
        let list = [];
        //往前移动则移动到前边元素的前边，往后移动则移动到后边元素的后边
        this.props.items.forEach((value, index) => {
            switch (index) {
                case addid:
                    if (delid > addid) {
                        list.push(this.props.items[delid])
                        list.push(this.props.items[index])

                    } else {
                        list.push(this.props.items[index])
                        list.push(this.props.items[delid])
                    }
                    break
                case delid:
                    break
                default:
                    list.push(this.props.items[index])
                    break
            }

        })
        //let list=JSON.parse(JSON.stringify(this.state.list));
        this.props.updateState(list);
        //this.setState({list});
    }
    componentDidMount() {

    }
}
class TestPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: ['aaaaa1', 'aaaaa2', 'aaaaa3', 'aaaaa4', 'aaaaa5', 'aaaaa6', 'aaaaa7']
        }
    }
    render() {

        return (
            <div style={{ height: '100%', width: '100%', position: 'absolute', zIndex: 9999, display: 'flex' }}>
                <Sort updateState={(list) => {
                    this.setState({ list });
                } } items={this.state.list} >{(value, index) => { return <div draggable='false'>{value}</div> } }</Sort>
            </div>)
    }
    componentDidMount() {

    }
}
const styles = {
    item: {
        height: 50,
        fontSize: 16,
        width: 80
    }
}
export default TestPage;