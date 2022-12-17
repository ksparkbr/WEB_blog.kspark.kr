import { createStore } from "redux";

const initState = {
    session : {admin: false, session: null},
    hashtag_menu : [],
    screen_size : {width : 0, height: 0},
}

const reducer = (state = initState, action)=>{
    switch(action.type){
        case 'SESSION':
            return {
                ...state,
                session : action.data
            }
        case 'HASHTAG_MENU':
            return {
                ...state,
                hashtag_menu : action.data
            }
        case 'SCREEN_SIZE' :
            return {
                ...state,
                screen_size : action.data
            }
        default:
            return state;
    }
}

export const reduxStore = createStore(reducer);