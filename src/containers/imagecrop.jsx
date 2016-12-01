import { NavBar, List, Container, ImageCrop } from '../components/index';
import * as React from 'react';
export class ListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            src: '',
            imgSrc: '',
            imgShow:false
        };
    }
    static defaultProps = {
    }
    render() {
        return (
            <Container.Page>
                <input type='file' id='aaa' onChange={() => {
                    let src = window.URL.createObjectURL(this.refs['file'].files[0])
                    this.setState({ show: true, src: src });
                } } ref='file' style={{ display: 'none' }} />
                <NavBar title='头像'></NavBar>
                <List.Link onTap={() => {
                    this.refs['file'].click();
                } } lable='上传头像'></List.Link>
                {
                    this.state.show ? <ImageCrop show={true} src={this.state.src} onCancel={() => {
                        this.setState({ show: false });
                    } } onOk={(blob) => {
                        this.setState({ imgShow: true,show: false, imgSrc:blob});
                    } } /> : null
                }
                {this.state.imgShow ? <div style={{display:'flex',justifyContent:'center'}}><img style={{maxWidth:'100%'}} src={this.state.imgSrc}/></div> : null}
            </Container.Page>
        )
    }
    componentWillMount() {

    }
    componentDidMount() {
    }
}
export default ListPage;