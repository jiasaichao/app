/// <reference path="../../typings/browser.d.ts" />
import {hashHistory,browserHistory} from 'react-router';
const AppState = {
    path: '/'
}

export default function AppReducer(state = AppState, action) {
    switch (action.type) {
        case 'router-open':
        if (state.path!=action.path) {
            hashHistory.push(action.path);
            return Object.assign({}, state, { path: action.path });
        }
            return state;
        default:
            return state;
    };
}
