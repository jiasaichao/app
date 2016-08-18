
import {Common, Global} from "../utils/common";
import { Provider, connect} from 'react-redux';
import * as React from 'react';
let SL = Global.styles;
/**404页面 */
class NotFound extends React.Component{
    render() {
        return (
            <div>
            404
            </div>
        );
    }
}
let mapStateToProps = (state) => {
    return {
        state
    }
}

export default connect(mapStateToProps)(NotFound);