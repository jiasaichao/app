import React from 'react';
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
                    <div>hello210 word1</div>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
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