import {createStore} from 'redux';
// import paragraphReducer from './reducers/paragraph';
import editorReducer from './reducers/editor';

export default createStore(editorReducer);