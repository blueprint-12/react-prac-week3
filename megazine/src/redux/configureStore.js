import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import post from "./modules/post";
import thunk from "redux-thunk";

const middlewares = [thunk];
const rootReducer = combineReducers({ post });
const enhancer = applyMiddleware(...middlewares);

const store = createStore(rootReducer, enhancer);

export default store;
