/// <reference path="../../typings/browser.d.ts" />
import {Common, Global, Colors} from "../utils/common";
import {Placeholder} from "./public";
import * as React from 'react';
let SL = Global.styles;
class Pagination {
    
}
interface IColums {
    /**列头显示的文字*/
    title: string,
    /**列数据在数据项中对应的 key*/
    dataIndex: string,
    /**React 需要的 key，建议设置*/
    key?: string
    //...http://ant.design/#/components/table?scrollTo=components-table-demo-nopagination
}
interface rowSelection {
    /**是否有复选框*/
    checkbox: boolean,
    /**指定选中项的 key 数组，需要和 onChange 进行配合*/
    selectedRowKeys: Object[],
    /**选中项发生变化的时的回调	*/
    //onChange: () => {},
    //...http://ant.design/#/components/table?scrollTo=components-table-demo-nopagination
}
interface ITableProps extends React.Props<Table> {
    /**数据数组*/
    dataSource: Object[];
    /**表格列的配置描述*/
    columns: IColums[];
    /**选择功能的配置*/
    rowSelection?: Object;
    /**分页配置*/
    pagination?: {
        /**数据总数*/
        total: Number
    }
}
class ISTable {
    current: number;
    pageSize: number;
}
class Table extends React.Component<ITableProps, {}>{
    render() {
        let columns = this.renderColumns(this.props.columns);
        let body = this.renderBody(this.props.dataSource);
        let page = this.renderPage();
        console.log(body);
        return (
            <div>
            <table style={{ width: '100%', border: 'solid #e7ecf1', borderWidth:'1px 0 0 1px' }}>
                                    <thead>
                    <tr style={{ height: '36px' }}>
                        {columns}
                                            </tr>
                                        </thead>
                                    <tbody>
                                        {body}
                                        </tbody>
            </table>
            <div>
                {page}
            </div>
            </div>
        );
    }
    /**
     * 渲染列头
     * @param columns 列头数据
     */
    renderColumns(columns: IColums[]) {
        let E = columns.map((column, index) => {
            return (
                <Th>{column.title}</Th>
                );
        });
        return E;
    }
    /**
     * 渲染内容
     * @param columns 列头数据
     */
    renderBody(body: Object[]) {
        let E = body.map((item, index) => {
           
            return (
                <Tr>
                    {this.props.columns.map((column, i1) => {
                        return (<Td>{item[column.dataIndex]}</Td>);
                    }) }
                </Tr>
                
            );
        });
        return E;
    }
    /**
    *渲染页码
    *
    */
    renderPage = () => {
        console.log(SL.czjz);
        return (
            <div style={SL.create(SL.czjz).merge({height:45}).o}>
                <Placeholder.Full/>
                <ul style={SL.create(SL.czjz).o}>
                </ul>
            </div>
            );
    }
}
interface ITrProps extends React.Props<Tr> {
}
interface ISTr {
    /**选中项key*/
    mouseOver?: boolean,
}
class Tr extends React.Component<ITrProps, ISTr>{
    constructor(props: ITrProps) {
        super(props);
        this.state = { mouseOver: false };
    }
    render() {
        let style = Common.prepareStyles({ height: '36px'});
        if (this.state.mouseOver) {
            style.merge({ background: '#EEF1F5' });
        }
        return (
            <tr style={style.o} onMouseOver={this._handleMouseOver} onMouseOut={this._handleMouseOut}>{this.props.children}</tr>
            );
    }

    _handleMouseOver=()=> {
        this.setState({
            mouseOver: true
        });
    }
    _handleMouseOut=()=> {
        this.setState({
            mouseOver: false
        });
    }

}
interface ITdProps extends React.Props<Table> {
}
class Td extends React.Component<ITdProps, {}>{
    render() {
        return (
            <td style={{ border: 'solid #e7ecf1', borderWidth: '0 1px 1px 0', padding:'0 8px' }}>{this.props.children}</td>
            );
    }
}
class Th extends Td {

}
export {Table}