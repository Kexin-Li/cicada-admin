import { combineReducers } from 'redux';
import postsReducer from './postsReducer';
import viewReducer from './viewReducer';
import postReducer from './postReducer';
import hexoReducer from './hexoReducer';

export default combineReducers({
  postsReducer,
  viewReducer,
  postReducer,
  hexoReducer
});