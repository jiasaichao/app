/// <reference path="../typings/browser.d.ts" />
import "./utils/public";
const changeCounter = (state, action) =>{
     var shape = Object.assign({},
      {sidebar:state.shapes.filter(x => x.id === action.id)[0]}
      );
   return Object.assign({}, state, { [action.field]: state[action.field] + action.by})
        };