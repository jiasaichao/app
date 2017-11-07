import React from 'react';
class Home extends React.Component {
    constructor(props) {
        super(props)
        window.__a = () => {
            this.__a();
        }
    }
    render(){
        return <div>hhh</div>
    }
    __a() {
        console.log('Homea')
    }
}
export class A1 extends Home {
    constructor(props) {
        super(props);
    }
    __a(){
        console.log('a1aa');
    }
    render(){
        return <div>aaaaaa</div>
    }
}