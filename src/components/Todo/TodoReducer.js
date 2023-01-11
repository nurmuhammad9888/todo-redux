import { TODO } from "./TodoType"

const todoStaete = {
    todo:  JSON.parse(localStorage.getItem("todo")) || [],
}

export const todoReducer = (stete = todoStaete, action) => {
    switch (action.type) {
        case TODO: return{
            ...stete,
            token: action.payload
        }
        default:
            return stete
    }
}