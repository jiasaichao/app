import React from 'react';
import * as icons from '../utils/icons';
import { Icon } from '../components'
import App from './app';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
export default class Index extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to="/">home</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>
                    <div>hello210 word1
                        <svg>
                            <use xlinkHref={`#${icons.Chat.id}`}></use>
                        </svg>
                    </div>
                    <App />
                </div>
            </Router>
        );
    }
}
const Home = ({ history }) => (
    <div>
        <h2 onClick={() => {
            history.push('/about');
        }}>Home</h2>
    </div>
)

const About = () => (
    <div>
        <h2>About</h2>
    </div>
)