// import {createStore, applyMiddleware } from 'redux';
// import reducer from './reducers'
// import thunkMiddleware from 'redux-thunk'

import {createStore} from 'redux';
import reducer from './reducers'

export default createStore(reducer);