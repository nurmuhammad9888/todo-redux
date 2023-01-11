import { DELET_TOKEN, DELET_USER, GET_USER, SAVE_TOKEN } from "./UserType"

const userStaete = {
    user: JSON.parse(localStorage.getItem("user")) || [],
    token: localStorage.getItem("token") || "",
}

export const reducer = (stete = userStaete, action) => {
    switch (action.type) {
        case DELET_TOKEN : return{
            ...stete,
            token: action.payload
        }

        case SAVE_TOKEN : return{
            ...stete,
            token: action.payload
        }

        case GET_USER : return{
            ...stete,
            user: action.payload
        }

        case DELET_USER : return{
            ...stete,
            user: action.payload
        }

        default:
            return stete
    }
}