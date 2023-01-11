import { combineReducers } from "redux";
import { reducer } from "./Register/UserReducer";
import { todoReducer } from "./Todo/TodoReducer";

export const rootReduser =  combineReducers({
    user: reducer,
    todo: todoReducer,
})