import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from 'redux-thunk'
import { setUpCombinedReducers } from "unified-redux-wrapper";
import { actionDictionary } from "./actions";
import loggerMiddleware from './middleware/logger'

const initialState = {}
const middlewares = [loggerMiddleware, thunkMiddleware]
const middlewareEnhancer = applyMiddleware(...middlewares)
const enhnacers = [middlewareEnhancer]
const composedEnhancers = compose(...enhnacers)
const configureStore = createStore(setUpCombinedReducers(actionDictionary), initialState, composedEnhancers);

export default configureStore;