import {TODO } from "./TodoType";

export const todoGet = (todo) => {
    return{
        type:TODO,
        payload:todo
    }
}