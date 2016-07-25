/// <reference path="../../typings/browser.d.ts" />
import {Common, Global} from "../utils/common";
import {Alert} from "../components/alert";
import { Provider, connect} from 'react-redux';
let SL = Global.styles;
let CL = Global.colors;
/**404页面 */
class NotFound extends React.Component<any, any> {
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