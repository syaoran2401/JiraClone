import { HISTORY } from "../types/UserType"

const initialState = {
    history :''
}

const HistoryReducer = (state = initialState, action) => {
    switch (action.type) {

    case HISTORY:
        return { ...state, history:action.history }

    default:
        return state
    }
}

export default HistoryReducer