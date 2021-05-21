import { GET_PRIORITY } from "../types/PriorityType"

const initialState = {
    arrPriority: []
}

const TaskPriorityReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_PRIORITY:
            state.arrPriority = action.arrPriority
            return { ...state }

        default:
            return state
    }
}

export default TaskPriorityReducer